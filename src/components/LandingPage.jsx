import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { SEOHead } from './SEO/SEOHead';
import { LanguageSwitcher } from './Navigation/LanguageSwitcher';

// Import tour JSON data directly
import tourData from '../../tours_data/bogota-tatacoa-san-agustin-5-dias.json';

const LandingPageContent = () => {
  const { lang } = useLanguage();
  const t = tourData.translations[lang] || tourData.translations.es;

  return (
    <div className="landing-wrapper">
      {/* Dynamic SEO Head Component with Self-Referential Canonical & Hreflang Tags */}
      <SEOHead
        canonicalBaseUrl={tourData.canonical_url}
        translations={tourData.translations}
        tourData={tourData}
      />

      {/* Header */}
      <header className="header">
        <div className="container">
          <a href="/" className="logo">
            <img
              src="https://transferstours.com/wp-content/uploads/2020/09/logo-TT-1280x-1036-e1652990026376.jpeg"
              alt="Transfers & Tours Colombia"
              width="160"
              height="50"
            />
          </a>

          <div className="header-actions">
            <a href="https://wa.me/573146644303" className="contact-phone">
              <span>+57 314 6644303</span>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />

            <a href="#quote-calculator" className="btn btn-primary">
              {t['btn-quote-now']}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          className="hero"
          style={{ backgroundImage: `url(${tourData.hero_image})` }}
        >
          <div class="container">
            <div className="hero-content">
              <h1 dangerouslySetInnerHTML={{ __html: t['hero-h1'] }} />
              <p className="tagline">{t['hero-tagline']}</p>
            </div>
          </div>
        </section>

        {/* Intro & AEO / GEO Section */}
        <section className="seo-intro-section" id="about-tour">
          <div className="container">
            {/* AEO Snippet Card */}
            {t['aeo-snippet-text'] && (
              <div className="aeo-snippet-card">
                <div className="aeo-title">
                  <i className="fa-solid fa-robot" /> Resumen Directo de la Expedición (AEO)
                </div>
                <p>{t['aeo-snippet-text']}</p>
              </div>
            )}

            <div className="seo-intro-grid">
              <div className="seo-text">
                <h2 dangerouslySetInnerHTML={{ __html: t['intro-title'] }} />
                <p>{t['intro-desc-1']}</p>
                <p>{t['intro-desc-2']}</p>
                <p>{t['intro-desc-3']}</p>
              </div>
            </div>

            {/* GEO Technical Specifications Table */}
            <div className="geo-specs-container">
              <h3>Ficha Técnica y Verificación de Servicio (GEO)</h3>
              <table>
                <thead>
                  <tr>
                    <th>Parámetro</th>
                    <th>Especificación</th>
                    <th>Fuente / Entidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Duración</td>
                    <td>5 Días / 4 Noches</td>
                    <td><span className="source-tag">[Fuente: ANATO]</span></td>
                  </tr>
                  <tr>
                    <td>Patrimonio</td>
                    <td>Parque Arqueológico San Agustín & Lavapatas</td>
                    <td><span className="source-tag">[Fuente: UNESCO]</span></td>
                  </tr>
                  <tr>
                    <td>Naturaleza</td>
                    <td>Desierto de la Tatacoa (5 Zonas) & Río Magdalena</td>
                    <td><span className="source-tag">[Fuente: ProColombia]</span></td>
                  </tr>
                  <tr>
                    <td>Transporte</td>
                    <td>Vehículo Privado Climatizado + Vuelo Interno</td>
                    <td><span className="source-tag">[Fuente: Operador RNT N° 44180]</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Wrapper Component exporting full Provider setup
export const LandingPage = ({ initialLang }) => (
  <HelmetProvider>
    <LanguageProvider initialLang={initialLang} baseUrl={tourData.canonical_url}>
      <LandingPageContent />
    </LanguageProvider>
  </HelmetProvider>
);

export default LandingPage;
