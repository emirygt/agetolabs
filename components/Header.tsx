'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Menu, X, Home, Orbit, Boxes, Users, Briefcase, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { LimelightNav, type LimelightNavItem } from '@/components/LimelightNav';
import { FlyingIconsButton } from '@/components/ui/flying-icons-button';
import { useState, useMemo } from 'react';

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems: LimelightNavItem[] = useMemo(
    () => [
      { key: 'home',      label: lang === 'tr' ? 'Anasayfa' : 'Home', icon: <Home size={14} strokeWidth={1.8} />,  href: '/' },
      { key: 'ecosystem', label: t('ecosystem'), icon: <Orbit size={14} strokeWidth={1.8} />, href: '/ecosystem' },
      { key: 'products',  label: t('solutions'), icon: <Boxes size={14} strokeWidth={1.8} />, href: '/products' },
      { key: 'services',  label: t('services'),  icon: <Briefcase size={14} strokeWidth={1.8} />, href: '/hizmetler' },
      { key: 'contact',   label: t('contact'),   icon: <Mail size={14} strokeWidth={1.8} />,    href: '/contact' },
      { key: 'about',     label: t('aboutUs'),   icon: <Users size={14} strokeWidth={1.8} />, href: '/about' },
    ],
    [t, lang]
  );

  const activeKey =
    pathname === '/' || pathname === '/v2'  ? 'home'      :
    pathname?.startsWith('/ecosystem')      ? 'ecosystem' :
    pathname?.startsWith('/products')       ? 'products'  :
    pathname?.startsWith('/hizmetler')      ? 'services'  :
    pathname?.startsWith('/contact')        ? 'contact'   :
    pathname?.startsWith('/about')          ? 'about'     :
    undefined;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between gap-6">

        <Link
          href="/"
          aria-label="agetolabs · go to homepage"
          className="flex items-center h-10 md:h-12 shrink-0"
        >
          <img
            src="/sonlogo1.svg"
            alt="agetolabs"
            width={2474}
            height={501}
            className="header-logo h-7 md:h-9 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center">
          <LimelightNav items={navItems} activeKey={activeKey} />
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
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
          <FlyingIconsButton
            href="/contact"
            paddingY={10}
            paddingX={22}
          >
            {t('getStarted')}
          </FlyingIconsButton>
        </div>

        <div className="lg:hidden flex items-center gap-3">
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-[#0B0C10]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col py-4 px-6">
            {navItems.map((item) => {
              const isActive = item.key === activeKey;
              const Icon = () => <>{item.icon}</>;
              return (
                <Link
                  key={item.key}
                  onClick={() => setMobileMenuOpen(false)}
                  href={item.href || '#'}
                  className="relative flex items-center gap-3 py-3 pl-4 pr-3 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-300"
                    style={{
                      height: isActive ? '60%' : '0%',
                      background: '#8EF0B5',
                      boxShadow: isActive
                        ? '0 0 10px rgba(142,240,181,0.85), 0 0 20px rgba(142,240,181,0.45)'
                        : 'none',
                    }}
                  />
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center ${
                      isActive ? 'text-[#8EF0B5]' : 'text-gray-500'
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                </Link>
              );
            })}
            <div className="w-full h-px bg-white/10 my-3" />
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1"
            >
              <FlyingIconsButton
                href="/contact"
                paddingY={14}
                paddingX={28}
                fullWidth
              >
                {t('getStarted')}
              </FlyingIconsButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
