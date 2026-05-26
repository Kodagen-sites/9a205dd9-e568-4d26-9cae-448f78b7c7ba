import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy — FlowSync",
  description: `How ${siteConfig.company.name} collects, uses, and protects your personal information.`,
};

const effectiveDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function PrivacyPolicyPage() {
  const company = siteConfig.company.name;
  const email = siteConfig.company.email;

  return (
    <article className="bg-bg">
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-40 md:pt-48 pb-24">
        <div className="eyebrow mb-4">Legal</div>
        <h1 className="font-display display-2 text-ink mb-4">Privacy Policy</h1>
        <p className="text-muted mb-12">Effective {effectiveDate}</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">1. Who we are</h2>
            <p>
              {company} ({siteConfig.company.legalName}) operates this website and
              the FlowSync platform. We can be reached at{" "}
              <a className="text-ink underline" href={`mailto:${email}`}>{email}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">2. What we collect</h2>
            <p>
              We collect the email address, name, and team size you submit through
              our waitlist form. If you contact us by email, we keep the message
              and your address so we can reply. We log standard server-side data
              (IP, user-agent, request path) for security and performance
              monitoring. We do not run third-party trackers, ad pixels, or
              social-network tags on this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">3. How we use it</h2>
            <p>
              We use your contact information to send you launch updates, beta
              invitations, and pricing information for FlowSync. You can
              unsubscribe at any time. We do not sell, rent, or share your
              personal information with third parties for marketing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">4. Where we store it</h2>
            <p>
              Waitlist data is held in a Supabase Postgres instance hosted in the
              EU. Backups are encrypted at rest. Access is restricted to founding
              engineers and audited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">5. Your rights</h2>
            <p>
              Under GDPR and equivalent laws you can ask us at any time to access,
              correct, export, or delete your personal data. Email{" "}
              <a className="text-ink underline" href={`mailto:${email}`}>{email}</a>{" "}
              and we will action your request within 14 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">6. Cookies</h2>
            <p>
              We use a single first-party session cookie for the form CSRF token.
              No analytics cookies, no advertising cookies. If we add product
              analytics later, we will update this page and obtain consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-ink">7. Changes</h2>
            <p>
              We will post changes to this page and update the effective date. For
              material changes, we will also notify subscribers by email.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
