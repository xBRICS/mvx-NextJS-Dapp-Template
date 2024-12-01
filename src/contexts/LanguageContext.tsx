'use client';

import { createContext, useContext, useState, useEffect, FC, PropsWithChildren } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en' | 'ro';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang) return savedLang;
      
      // Get language from URL if available
      const pathLang = window.location.pathname.split('/')[1];
      if (pathLang === 'en' || pathLang === 'ro') return pathLang;
    }
    return 'en';
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Sync language with URL on mount and URL changes
    const urlLang = pathname.split('/')[1];
    if ((urlLang === 'en' || urlLang === 'ro') && urlLang !== language) {
      setLanguageState(urlLang as Language);
      localStorage.setItem('language', urlLang);
    }
  }, [pathname, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 