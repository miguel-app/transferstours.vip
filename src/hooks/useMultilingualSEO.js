import { useMemo } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../context/LanguageContext';

/**
 * Custom Hook: useMultilingualSEO
 * 
 * Computes self-referential canonical URLs and bidirectional hreflang tags 
 * for React landing pages to avoid international keyword cannibalization.
 * 
 * @param {Object} options
 * @param {string} options.canonicalBaseUrl Base canonical URL (without query params, e.g. "https://tours.transferstours.com/tour-bogota-tatacoa-san-agustin-5-dias/")
 * @param {Object} options.translations Translations dictionary by language code
 * @returns {Object} Multilingual SEO metadata
 */
export const useMultilingualSEO = ({ canonicalBaseUrl, translations = {} }) => {
  const { lang } = useLanguage();

  // Clean trailing slash & sanitize base URL
  const cleanBaseUrl = useMemo(() => {
    if (!canonicalBaseUrl) return '';
    return canonicalBaseUrl.endsWith('/') ? canonicalBaseUrl : `${canonicalBaseUrl}/`;
  }, [canonicalBaseUrl]);

  /**
   * Helper: Builds explicit URL for a specific language
   */
  const getLanguageUrl = (langCode) => {
    if (langCode === DEFAULT_LANGUAGE) {
      return cleanBaseUrl;
    }
    return `${cleanBaseUrl}?lang=${langCode}`;
  };

  /**
   * 1. Self-referential Canonical URL:
   * CRITICAL FOR SEO: The canonical URL MUST point to ITSELF for the active language.
   * e.g. /?lang=en CANONICAL -> /?lang=en (NOT /)
   */
  const selfReferentialCanonical = useMemo(() => {
    return getLanguageUrl(lang);
  }, [cleanBaseUrl, lang]);

  /**
   * 2. Bidirectional hreflang links array:
   * Maps all alternate language versions + x-default.
   */
  const hreflangLinks = useMemo(() => {
    const links = Object.keys(SUPPORTED_LANGUAGES).map((code) => ({
      rel: 'alternate',
      hreflang: code,
      href: getLanguageUrl(code),
    }));

    // Add x-default fallback pointing to default language URL
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: getLanguageUrl(DEFAULT_LANGUAGE),
    });

    return links;
  }, [cleanBaseUrl]);

  /**
   * 3. Open Graph Locales:
   * Current locale + alternate locales for Facebook/LinkedIn/Twitter crawlers.
   */
  const ogLocale = SUPPORTED_LANGUAGES[lang]?.locale || 'es_CO';
  const ogAlternateLocales = Object.keys(SUPPORTED_LANGUAGES)
    .filter((code) => code !== lang)
    .map((code) => SUPPORTED_LANGUAGES[code].locale);

  /**
   * 4. Localized text strings for current language
   */
  const currentTranslations = translations[lang] || translations[DEFAULT_LANGUAGE] || {};

  return {
    lang,
    selfReferentialCanonical,
    hreflangLinks,
    ogLocale,
    ogAlternateLocales,
    currentTranslations,
    getLanguageUrl,
  };
};
