"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site-config";
import { SocialLinks } from "@/components/social-icons";
import { FadeUp } from "@/components/motion";

/**
 * FT3 — Giant Wordmark Aurora (adapted for Pearl & Platinum light theme).
 * Wordmark fills the section. Hairline grid above. Legal + socials below.
 */
export default function Footer() {
  return (
    <footer className="relative bg-bg border-t border-hairline overflow-hidden">
      {/* CTA strip */}
      <div className="relative border-b border-hairline section-pad container-x">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-end">
          <FadeUp>
            <h2 className="font-display text-4xl md:text-6xl text-ink font-light leading-[1.02] tracking-tight max-w-xl">
              {siteConfig.footer.ctaHeadline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="space-y-4 md:text-right">
            <p className="text-muted text-sm md:text-base max-w-md md:ml-auto">
              {siteConfig.footer.brandStatement}
            </p>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-contrast text-bg font-mono uppercase tracking-[0.18em] text-xs hover:brightness-110 transition-all"
            >
              {siteConfig.cta.primary} →
            </Link>
          </FadeUp>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center pointer-events-none select-none px-6 pt-10 pb-2"
          style={{
            fontSize: "clamp(80px, 22vw, 320px)",
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
            fontWeight: 300,
            color: "var(--surface-color)",
            backgroundImage:
              "linear-gradient(180deg, var(--surface-color) 0%, var(--bg-color) 78%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {siteConfig.company.name}
        </motion.div>
      </div>

      {/* Meta row */}
      <div className="relative border-t border-hairline">
        <div className="max-w-7xl mx-auto container-x py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-muted text-xs font-mono uppercase tracking-[0.18em]">
            <span>© {new Date().getFullYear()} {siteConfig.company.legalName}</span>
            <a
              href={`mailto:${siteConfig.footer.contactEmail}`}
              className="hover:text-ink transition-colors normal-case tracking-normal text-sm font-body"
            >
              {siteConfig.footer.contactEmail}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks socials={siteConfig.socials} />
          </div>

          <div className="flex items-center gap-5 text-xs font-mono uppercase tracking-[0.18em] text-muted">
            {siteConfig.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
