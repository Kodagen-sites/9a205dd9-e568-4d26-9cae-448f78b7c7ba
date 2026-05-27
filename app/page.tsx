import Image from "next/image";
import Link from "next/link";
import ScrubHero from "@/components/sections/ScrubHero";
import WaitlistForm from "@/components/sections/WaitlistForm";
import ServiceCard from "@/components/ServiceCard";
import ScrollCanvas from "@/components/ScrollCanvas";
import SlidingCards from "@/components/SlidingCards";
import framesManifest from "@/content/frames-manifest.json";
import { siteConfig } from "@/content/site-config";
import {
  FadeUp,
  StaggerChildren,
  TextReveal,
  MagneticButton,
  ImageRevealMask,
  Marquee,
  CardTiltLayer,
} from "@/components/motion";
import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMeta({ path: "/" });

export default function HomePage() {
  const images = siteConfig._assets.images;

  return (
    <>
      {/* 1 — SCRUB HERO */}
      <ScrubHero />

      {/* 2 — VALUE PROP / TEASER */}
      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="eyebrow mb-6">{siteConfig.valueProps.eyebrow}</div>
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display text-ink display-2 text-balance max-w-5xl"
            stagger={0.06}
          >
            {siteConfig.valueProps.heading}
          </TextReveal>
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg text-muted leading-relaxed">
              {siteConfig.valueProps.body}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 3 — TRUST MARQUEE */}
      <section className="relative bg-surface/60 border-y border-hairline py-6 overflow-hidden">
        <Marquee speed={50}>
          {[...siteConfig.trustBar, ...siteConfig.trustBar].map((item, i) => (
            <span
              key={i}
              className="mx-10 font-mono text-[11px] uppercase tracking-[0.32em] text-eyebrow opacity-80 whitespace-nowrap"
            >
              {item} <span className="ml-10 text-accent">·</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* 4 — SERVICES (sliding cards over hero frames) */}
      <SlidingCards
        cards={siteConfig.services.map((svc) => ({
          slug: svc.slug,
          name: svc.name,
          description: svc.description,
        }))}
        eyebrow={siteConfig.servicesEyebrow}
        heading={siteConfig.servicesHeading}
        framePattern={
          framesManifest.frameUrlTemplate ||
          `${framesManifest.frameDir || "/frames"}/frame-{NNNN}.jpg`
        }
        frameCount={framesManifest.frameCount}
        padLength={4}
      />

      {/* 5 — IMAGE MOCKUP / SHOWCASE — scroll-scrubbed hero frames */}
      {framesManifest.frameCount ? (
        <ScrollCanvas
          frameCount={framesManifest.frameCount}
          pattern={framesManifest.frameUrlTemplate || `${framesManifest.frameDir || "/frames"}/frame-{NNNN}.jpg`}
          padLength={4}
          scrollDistance={3}
          loadingLabel={siteConfig.company.name}
          loadingVariant="L1"
        >
          <div className="pointer-events-auto absolute inset-0 flex items-end">
            <div className="container-x w-full pb-16 md:pb-24">
              <div className="max-w-2xl rounded-2xl bg-bg/75 backdrop-blur-md border border-hairline-strong p-8 md:p-10">
                <FadeUp>
                  <div className="eyebrow mb-4">Built like an engineer</div>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <h2 className="font-display text-ink display-2 text-balance mb-6">
                    A runtime, not a chatbot.
                  </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-muted text-lg leading-relaxed">
                    Most agent frameworks treat every run like a fresh conversation.
                    FlowSync treats them like jobs — durable state, idempotent steps,
                    deterministic replay, version-controlled prompts. The kind of
                    primitives you'd want before pointing AI at anything that matters.
                  </p>
                </FadeUp>
                <StaggerChildren
                  staggerDelay={0.08}
                  initialDelay={0.3}
                  className="mt-8 space-y-3"
                >
                  {[
                    { title: "Durable state per workflow", description: "Steps survive restarts, timeouts, and partial failures." },
                    { title: "Idempotent tool calls", description: "Same input, same output. Replay any run safely." },
                    { title: "Versioned prompts + adapters", description: "Promote, roll back, A/B test — git-tracked." },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-3">
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-contrast flex-shrink-0" />
                      <div>
                        <div className="font-display font-medium text-ink">{f.title}</div>
                        <div className="text-muted text-sm mt-0.5">{f.description}</div>
                      </div>
                    </div>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </div>
        </ScrollCanvas>
      ) : (
        <section className="relative section-pad container-x bg-bg">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeUp>
                <div className="eyebrow mb-4">Built like an engineer</div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display text-ink display-2 text-balance mb-6">
                  A runtime, not a chatbot.
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-muted text-lg leading-relaxed">
                  Most agent frameworks treat every run like a fresh conversation.
                  FlowSync treats them like jobs — durable state, idempotent steps,
                  deterministic replay, version-controlled prompts. The kind of
                  primitives you'd want before pointing AI at anything that matters.
                </p>
              </FadeUp>
              <StaggerChildren
                staggerDelay={0.08}
                initialDelay={0.3}
                className="mt-8 space-y-3"
              >
                {[
                  { title: "Durable state per workflow", description: "Steps survive restarts, timeouts, and partial failures." },
                  { title: "Idempotent tool calls", description: "Same input, same output. Replay any run safely." },
                  { title: "Versioned prompts + adapters", description: "Promote, roll back, A/B test — git-tracked." },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-contrast flex-shrink-0" />
                    <div>
                      <div className="font-display font-medium text-ink">{f.title}</div>
                      <div className="text-muted text-sm mt-0.5">{f.description}</div>
                    </div>
                  </div>
                ))}
              </StaggerChildren>
            </div>

            <div className="relative">
              <ImageRevealMask
                src={images["section-about"] || ""}
                alt="FlowSync workspace"
                aspectClass="aspect-[4/3]"
                className="rounded-2xl border border-hairline-strong bg-surface"
              />
            </div>
          </div>
        </section>
      )}

      {/* 6 — OVERSIZED TYPE STATEMENT */}
      <section className="relative section-pad container-x bg-surface">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="eyebrow mb-8">Manifesto</div>
          </FadeUp>
          <TextReveal
            as="h2"
            className="font-display font-light text-ink leading-[0.92] tracking-tighter text-[clamp(56px,14vw,220px)]"
            stagger={0.04}
          >
            {siteConfig.themeStatement}
          </TextReveal>
        </div>
      </section>

      {/* 7 — PROCESS / HOW IT WORKS */}
      <section id="process" className="relative section-pad container-x bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <FadeUp>
              <div className="eyebrow mb-4">How it works</div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-ink display-2 text-balance">
                Three steps. Live in a week.
              </h2>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {siteConfig.process.map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-hairline-strong bg-bg p-8 h-full transition-all hover:border-contrast/40 hover:shadow-[0_18px_40px_-24px_rgba(58,61,69,0.35)]">
                  <div className="font-display font-light text-6xl text-accent mb-6 leading-none tabular-nums">
                    0{step.step}
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — ACCENT IMAGE BREATHER */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden border-y border-hairline">
        {images["section-process"] && (
          <Image
            src={images["section-process"]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
        <div className="relative h-full flex items-end justify-start max-w-7xl mx-auto container-x pb-16">
          <FadeUp>
            <div className="max-w-xl">
              <div className="eyebrow mb-4">The shift</div>
              <p className="font-display text-3xl md:text-5xl text-ink leading-tight tracking-tight">
                Stop writing glue code. Compose workflows.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 9 — CTA / WAITLIST (CTA2 split form) */}
      <section
        id="waitlist"
        className="relative section-pad container-x bg-bg overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-3 space-y-6">
            <FadeUp>
              <div className="eyebrow">{siteConfig.ctaBlock.eyebrow}</div>
            </FadeUp>
            <TextReveal
              as="h2"
              className="font-display text-ink display-2 text-balance"
              stagger={0.05}
            >
              {siteConfig.ctaBlock.heading}
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-lg text-muted leading-relaxed max-w-xl">
                {siteConfig.ctaBlock.description}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-2">
                {siteConfig.trustBar.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full border border-hairline-strong text-xs font-mono uppercase tracking-[0.16em] text-eyebrow"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-2">
            <FadeUp delay={0.2}>
              <WaitlistForm note={siteConfig.ctaBlock.formNote} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 10 — CONTACT TEASER */}
      <section className="relative section-pad container-x bg-surface/50 border-t border-hairline">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="eyebrow mb-5">Talk to us</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-ink display-2 text-balance mb-6">
              Not ready for the waitlist? Let's talk anyway.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-muted text-lg max-w-xl mx-auto mb-8">
              Design partners get direct access to the founders, custom adapters,
              and founder pricing locked for the life of your account.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3">
              <MagneticButton
                as="a"
                href={`mailto:${siteConfig.company.email}`}
                className="px-7 py-3.5 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.18em] text-xs hover:brightness-110 transition-all"
              >
                Email the team
              </MagneticButton>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full border border-contrast/40 bg-bg text-ink font-mono uppercase tracking-[0.18em] text-xs hover:bg-contrast/5 transition-all inline-flex items-center"
              >
                Full contact
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
