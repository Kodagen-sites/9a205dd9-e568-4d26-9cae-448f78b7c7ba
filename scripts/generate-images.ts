/**
 * generate-images.ts — Kodagen platform shim.
 * Routes prompt generation through the platform's /api/asset/image endpoint
 * (server holds Gemini/Vertex creds; build only knows KODAGEN_BUILD_TOKEN +
 * KODAGEN_ASSET_API_URL + KODAGEN_PROJECT_ID).
 *
 * Reads:
 *   prompts/scene-N/start.txt + end.txt   (hero keyframes)
 *   prompts/section-*.txt                  (static section images)
 *   prompts/service-*.txt                  (per-service images)
 *
 * Writes:
 *   content/asset-manifest.json
 *     images["scene-N-start"]   = <cdn-url>
 *     images["scene-N-end"]     = <cdn-url>
 *     images["section-<name>"]  = <cdn-url>
 *     images["service-<name>"]  = <cdn-url>
 *
 * SKIPS slots already in the manifest (idempotent — re-run on failure).
 */

import { readFile, writeFile, readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const API = process.env.KODAGEN_ASSET_API_URL;
const TOKEN = process.env.KODAGEN_BUILD_TOKEN;
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID;

if (!API || !TOKEN || !PROJECT_ID) {
  console.error("✗ Missing KODAGEN_ASSET_API_URL / KODAGEN_BUILD_TOKEN / KODAGEN_PROJECT_ID");
  process.exit(1);
}

const MANIFEST = "content/asset-manifest.json";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Manifest = {
  bucket?: string;
  projectId?: string;
  ref?: string;
  images: Record<string, string>;
  videos: Record<string, string>;
  frames: Record<string, string[]>;
  updatedAt?: string;
};

async function readManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST)) {
    return { images: {}, videos: {}, frames: {} };
  }
  return JSON.parse(await readFile(MANIFEST, "utf8")) as Manifest;
}

async function writeManifest(m: Manifest): Promise<void> {
  m.updatedAt = new Date().toISOString();
  m.projectId = PROJECT_ID;
  await mkdir("content", { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(m, null, 2));
}

async function genImage(prompt: string, slot: string, aspectRatio = "16:9"): Promise<string> {
  const res = await fetch(`${API}/api/asset/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, slot, projectId: PROJECT_ID, aspectRatio }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[${res.status}] ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { url?: string; error?: string };
  if (!json.url) throw new Error(json.error || "no url in response");
  return json.url;
}

async function genWithRetry(prompt: string, slot: string, label: string): Promise<string> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await genImage(prompt, slot);
    } catch (err) {
      lastErr = err;
      const msg = (err as Error).message ?? String(err);
      const rateLimited = /429|rate|quota|resource_exhausted/i.test(msg);
      const backoff = rateLimited ? 30_000 * attempt : 5_000 * attempt;
      console.warn(`  attempt ${attempt}/3 failed: ${msg.slice(0, 150)}`);
      if (attempt < 3) {
        console.warn(`  waiting ${backoff / 1000}s before retry...`);
        await sleep(backoff);
      }
    }
  }
  throw new Error(`${label}: ${(lastErr as Error)?.message ?? "unknown"}`);
}

type Job = { promptPath: string; slot: string; label: string };

async function collectJobs(): Promise<Job[]> {
  const jobs: Job[] = [];
  const promptsDir = "prompts";
  let entries: string[];
  try {
    entries = await readdir(promptsDir);
  } catch {
    console.error("✗ prompts/ not found.");
    return jobs;
  }

  // Scene keyframes
  for (const dir of entries.filter((d) => d.startsWith("scene-")).sort()) {
    for (const f of ["start", "end"] as const) {
      const p = join(promptsDir, dir, `${f}.txt`);
      try {
        await stat(p);
        jobs.push({ promptPath: p, slot: `${dir}-${f}`, label: `${dir}/${f}` });
      } catch {
        /* skip */
      }
    }
  }

  // Section + service images
  for (const file of entries) {
    if (
      (file.startsWith("section-") || file.startsWith("service-")) &&
      file.endsWith(".txt")
    ) {
      const slot = file.replace(/\.txt$/, "");
      jobs.push({ promptPath: join(promptsDir, file), slot, label: slot });
    }
  }

  return jobs;
}

async function main() {
  console.log("\n🎨 Image generation via Kodagen platform shim");
  console.log(`   API: ${API}`);
  console.log(`   Project: ${PROJECT_ID}\n`);

  const jobs = await collectJobs();
  if (jobs.length === 0) {
    console.log("No prompts found.");
    return;
  }
  console.log(`Found ${jobs.length} prompt(s).\n`);

  const manifest = await readManifest();
  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const progress = `[${i + 1}/${jobs.length}]`;

    if (manifest.images[job.slot]) {
      console.log(`${progress} ⏭  ${job.label} — already in manifest`);
      skipped++;
      continue;
    }

    let prompt: string;
    try {
      prompt = (await readFile(job.promptPath, "utf-8")).trim();
    } catch (err) {
      console.error(`${progress} ✗ ${job.label} — prompt missing`);
      failed++;
      continue;
    }

    console.log(`${progress} → ${job.label}`);
    try {
      const url = await genWithRetry(prompt, job.slot, job.label);
      manifest.images[job.slot] = url;
      await writeManifest(manifest);
      console.log(`${progress} ✓ ${job.label} → ${url.replace(API + "/", "")}`);
      generated++;
      if (i < jobs.length - 1) await sleep(2_000);
    } catch (err) {
      console.error(`${progress} ✗ ${job.label} — ${(err as Error).message}`);
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
