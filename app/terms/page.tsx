import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service — FlowSync",
  description: `Terms governing your use of ${siteConfig.company.name}.`,
};

const effectiveDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function TermsPage() {
  const company = siteConfig.company.name;
  const email = siteConfig.company.email;

  return (
    <article className="bg-bg">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-40 md:pt-48 pb-24">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-display display-2 text-ink mb-4">Terms of Service</h1>
        <p className="text-muted mb-12">Effective {effectiveDate}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">1. Agreement</h2>
            <p>
              By using this website or joining the {company} waitlist you agree
              to these terms. If you don't agree, please don't use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">2. Pre-launch status</h2>
            <p>
              {company} is pre-launch. Information on this site describes the
              product we are building. Features, pricing, and timelines can
              change. Joining the waitlist is not a guarantee of access or
              eligibility for any specific tier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">3. Your conduct</h2>
            <p>
              Don't attempt to disrupt, reverse-engineer, scrape, or
              brute-force our site or APIs. Don't impersonate someone else when
              submitting the waitlist form.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">4. Intellectual property</h2>
            <p>
              The site design, copy, logos, and brand marks are owned by
              {" "}{siteConfig.company.legalName}. The open-source FlowSync runtime
              is governed by its own license, available in the project
              repository.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">5. No warranty</h2>
            <p>
              This site and any pre-launch demonstrations of FlowSync are
              provided as-is. We make no warranties as to fitness for any
              particular purpose during the pre-launch period.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">6. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, {company} is not liable for
              any indirect, incidental, or consequential damages arising from
              your use of this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">7. Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a className="text-ink underline" href={`mailto:${email}`}>{email}</a>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
