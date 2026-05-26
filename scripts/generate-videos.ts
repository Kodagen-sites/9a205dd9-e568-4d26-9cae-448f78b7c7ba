/**
 * generate-videos.ts — Kodagen platform shim.
 * Routes Veo motion generation through the platform's /api/asset/video endpoint.
 *
 * Reads:
 *   prompts/scene-N/motion.txt
 *   content/asset-manifest.json images["scene-N-start"] + images["scene-N-end"]
 *
 * Writes:
 *   raw/scene-N.mp4 (download for local stitch + frame extract)
 *   content/asset-manifest.json videos["scene-N"] = <cdn-url>
 *
 * Polls /api/asset/video?operation=... until done, then downloads.
 */

import { readFile, writeFile, readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const API = process.env.KODAGEN_ASSET_API_URL;
const TOKEN = process.env.KODAGEN_BUILD_TOKEN;
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID;
const POLL_INTERVAL = parseInt(process.env.VEO_POLL_INTERVAL_MS ?? "10000", 10);
const MAX_POLLS = parseInt(process.env.VEO_MAX_POLLS ?? "60", 10); // 10 min @ 10s

if (!API || !TOKEN || !PROJECT_ID) {
  console.error("✗ Missing KODAGEN_ASSET_API_URL / KODAGEN_BUILD_TOKEN / KODAGEN_PROJECT_ID");
  process.exit(1);
}

const MANIFEST = "content/asset-manifest.json";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Manifest = {
  images: Record<string, string>;
  videos: Record<string, string>;
  frames: Record<string, string[]>;
  projectId?: string;
  updatedAt?: string;
};

async function readManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST)) return { images: {}, videos: {}, frames: {} };
  return JSON.parse(await readFile(MANIFEST, "utf8")) as Manifest;
}

async function writeManifest(m: Manifest): Promise<void> {
  m.updatedAt = new Date().toISOString();
  m.projectId = PROJECT_ID;
  await mkdir("content", { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(m, null, 2));
}

async function startVideo(
  prompt: string,
  slot: string,
  startFrameUrl?: string,
  endFrameUrl?: string,
): Promise<string> {
  const body: Record<string, unknown> = { prompt, slot, projectId: PROJECT_ID };
  if (startFrameUrl) body.startFrameUrl = startFrameUrl;
  if (endFrameUrl) body.endFrameUrl = endFrameUrl;
  const res = await fetch(`${API}/api/asset/video`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`start [${res.status}] ${(await res.text()).slice(0, 300)}`);
  }
  const json = (await res.json()) as { operationId?: string };
  if (!json.operationId) throw new Error("no operationId in response");
  return json.operationId;
}

async function pollVideo(operation: string, slot: string): Promise<string> {
  for (let i = 0; i < MAX_POLLS; i++) {
    await sleep(POLL_INTERVAL);
    const url = new URL(`${API}/api/asset/video`);
    url.searchParams.set("operation", operation);
    url.searchParams.set("projectId", PROJECT_ID!);
    url.searchParams.set("slot", slot);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
      const txt = await res.text();
      console.warn(`   poll ${i + 1}: ${res.status} ${txt.slice(0, 120)}`);
      continue;
    }
    const json = (await res.json()) as { done?: boolean; url?: string; error?: string };
    process.stdout.write(json.done ? "✓" : ".");
    if (json.done) {
      process.stdout.write("\n");
      if (json.error) throw new Error(json.error);
      if (!json.url) throw new Error("no url in completion response");
      return json.url;
    }
  }
  throw new Error(`timeout after ${(MAX_POLLS * POLL_INTERVAL) / 1000}s`);
}

async function downloadTo(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download [${res.status}]`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

async function main() {
  console.log("\n🎬 Video generation via Kodagen platform shim");
  console.log(`   API: ${API}`);
  console.log(`   Project: ${PROJECT_ID}\n`);

  const promptsDir = "prompts";
  let sceneDirs: string[];
  try {
    sceneDirs = (await readdir(promptsDir)).filter((d) => d.startsWith("scene-")).sort();
  } catch {
    console.error("✗ prompts/ not found.");
    return;
  }

  if (sceneDirs.length === 0) {
    console.log("No scenes to generate.");
    return;
  }

  await mkdir("raw", { recursive: true });
  const manifest = await readManifest();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < sceneDirs.length; i++) {
    const scene = sceneDirs[i];
    const progress = `[${i + 1}/${sceneDirs.length}]`;
    const motionPath = join(promptsDir, scene, "motion.txt");
    const startSlot = `${scene}-start`;
    const endSlot = `${scene}-end`;
    const rawPath = `raw/${scene}.mp4`;

    if (manifest.videos[scene] && existsSync(rawPath)) {
      console.log(`${progress} ⏭  ${scene} — already done`);
      skipped++;
      continue;
    }

    if (!existsSync(motionPath)) {
      console.error(`${progress} ✗ ${scene} — missing motion.txt`);
      failed++;
      continue;
    }

    const startUrl = manifest.images[startSlot];
    const endUrl = manifest.images[endSlot];
    if (!startUrl || !endUrl) {
      console.error(`${progress} ✗ ${scene} — missing keyframes in manifest (run gen:images first)`);
      failed++;
      continue;
    }

    console.log(`${progress} → ${scene} (starting Veo + polling)...`);
    try {
      const motion = (await readFile(motionPath, "utf-8")).trim();
      const operation = await startVideo(motion, scene, startUrl, endUrl);
      process.stdout.write(`   polling: `);
      const url = await pollVideo(operation, scene);
      manifest.videos[scene] = url;
      await writeManifest(manifest);

      // Download for local stitch + frame extract
      console.log(`${progress} ⤓ downloading to ${rawPath}...`);
      await downloadTo(url, rawPath);
      const s = await stat(rawPath);
      console.log(`${progress} ✓ ${scene} (${Math.round(s.size / 1024)} KB)`);
      generated++;
      if (i < sceneDirs.length - 1) await sleep(3_000);
    } catch (err) {
      console.error(`${progress} ✗ ${scene} — ${(err as Error).message}`);
      failed++;
      await sleep(3_000);
    }
  }

  console.log(`\n✓ Done. Generated: ${generated}  Skipped: ${skipped}  Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
