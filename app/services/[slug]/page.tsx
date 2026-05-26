import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/sections/PageHero";
import { siteConfig } from "@/content/site-config";
import {
  FadeUp,
  StaggerChildren,
  MagneticButton,
} from "@/components/motion";
import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) return buildMeta({ title: "Capability — FlowSync", path: `/services/${slug}` });
  return buildMeta({
    title: `${svc.name} — FlowSync`,
    description: svc.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const images = siteConfig._assets.images;
  const idx = siteConfig.services.findIndex((s) => s.slug === slug);
  const next = siteConfig.services[(idx + 1) % siteConfig.services.length];

  return (
    <>
      <PageHero
        eyebrow="Capability"
        title={svc.name}
        image={images[`service-${svc.slug}`] || images["section-process"] || ""}
        intro={svc.description}
      />

      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-4xl mx-auto space-y-12">
          <FadeUp>
            <div>
              <div className="eyebrow mb-4">What you get</div>
              <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight tracking-tight">
                Built for the messy middle of agent work.
              </h2>
            </div>
          </FadeUp>

          {svc.highlights && svc.highlights.length > 0 && (
            <StaggerChildren staggerDelay={0.08} className="space-y-3">
              {svc.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-hairline-strong bg-bg hover:border-contrast/40 transition-colors"
                >
                  <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-contrast text-bg text-[10px] font-mono">
                    ✓
                  </span>
                  <div className="text-ink font-display text-lg">{h}</div>
                </div>
              ))}
            </StaggerChildren>
          )}

          <FadeUp delay={0.3}>
            <div className="border-t border-hairline pt-10 flex flex-wrap items-center justify-between gap-6">
              <Link
                href="/services"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
              >
                ← All capabilities
              </Link>
              <Link
                href={`/services/${next.slug}`}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
              >
                Next: {next.name} →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="relative section-pad container-x bg-surface/60 border-t border-hairline">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeUp>
            <h2 className="font-display display-2 text-ink text-balance">
              Want this in your stack?
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <MagneticButton
              as="a"
              href="/#waitlist"
              className="px-7 py-3.5 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.18em] text-xs hover:brightness-110 transition-all inline-block"
            >
              Join waitlist →
            </MagneticButton>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
