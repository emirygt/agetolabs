'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, Language } from '@/lib/translations';
import { detectLocaleFromPath, stripLocale, type Locale } from '@/lib/locale';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const lang: Language = detectLocaleFromPath(pathname ?? `/${initialLocale}`);

  const setLang = useCallback(
    (newLang: Language) => {
      if (newLang === lang) return;
      const basePath = stripLocale(pathname ?? '/');
      const target = basePath === '/' ? `/${newLang}` : `/${newLang}${basePath}`;
      router.push(target);
    },
    [lang, pathname, router]
  );

  const t = useCallback(
    (key: keyof typeof translations.en) =>
      translations[lang]?.[key] ?? translations.en[key] ?? String(key),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
