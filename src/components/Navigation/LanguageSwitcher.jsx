import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { lang, changeLanguage, supportedLanguages } = useLanguage();

  return (
    <nav className="lang-switch" aria-label="Language Selector">
      {Object.entries(supportedLanguages).map(([code, config]) => (
        <button
          key={code}
          type="button"
          className={`lang-btn ${lang === code ? 'active' : ''}`}
          onClick={() => changeLanguage(code)}
          aria-label={`Cambiar idioma a ${config.label}`}
          aria-current={lang === code ? 'true' : 'false'}
        >
          <span className="lang-flag">{config.flag}</span> {code.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};
