import type { ReactNode } from "react";

/**
 * PageHero — full-bleed image hero band for inner pages.
 * Pearl & Platinum light treatment — image dimmed slightly, bottom fades to bg.
 */
type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  image: string;
  intro?: string;
};

export default function PageHero({ eyebrow, title, image, intro }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-surface md:min-h-[64vh]">
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "contrast(1.02) saturate(0.94) brightness(1.0)" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg to-accent/30" />
      )}
      {/* Gradient — fades to bg at bottom so PageHero blends into next section,
          slight light wash at top so the floating header reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/10 to-bg" />

      <div className="relative w-full px-5 pb-14 pt-44 md:px-10 md:pb-20 md:pt-48">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-eyebrow opacity-80">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-contrast/40" />
            {eyebrow}
          </div>
          <h1 className="max-w-[18ch] font-display text-[clamp(40px,7vw,92px)] font-light leading-[1.0] tracking-[-0.02em] text-ink">
            {title}
          </h1>
          {intro ? (
            <p className="mt-8 max-w-[640px] text-lg leading-relaxed text-muted">
              {intro}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
