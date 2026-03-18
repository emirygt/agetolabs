'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Logo } from '@/components/Logo';

export function Footer() {
  const { lang, t } = useLanguage();

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
              {lang === 'tr' 
                ? 'Şirketlerin manuel iş yükünü sıfırlayan, verileri gerçek zamanlı kararlara dönüştüren otonom yapay zeka ekosistemleri inşa ediyoruz.' 
                : 'We build autonomous AI ecosystems that eliminate manual workloads and turn data into real-time decisions for companies.'
              }
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#8EF0B5] hover:border-[#8EF0B5]/50 transition-all bg-white/5">
                <Icons.Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#8EF0B5] hover:border-[#8EF0B5]/50 transition-all bg-white/5">
                <Icons.Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#8EF0B5] hover:border-[#8EF0B5]/50 transition-all bg-white/5">
                <Icons.Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">
              {lang === 'tr' ? 'Ürünler' : 'Products'}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/products/agento-otonom-ajani" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  Autonomous Agent
                </Link>
              </li>
              <li>
                <Link href="/products/agento-wp-satis-asitasi" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
                  WhatsApp Sales Automation
                </Link>
              </li>
              <li>
                <Link href="/products/agento-struct-editör" className="text-gray-400 hover:text-[#8EF0B5] transition-colors text-sm">
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
              {lang === 'tr' ? 'Şirket' : 'Company'}
            </h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Hakkımızda' : 'About Us'}</Link></li>
              <li><Link href="/ecosystem" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Ekosistem Mimari' : 'Ecosystem Architecture'}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Bizimle İletişime Geçin' : 'Contact Us'}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Kariyer' : 'Careers'}</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-wide">
              {lang === 'tr' ? 'Yasal' : 'Legal'}
            </h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service'}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'Çerez Politikası' : 'Cookie Policy'}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{lang === 'tr' ? 'KVKK Metni' : 'Data Protection Laws'}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AgentoLabs. {lang === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{lang === 'tr' ? 'Ortak Otonom Zeka Altyapısı İle Güçlendirilmiştir' : 'Powered By Unified Autonomous Intelligence'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8EF0B5] animate-pulse"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
