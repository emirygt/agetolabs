import type { Metadata } from 'next';
import { LegalPageShell } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How agetolabs uses cookies and similar technologies.',
  alternates: { canonical: '/legal/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPageShell eyebrow="Legal · Cookies" title="Cookie Policy" lastUpdated="2026-05-24">
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device by websites you
          visit. We use them to remember your preferences (such as language) and
          to understand how the site is used.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Cookies we use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-white">Functional · localStorage</strong> — we
            store your selected language (TR/EN) locally so the site remembers it
            between visits.
          </li>
          <li>
            <strong className="text-white">Analytics · Vercel Analytics</strong> —
            anonymous, aggregate visit data such as page views and country.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Managing cookies</h2>
        <p>
          You can disable cookies and local storage through your browser
          settings. Doing so may impact some features (e.g. language remembered
          between sessions).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Contact</h2>
        <p>
          For questions on cookies: <a href="mailto:info@agetolabs.com" className="text-[#8EF0B5] hover:underline">info@agetolabs.com</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
