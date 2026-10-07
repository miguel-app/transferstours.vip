import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useMultilingualSEO } from '../../hooks/useMultilingualSEO';

/**
 * React SEOHead Component
 * 
 * Renders strict, self-referential canonical tags & complete hreflang links 
 * to eliminate international keyword cannibalization across search engines & AI bots.
 */
export const SEOHead = ({ canonicalBaseUrl, translations = {}, tourData = {} }) => {
  const {
    lang,
    selfReferentialCanonical,
    hreflangLinks,
    ogLocale,
    ogAlternateLocales,
    currentTranslations,
  } = useMultilingualSEO({ canonicalBaseUrl, translations });

  // Extract clean Title & Description for active language
  const rawTitle = currentTranslations['hero-h1'] || tourData.landing_name || '';
  const cleanTitle = rawTitle.replace(/<\/?span>/g, '');
  const metaDescription = currentTranslations['hero-tagline'] || tourData.description || '';

  // Construct localized Schema.org Graph (TouristTrip + FAQPage)
  const faqEntities = [];
  let fqIndex = 1;
  while (currentTranslations[`fq${fqIndex}-q`]) {
    faqEntities.push({
      '@type': 'Question',
      name: currentTranslations[`fq${fqIndex}-q`],
      acceptedAnswer: {
        '@type': 'Answer',
        text: currentTranslations[`fq${fqIndex}-a`],
      },
    });
    fqIndex++;
  }

  const localizedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: cleanTitle,
        description: metaDescription,
        touristType: 'Leisure, Adventure',
        url: selfReferentialCanonical,
        inLanguage: lang,
        offers: {
          '@type': 'Offer',
          price: tourData?.pricing?.base_prices?.eutopiq?.toString() || '890',
          priceCurrency: tourData?.pricing?.currency || 'USD',
          availability: 'https://schema.org/InStock',
          url: selfReferentialCanonical,
          offeredBy: {
            '@type': 'LocalBusiness',
            name: 'Transfers & Tours Colombia',
            telephone: '+57 314 6644303',
            email: 'contacto@transferstours.com',
          },
        },
      },
      ...(faqEntities.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqEntities,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      {/* 1. Basic HTML & Meta Tags */}
      <html lang={lang} />
      <title>{cleanTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />

      {/* 2. Geo Local Metadata */}
      {tourData.geo_position && <meta name="geo.position" content={tourData.geo_position} />}
      {tourData.geo_region && <meta name="geo.region" content={tourData.geo_region} />}
      {tourData.geo_placename && <meta name="geo.placename" content={tourData.geo_placename} />}

      {/* 3. CRITICAL: Self-Referential Canonical URL (Prevents Cannibalization) */}
      <link rel="canonical" href={selfReferentialCanonical} />

      {/* 4. CRITICAL: Hreflang Alternate Links for All Supported Languages */}
      {hreflangLinks.map((link) => (
        <link key={link.hreflang} rel={link.rel} hreflang={link.hreflang} href={link.href} />
      ))}

      {/* 5. Open Graph Metadata */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={selfReferentialCanonical} />
      <meta property="og:locale" content={ogLocale} />
      {ogAlternateLocales.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}

      {/* 6. Dynamic JSON-LD Structured Data Schema */}
      <script type="application/ld+json">{JSON.stringify(localizedSchema)}</script>
    </Helmet>
  );
};
