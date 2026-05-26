import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";
import {
  FadeUp,
  StaggerChildren,
  TextReveal,
  MagneticButton,
  ImageRevealMask,
} from "@/components/motion";
import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMeta({
  title: "About — FlowSync",
  description: siteConfig.about.intro,
  path: "/about",
});

export default function AboutPage() {
  const images = siteConfig._assets.images;

  return (
    <>
      <PageHero
        eyebrow={siteConfig.about.eyebrow}
        title={siteConfig.about.heading}
        image={images["section-about"] || images["section-og"] || ""}
        intro={siteConfig.about.intro}
      />

      {/* AB2 — Industry hero already done above; body story block */}
      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-3xl mx-auto space-y-6">
          {siteConfig.about.body.map((para, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <p className="text-lg md:text-xl text-ink leading-relaxed first:text-2xl first:text-balance first:font-light first:font-display">
                {para}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Manifesto type statement */}
      <section className="relative section-pad container-x bg-surface">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="eyebrow mb-8">What we believe</div>
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display font-light text-ink leading-[0.96] tracking-tight text-[clamp(40px,8vw,120px)] text-balance"
            stagger={0.05}
          >
            {siteConfig.themeStatement}
          </TextReveal>
        </div>
      </section>

      {/* Values grid */}
      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-2xl">
            <FadeUp>
              <div className="eyebrow mb-4">Values</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display display-2 text-ink text-balance">
                The shortlist we won't bend on.
              </h2>
            </FadeUp>
          </div>

          <StaggerChildren staggerDelay={0.08} className="grid md:grid-cols-3 gap-6">
            {siteConfig.about.values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-2xl border border-hairline-strong bg-bg p-8 transition-all hover:border-contrast/40 hover:shadow-[0_18px_40px_-24px_rgba(58,61,69,0.35)]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-eyebrow opacity-70 mb-5">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl text-ink mb-3 leading-tight">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad container-x bg-surface/60 border-t border-hairline">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeUp>
            <h2 className="font-display display-2 text-ink text-balance">
              Want in early?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Design-partner slots include lifetime founder pricing and direct
              access to the team building it.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <MagneticButton
              as="a"
              href="/#waitlist"
              className="px-7 py-3.5 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.18em] text-xs hover:brightness-110 transition-all inline-block"
            >
              Reserve your spot →
            </MagneticButton>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
