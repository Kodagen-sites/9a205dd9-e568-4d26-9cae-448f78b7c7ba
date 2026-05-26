import PageHero from "@/components/sections/PageHero";
import ServiceCard from "@/components/ServiceCard";
import { siteConfig } from "@/content/site-config";
import {
  FadeUp,
  StaggerChildren,
  CardTiltLayer,
  MagneticButton,
} from "@/components/motion";
import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildMeta({
  title: "Capabilities — FlowSync",
  description:
    "The six capabilities that make FlowSync the agent runtime for production teams. Built for replay, observability, approvals, and evals.",
  path: "/services",
});

export default function ServicesPage() {
  const images = siteConfig._assets.images;

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Everything an agent needs <em className="not-italic text-accent">to actually finish.</em>
          </>
        }
        image={images["section-process"] || images["section-og"] || ""}
        intro="Six tightly-scoped capabilities. One runtime. No glue scripts, no proxy services, no brittle eval harnesses bolted on."
      />

      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {siteConfig.services.map((svc) => (
              <CardTiltLayer key={svc.slug}>
                <ServiceCard
                  service={{
                    name: svc.name,
                    slug: svc.slug,
                    description: svc.description,
                    image: images[`service-${svc.slug}`],
                  }}
                />
              </CardTiltLayer>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad container-x bg-surface/60 border-t border-hairline">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeUp>
            <div className="eyebrow">Ready to compose?</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display display-2 text-ink text-balance">
              Stop hand-rolling agent infra. Use FlowSync.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <MagneticButton
                as="a"
                href="/#waitlist"
                className="px-7 py-3.5 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.18em] text-xs hover:brightness-110 transition-all"
              >
                Join waitlist
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
