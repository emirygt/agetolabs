'use client';

import Link from 'next/link';
import { Bot, Menu, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Logo } from '@/components/Logo';
import { useState } from 'react';

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center h-10 md:h-12 w-48 md:w-64">
          <Logo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-300 text-sm font-medium">
          <Link href="/ecosystem" className="hover:text-white transition-colors py-4">{t('ecosystem')}</Link>
          <Link href="/products" className="hover:text-white transition-colors py-4">{t('solutions')}</Link>
          <Link href="/technology" className="hover:text-white transition-colors py-4">{t('technology')}</Link>
          <Link href="/about" className="hover:text-white transition-colors py-4">{t('aboutUs')}</Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setLang('tr')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                lang === 'tr' 
                  ? 'bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Türkçe"
            >
              <Bot size={14} />
              <span className="text-xs font-bold">TR</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                lang === 'en' 
                  ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              title="English"
            >
              <Bot size={14} />
              <span className="text-xs font-bold">EN</span>
            </button>
          </div>
          <Link 
            href="/contact" 
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#8EF0B5] px-6 text-sm font-semibold text-black hover:bg-[#8EF0B5]/90 transition-colors"
          >
            {t('getStarted')}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Mobile Lang Switch */}
          <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 text-gray-300"
            >
              <Bot size={14} />
              <span className="text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
          </div>
          <button 
            className="text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-[#0B0C10]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col items-center gap-6 py-8 text-gray-300 text-lg font-medium">
            <Link onClick={() => setMobileMenuOpen(false)} href="/ecosystem" className="hover:text-[#8EF0B5] transition-colors">{t('ecosystem')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/products" className="hover:text-[#8EF0B5] transition-colors">{t('solutions')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/technology" className="hover:text-[#8EF0B5] transition-colors">{t('technology')}</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/about" className="hover:text-[#8EF0B5] transition-colors">{t('aboutUs')}</Link>
            <div className="w-1/2 h-px bg-white/10 my-2"></div>
            <Link 
              onClick={() => setMobileMenuOpen(false)}
              href="/contact" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#8EF0B5] px-8 text-base font-bold text-black hover:bg-white transition-colors"
            >
              {t('getStarted')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
