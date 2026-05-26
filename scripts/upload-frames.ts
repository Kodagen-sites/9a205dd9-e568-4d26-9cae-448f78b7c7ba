/**
 * Post-extract upload: reads public/frames/frame-NNNN.jpg, uploads each to
 * Supabase Storage at {projectId}/frames/scene-1/frame-NNNN.jpg, and updates
 * content/frames-manifest.json so frameDir points at the public CDN base.
 *
 * Called by `npm run gen:frames` (after `extract-frames.sh`).
 *
 * Skips entirely if Storage isn't configured — falls back to the original
 * local-only `public/frames/` flow (legacy / local-only dev).
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { storageReady, uploadBytes } from "./_storage";

const FRAMES_DIR = "public/frames";
const MANIFEST_PATH = "content/frames-manifest.json";
const SCENE_ID = process.env.SCENE_ID ?? "scene-1";
// Parallelism cap for the upload pool. Supabase Storage handles ~10+ parallel
// uploads easily; capping at 8 avoids hammering the rate limit.
const CONCURRENCY = 8;

async function main() {
  if (!existsSync(FRAMES_DIR)) {
    console.log("No public/frames directory — extract-frames.sh hasn't run yet.");
    return;
  }
  const entries = await readdir(FRAMES_DIR);
  const frames = entries.filter((f) => /^frame-\d+\.jpg$/.test(f)).sort();
  if (frames.length === 0) {
    console.log("No frames to upload.");
    return;
  }

  // Read the manifest extract-frames.sh wrote so we preserve fps/width.
  let manifest: Record<string, unknown> = {};
  if (existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    } catch { /* start fresh */ }
  }

  if (!storageReady()) {
    console.log(`ℹ  Storage not configured — keeping ${frames.length} frames in ${FRAMES_DIR}/`);
    return;
  }

  console.log(`⤴  Uploading ${frames.length} frames to Storage (${SCENE_ID}/) at concurrency ${CONCURRENCY}...`);

  const urls: string[] = new Array(frames.length);
  let nextIndex = 0;
  let uploaded = 0;
  let failed = 0;

  async function worker(): Promise<void> {
    while (true) {
      const i = nextIndex++;
      if (i >= frames.length) return;
      const fname = frames[i];
      const localPath = join(FRAMES_DIR, fname);
      const buf = await readFile(localPath);
      const key = `frames/${SCENE_ID}/${fname}`;
      try {
        const url = await uploadBytes(buf, key);
        if (!url) { failed++; continue; }
        urls[i] = url;
        uploaded++;
        if (uploaded % 50 === 0) console.log(`   ${uploaded}/${frames.length}`);
      } catch (e: any) {
        failed++;
        console.warn(`   ⚠  ${fname}: ${e.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  if (uploaded === 0) {
    console.error(`✗ All ${frames.length} frame uploads failed. Keeping local public/frames/ flow.`);
    process.exit(1);
  }

  // Derive the public base URL from the first uploaded frame so the manifest
  // can be loaded at runtime without re-deriving it. The Vite-era pattern was
  // frameDir="/frames" with the site serving public/frames/. Now frameDir is
  // an absolute CDN URL like https://<ref>.supabase.co/.../site-assets/{pid}/frames/scene-1
  const firstUrl = urls.find((u) => !!u)!;
  const frameDir = firstUrl.replace(/\/frame-\d+\.jpg$/, "");

  const next = {
    ...manifest,
    frameCount: uploaded,
    frameDir,
    frameUrlTemplate: `${frameDir}/frame-{NNNN}.jpg`,
    sceneId: SCENE_ID,
    storage: "supabase",
  };
  await mkdir("content", { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(next, null, 2));

  console.log(`✓ Uploaded ${uploaded}/${frames.length} frames${failed ? ` (${failed} failed)` : ""}`);
  console.log(`✓ Manifest updated: frameDir=${frameDir}`);
}

main().catch((err) => {
  console.error("✗ upload-frames failed:", err);
  process.exit(1);
});
