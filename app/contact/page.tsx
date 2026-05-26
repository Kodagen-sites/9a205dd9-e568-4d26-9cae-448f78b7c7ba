import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import WaitlistForm from "@/components/sections/WaitlistForm";
import { siteConfig } from "@/content/site-config";
import { FadeUp } from "@/components/motion";
import { buildMeta } from "@/lib/seo";
import type { Metadata } from "next";
import { Mail, Globe, MessageCircle } from "lucide-react";

export const metadata: Metadata = buildMeta({
  title: "Contact — FlowSync",
  description:
    "Talk to the FlowSync team. Design partners get direct access, custom adapters, and lifetime founder pricing.",
  path: "/contact",
});

/**
 * CT3 — Type-only no-map (global / remote-first brand has no physical address).
 */
export default function ContactPage() {
  const images = siteConfig._assets.images;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk shop."
        image={images["section-cta"] || images["section-og"] || ""}
        intro="We're a small team — design partners and serious teams get priority. Pick the channel that fits and we'll be back within 24 hours."
      />

      <section className="relative section-pad container-x bg-bg">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Channels */}
          <div className="lg:col-span-3 space-y-10">
            <FadeUp>
              <div>
                <div className="eyebrow mb-4">Channels</div>
                <h2 className="font-display display-2 text-ink text-balance">
                  Pick the one that matches the moment.
                </h2>
              </div>
            </FadeUp>

            <div className="space-y-5">
              {[
                {
                  Icon: Mail,
                  title: "Talk to a human",
                  body: "Founders read everything. Reply within one business day.",
                  link: { label: siteConfig.company.email, href: `mailto:${siteConfig.company.email}` },
                },
                {
                  Icon: MessageCircle,
                  title: "Become a design partner",
                  body: "Direct line to engineering, custom adapters, founder pricing locked.",
                  link: { label: "Reserve a slot →", href: "/#waitlist" },
                },
                {
                  Icon: Globe,
                  title: "Where we are",
                  body: "Distributed across Berlin, Brooklyn, Bengaluru, Lagos. Remote-first since day one — async, every timezone covered.",
                  link: null,
                },
              ].map((ch) => (
                <FadeUp key={ch.title}>
                  <div className="flex items-start gap-5 p-6 rounded-2xl border border-hairline-strong bg-bg hover:border-contrast/40 transition-colors">
                    <div className="mt-1 w-10 h-10 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                      <ch.Icon size={18} className="text-ink" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-display text-lg text-ink">{ch.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{ch.body}</p>
                      {ch.link && (
                        <Link
                          href={ch.link.href}
                          className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-contrast transition-colors"
                        >
                          {ch.link.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Waitlist */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 self-start space-y-6">
            <FadeUp>
              <div>
                <div className="eyebrow mb-3">Or just join the waitlist</div>
                <p className="text-muted text-sm">
                  Two emails a month. No drip. You'll hear from us when there's something worth your attention.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <WaitlistForm note="No spam. Unsubscribe with one click." />
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
