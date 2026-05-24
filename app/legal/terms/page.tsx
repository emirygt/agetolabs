import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms that govern your use of the agetolabs website and services.',
  alternates: { canonical: '/legal/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageShell eyebrow="Legal · Terms" title="Terms of Service" lastUpdated="2026-05-24">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance</h2>
        <p>
          By accessing the agetolabs website you agree to these Terms of Service.
          If you do not agree, please refrain from using the site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Use of the site</h2>
        <p>
          The content on this website is provided for informational purposes about
          the agetolabs product ecosystem. You agree not to misuse, attempt to
          break, scrape automatically or interfere with the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Intellectual property</h2>
        <p>
          All trademarks, product names, copy, designs and source code on this
          site are owned by agetolabs or its licensors and are protected by
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. No warranty</h2>
        <p>
          The site is provided on an "as-is" basis without warranties of any kind,
          either express or implied. We do not guarantee that the site will be
          uninterrupted or error-free.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of liability</h2>
        <p>
          To the extent permitted by law, agetolabs will not be liable for indirect
          or consequential damages arising out of your use of the site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">6. Contact</h2>
        <p>
          Questions about these Terms can be sent to <a href="mailto:info@agetolabs.com" className="text-[#8EF0B5] hover:underline">info@agetolabs.com</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
