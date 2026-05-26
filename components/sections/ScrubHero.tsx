"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollCanvas from "@/components/ScrollCanvas";
import { HeroScrollText } from "@/components/motion";
import framesManifest from "@/content/frames-manifest.json";
import assetManifest from "@/content/asset-manifest.json";
import { siteConfig } from "@/content/site-config";

type ChapterLike = {
  at: number;
  eyebrow?: string;
  headlineLines: readonly string[];
  subline?: string;
  cta?: { label: string; href: string };
};

export default function ScrubHero() {
  const [progress, setProgress] = useState(0);
  const { frameCount, frameUrlTemplate, frameDir } = framesManifest;
  const images = assetManifest.images as Record<string, string>;
  const heroPoster = images["scene-1-end"] || images["scene-1-start"] || images["section-og"];

  const pattern =
    (frameUrlTemplate as string | undefined) ||
    `${frameDir || "/frames"}/frame-{NNNN}.jpg`;

  const chapters = (siteConfig.scrollHero.chapters as readonly Record<string, unknown>[]).map(
    (c) => {
      const cta = c.cta as { label: string; href: string } | undefined;
      return {
        at: c.at as number,
        eyebrow: c.eyebrow as string | undefined,
        headlineLines: [...(c.headlineLines as readonly string[])],
        subline: c.subline as string | undefined,
        cta: cta ? { ...cta } : undefined,
      };
    },
  ) as ChapterLike[];

  // If frames haven't been extracted yet (frameCount === 0) OR scrollHero
  // assetMode is prompt-only, fall back to a still poster.
  if (!frameCount || siteConfig.scrollHero.assetMode === "prompt-only") {
    return <PosterHero poster={heroPoster} chapters={chapters} />;
  }

  return (
    <ScrollCanvas
      frameCount={frameCount}
      pattern={pattern}
      padLength={4}
      scrollDistance={siteConfig.scrollHero.scrollDistance}
      loadingLabel={siteConfig.company.name}
      loadingVariant="L2"
      onProgress={setProgress}
    >
      <HeroScrollText
        progress={progress}
        chapters={chapters as never}
        position="bottom-left"
        textColor="#000000"
        accentColor="#000000"
        accentTextColor="#ffffff"
        showChapterDots
      />
    </ScrollCanvas>
  );
}

function PosterHero({
  poster,
  chapters,
}: {
  poster?: string;
  chapters: ChapterLike[];
}) {
  const chapter = chapters[0];
  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg to-accent/30" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent" />
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
        {chapter.eyebrow && (
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-eyebrow opacity-80 mb-6">
            {chapter.eyebrow}
          </span>
        )}
        <h1
          className="font-display leading-[0.92] tracking-tight"
          style={{
            fontSize: "clamp(3.75rem, 10.75vw, 8.5rem)",
            color: "#000000",
          }}
        >
          {chapter.headlineLines.map((l, i) => (
            <span
              key={i}
              className="block"
              style={{
                fontWeight: i === 0 ? 400 : 300,
                fontStyle: i === 1 ? "italic" : "normal",
              }}
            >
              {l}
            </span>
          ))}
        </h1>
        {chapter.subline && (
          <p className="mt-6 max-w-xl text-base md:text-lg text-black">
            {chapter.subline}
          </p>
        )}
        {chapter.cta && (
          <a
            href={chapter.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-mono uppercase tracking-[0.18em] bg-black text-white w-fit hover:brightness-110 transition-all"
          >
            {chapter.cta.label} →
          </a>
        )}
      </div>
    </section>
  );
}
