import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Supported Languages Configuration
 */
export const SUPPORTED_LANGUAGES = {
  es: { code: 'es', label: 'Español', locale: 'es_CO', flag: '🇪🇸' },
  en: { code: 'en', label: 'English', locale: 'en_US', flag: '🇺🇸' },
  pt: { code: 'pt', label: 'Português', locale: 'pt_BR', flag: '🇧🇷' },
  de: { code: 'de', label: 'Deutsch', locale: 'de_DE', flag: '🇩🇪' },
};

export const DEFAULT_LANGUAGE = 'es';

const LanguageContext = createContext();

export const LanguageProvider = ({ children, initialLang = DEFAULT_LANGUAGE, baseUrl = '' }) => {
  const [lang, setLang] = useState(() => {
    // 1. Check URL query param (?lang=en)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang && SUPPORTED_LANGUAGES[urlLang]) {
        return urlLang;
      }
    }
    return initialLang;
  });

  // Sync language selection with URL parameter without full page reload
  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGUAGES[newLang]) return;
    setLang(newLang);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newLang === DEFAULT_LANGUAGE) {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', newLang);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  useEffect(() => {
    // Keep html lang attribute in sync for accessibility & screen readers
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, supportedLanguages: SUPPORTED_LANGUAGES, baseUrl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
