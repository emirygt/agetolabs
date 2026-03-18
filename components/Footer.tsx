'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-[#0B0C10] py-8 mt-12">
      <div className="max-w-[1600px] mx-auto px-8 flex flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-6 font-medium">
            <Link href="/company" className="hover:text-white transition-colors">{t('company')}</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">{t('solutions')}</Link>
            <Link href="/technology" className="hover:text-white transition-colors">{t('technology')}</Link>
            <Link href="/about" className="hover:text-white transition-colors">{t('aboutUs')}</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} agentolabs. {t('allRightsReserved')}</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-gray-400">
          <span>{t('poweredBy')}</span>
          <div className="flex items-center gap-2 text-lg">
            <span className="text-white font-bold tracking-tighter">agentolabs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
