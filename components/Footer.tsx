'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Logo } from '@/components/Logo';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[30%] bg-[#8EF0B5]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105 h-12 w-auto">
              <Logo />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footerBrandLine')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:info@agetolabs.com"
                className="inline-flex h-10 items-center gap-2 px-4 rounded-full border border-white/10 text-gray-300 hover:text-[#8EF0B5] hover:border-[#8EF0B5]/50 transition-all bg-white/5"
              >
                <Icons.Mail size={16} />
                <span className="text-sm font-medium">info@agetolabs.com</span>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">
              {t('solutions')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/products/agento-otonom-agent" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  Autonomous Agent
                </Link>
              </li>
              <li>
                <Link href="/products/agento-wh-sales" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  WhatsApp Sales Automation
                </Link>
              </li>
              <li>
                <Link href="/products/agento-struct-editor" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  Structa AI
                </Link>
              </li>
              <li>
                <Link href="/products/agento-pharm-ia" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  Pharma AI
                </Link>
              </li>
              <li>
                <Link href="/products/agento-eczaport" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  Eczaport
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">
              {t('company')}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">{t('aboutUs')}</Link></li>
              <li><Link href="/ecosystem" className="text-gray-400 hover:text-white transition-colors text-sm">{t('ecosystemArchitecture')}</Link></li>
              <li><Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors text-sm">Case Studies</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">{t('contactUs')}</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">
              {t('legal')}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">{t('privacyPolicy')}</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors text-sm">{t('termsOfService')}</Link></li>
              <li><Link href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">{t('cookiePolicy')}</Link></li>
              <li><Link href="/legal/kvkk" className="text-gray-400 hover:text-white transition-colors text-sm">{t('dataProtection')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Agetolabs. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{t('poweredByLine')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8EF0B5] animate-pulse"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
