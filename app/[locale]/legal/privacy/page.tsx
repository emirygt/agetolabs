import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';
import { MailtoLink } from '@/components/MailtoLink';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How agetolabs collects, uses and safeguards your personal data.',
  alternates: { canonical: '/legal/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell eyebrow="Legal · Privacy" title="Privacy Policy" lastUpdated="2026-05-24">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
        <p>
          This Privacy Policy describes how agetolabs ("we", "us", "our") collects,
          uses and protects information when you visit our website or interact with
          our services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Information we collect</h2>
        <p>We may collect the following categories of data:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Contact details you provide through forms (name, email, company, message).</li>
          <li>Technical data such as browser, device, IP address and pages visited.</li>
          <li>Analytics data via Vercel Analytics to understand aggregate site usage.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. How we use the information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To respond to enquiries you submit through the contact form.</li>
          <li>To improve site performance, reliability and content.</li>
          <li>To send transactional updates if you have explicitly requested them.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Sharing</h2>
        <p>
          We do not sell personal data. We share data only with processors that
          enable our website to operate (e.g. hosting, analytics, email delivery).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Retention</h2>
        <p>
          Personal data submitted via contact forms is retained for the period
          required to respond to and follow up on your request, then deleted or
          anonymised.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">6. Your rights</h2>
        <p>
          You may request access, correction or deletion of your personal data by
          emailing <MailtoLink email="info@agetolabs.com" source="privacy_rights" className="text-[#8EF0B5] hover:underline">info@agetolabs.com</MailtoLink>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
        <p>
          For privacy-related questions: <MailtoLink email="info@agetolabs.com" source="privacy_contact" className="text-[#8EF0B5] hover:underline">info@agetolabs.com</MailtoLink>.
        </p>
      </section>
    </LegalPageShell>
  );
}
