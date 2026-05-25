'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

const STORAGE_KEY = 'agetolabs.cookie-consent.v1';

type Lang = 'tr' | 'en';

const COPY: Record<Lang, {
  text: string;
  privacy: string;
  accept: string;
}> = {
  tr: {
    text: 'Bu site, deneyimi iyileştirmek için anonim ziyaret verilerini topluyor. Çerez kullanmıyoruz; veriler kişisel kimliğinizle eşlenmez.',
    privacy: 'Gizlilik Politikası',
    accept: 'Tamam',
  },
  en: {
    text: 'This site collects anonymous visit data to improve the experience. No cookies are used; data is not linked to your identity.',
    privacy: 'Privacy Policy',
    accept: 'Got it',
  },
};

export function CookieConsent() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer the check + paint until idle so the banner never competes with
    // the hero's first paint window.
    const reveal = () => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY) !== '1') {
          setVisible(true);
        }
      } catch {
        // localStorage blocked (private mode, etc.) — show the banner anyway.
        setVisible(true);
      }
    };
    const useRic = typeof window.requestIdleCallback === 'function';
    const id: number = useRic
      ? window.requestIdleCallback(reveal, { timeout: 2000 })
      : window.setTimeout(reveal, 1200);
    return () => {
      if (useRic && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(id);
      } else {
        window.clearTimeout(id);
      }
    };
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore — they'll just see the banner next visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  const t = COPY[lang];

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-3 left-3 right-3 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-[70] pointer-events-auto"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0F1014]/95 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] px-4 py-3.5 md:px-5 md:py-4 flex flex-col gap-3">
        <p className="text-[12.5px] md:text-[13px] leading-relaxed text-gray-300">
          {t.text}{' '}
          <Link
            href="/legal/privacy"
            className="text-[#8EF0B5] hover:text-white underline-offset-2 hover:underline transition-colors"
          >
            {t.privacy}
          </Link>
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={accept}
            className="px-4 py-1.5 rounded-full bg-[#8EF0B5] text-black text-[12px] font-semibold hover:bg-white transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
