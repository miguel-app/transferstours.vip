const fs = require('fs');
const path = require('path');

// 1. Validate inputs
const tourId = process.argv[2];
if (!tourId) {
  console.error("Error: Please provide a tour ID, e.g.: node build.js medellin-4-dias");
  process.exit(1);
}

// 2. Resolve paths
const dataPath = path.join(__dirname, 'tours_data', `${tourId}.json`);
const templatePath = path.join(__dirname, 'template', 'template.html');
const stylesPath = path.join(__dirname, 'template', 'styles.css');
const appPath = path.join(__dirname, 'template', 'app.js');

if (!fs.existsSync(dataPath)) {
  console.error(`Error: Configuration data file not found at ${dataPath}`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error(`Error: Master HTML template not found at ${templatePath}`);
  process.exit(1);
}

// 3. Read files
const tourData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let html = fs.readFileSync(templatePath, 'utf8');

// 4. Generate SEO Canonical & Hreflang Tags
const canonicalUrl = tourData.canonical_url;
const canonicalLinks = `
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="es" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}?lang=en" />
    <link rel="alternate" hreflang="pt" href="${canonicalUrl}?lang=pt" />
    <link rel="alternate" hreflang="de" href="${canonicalUrl}?lang=de" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
`;

// 5. Generate dynamic Google Structured JSON-LD Schema
const cleanTitle = tourData.translations.es["hero-h1"].replace(/<\/?span>/g, '');
const cleanDesc = tourData.translations.es["hero-tagline"];

const itemListElement = [];
const itineraryDaysCount = (tourData.itinerary && Array.isArray(tourData.itinerary)) ? tourData.itinerary.length : 0;

if (itineraryDaysCount > 0) {
  tourData.itinerary.forEach((item) => {
    const d = item.day;
    const titleKey = `d${d}-title`;
    const descKey = `d${d}-desc`;
    itemListElement.push({
      "@type": "ListItem",
      "position": d,
      "item": {
        "@type": "TouristAttraction",
        "name": tourData.translations.es[titleKey] || `Día ${d}`,
        "description": (tourData.translations.es[descKey] || "").slice(0, 150) + "..."
      }
    });
  });
}

// Extract FAQs for Schema
const faqEntities = [];
let fqSchemaIdx = 1;
while (tourData.translations.es[`fq${fqSchemaIdx}-q`]) {
  faqEntities.push({
    "@type": "Question",
    "name": tourData.translations.es[`fq${fqSchemaIdx}-q`],
    "acceptedAnswer": {
      "@type": "Answer",
      "text": tourData.translations.es[`fq${fqSchemaIdx}-a`]
    }
  });
  fqSchemaIdx++;
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "name": cleanTitle,
      "description": cleanDesc,
      "touristType": "Leisure, Adventure",
      "duration": `P${itineraryDaysCount}D`,
      "itinerary": {
        "@type": "ItemList",
        "numberOfItems": itineraryDaysCount,
        "itemListElement": itemListElement
      },
      "offers": {
        "@type": "Offer",
        "price": (tourData.pricing.base_prices.eutopiq || Object.values(tourData.pricing.base_prices)[0] || 0).toString(),
        "priceCurrency": tourData.pricing.currency,
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-07-09",
        "url": canonicalUrl,
        "offeredBy": {
          "@type": "LocalBusiness",
          "name": "Transfers & Tours Colombia",
          "image": "https://transferstours.com/wp-content/uploads/2020/09/logo-TT-1280x-1036-e1652990026376.jpeg",
          "telephone": "+57 314 6644303",
          "email": "contacto@transferstours.com",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle 93 # 12 - 14",
            "addressLocality": "Bogotá",
            "addressRegion": "Cundinamarca",
            "postalCode": "110221",
            "addressCountry": "CO"
          }
        }
      }
    },
    ...(faqEntities.length > 0 ? [{
      "@type": "FAQPage",
      "mainEntity": faqEntities
    }] : [])
  ]
};

const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;

// 6. Generate dynamic HTML fragments
// 6a. Itinerary Accordion
let accordionHtml = '';
if (itineraryDaysCount > 0) {
  tourData.itinerary.forEach((item, index) => {
    const d = item.day;
    const isOpen = index === 0 ? 'open' : '';
    
    // Generate tags (day-included-items)
    let tagsHtml = '';
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(tag => {
        let tagIcon = 'fa-van-shuttle';
        if (tag === 'private') tagIcon = 'fa-car';
        if (tag === 'shared') tagIcon = 'fa-users';
        if (tag === 'lunch') tagIcon = 'fa-utensils';
        if (tag === 'entry') tagIcon = 'fa-ticket';
        if (tag === 'breakfast') tagIcon = 'fa-mug-hot';
        if (tag === 'guide') tagIcon = 'fa-user-tie';
        if (tag === 'hotel') tagIcon = 'fa-hotel';
        if (tag === 'flight') tagIcon = 'fa-plane';
        
        tagsHtml += `                  <div class="day-included-item">
                    <i class="fa-solid ${tagIcon}"></i>
                    <span data-i18n="tag-${tag}">${tourData.translations.es[`tag-${tag}`] || tag}</span>
                  </div>\n`;
      });
    }

    // Generate highlights (day-highlight-tag list)
    let highlightsHtml = '';
    for (let i = 1; i <= 3; i++) {
      const key = `d${d}-highlight-${i}`;
      const defaultText = tourData.translations.es[key] || '';
      if (defaultText) {
        highlightsHtml += `                    <span class="day-highlight-tag" data-i18n="${key}">${defaultText}</span>\n`;
      }
    }

    const titleKey = `d${d}-title`;
    const descKey = `d${d}-desc`;
    const defaultTitle = tourData.translations.es[titleKey] || `Día ${d}`;
    const defaultDesc = tourData.translations.es[descKey] || '';

    accordionHtml += `
          <!-- Paso ${d} -->
          <div class="itinerary-day ${isOpen}" id="day-${d}-node">
            <div class="day-header">
              <div class="day-title-wrapper">
                <div class="day-number">${d}</div>
                <div class="day-title-info">
                  <span data-i18n="day">${tourData.translations.es["day"] || "Día"}</span>
                  <h3 data-i18n="${titleKey}">${defaultTitle}</h3>
                </div>
              </div>
              <div class="day-toggle"><i class="fa-solid fa-chevron-down"></i></div>
            </div>
            <div class="day-content">
              <div class="day-content-inner">
                <div class="day-desc">
                  <p data-i18n="${descKey}">${defaultDesc}</p>
                  <div class="day-highlights">
\n${highlightsHtml}                  </div>
                  <div class="day-included-items">
\n${tagsHtml}                  </div>
                </div>
                <div class="day-img">
                  <img src="${item.image}" alt="${defaultTitle}" />
                </div>
              </div>
            </div>
          </div>\n`;
  });
}

// 6b. Inclusions List
let inclusionsHtml = '';
let incCount = 1;
while (tourData.translations.es[`inc-${incCount}`]) {
  const key = `inc-${incCount}`;
  const defaultText = tourData.translations.es[key];
  inclusionsHtml += `
              <li class="inc-item">
                <i class="fa-solid fa-check"></i>
                <span data-i18n="${key}">${defaultText}</span>
              </li>\n`;
  incCount++;
}

// 6c. Exclusions List
let exclusionsHtml = '';
let excCount = 1;
while (tourData.translations.es[`exc-${excCount}`]) {
  const key = `exc-${excCount}`;
  const defaultText = tourData.translations.es[key];
  exclusionsHtml += `
              <li class="inc-item">
                <i class="fa-solid fa-xmark"></i>
                <span data-i18n="${key}">${defaultText}</span>
              </li>\n`;
  excCount++;
}

// 6d. FAQs List
let faqsHtml = '';
let faqCount = 1;
while (tourData.translations.es[`fq${faqCount}-q`]) {
  const qKey = `fq${faqCount}-q`;
  const aKey = `fq${faqCount}-a`;
  const defaultQ = tourData.translations.es[qKey];
  const defaultA = tourData.translations.es[aKey];
  faqsHtml += `
            <div class="faq-item">
              <div class="faq-question">
                <h3 data-i18n="${qKey}">${defaultQ}</h3>
                <div class="faq-toggle"><i class="fa-solid fa-chevron-down"></i></div>
              </div>
              <div class="faq-answer">
                <div class="faq-answer-inner">
                  <p data-i18n="${aKey}">${defaultA}</p>
                </div>
              </div>
            </div>\n`;
  faqCount++;
}

// 6e. AEO Snippet Card
const aeoText = tourData.translations.es["aeo-snippet-text"] || "";
const aeoSnippetHtml = aeoText ? `
          <!-- AEO Snippet Box -->
          <div class="aeo-snippet-card" style="background: linear-gradient(135deg, rgba(2, 42, 146, 0.05) 0%, rgba(245, 158, 11, 0.08) 100%); border-left: 4px solid #022aa6; padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; color: #022aa6; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">
              <i class="fa-solid fa-robot"></i> <span>Resumen Directo de la Expedición (AEO / Snippet Nativo)</span>
            </div>
            <p data-i18n="aeo-snippet-text" style="font-size: 1.05rem; line-height: 1.65; color: #1e293b; margin: 0; font-weight: 500;">
              ${aeoText}
            </p>
          </div>` : '';

// 6f. GEO Specifications Table
const geoSpecsHtml = `
          <!-- GEO Technical Specifications Table -->
          <div class="geo-specs-container" style="margin-top: 36px; margin-bottom: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <h3 style="font-size: 1.2rem; color: #0f172a; margin-bottom: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-table-list" style="color: #022aa6;"></i> Ficha Técnica y Verificación de Servicio (GEO / LLMO)
            </h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; color: #334155;">
                <thead>
                  <tr style="background: #f8fafc; text-align: left; border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 12px 16px; font-weight: 600;">Parámetro de Servicio</th>
                    <th style="padding: 12px 16px; font-weight: 600;">Especificación Garantizada</th>
                    <th style="padding: 12px 16px; font-weight: 600;">Fuente de Verificación / Entidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Duración del Circuito</td>
                    <td style="padding: 12px 16px;">5 Días / 4 Noches (Bogotá, Tatacoa, San Agustín)</td>
                    <td style="padding: 12px 16px;"><span class="source-tag" style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:600;">[Fuente: ANATO]</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Patrimonio & Arqueología</td>
                    <td style="padding: 12px 16px;">Parque Arqueológico de San Agustín y Lavapatas (UNESCO)</td>
                    <td style="padding: 12px 16px;"><span class="source-tag" style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:600;">[Fuente: UNESCO]</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Turismo de Naturaleza</td>
                    <td style="padding: 12px 16px;">Desierto de la Tatacoa (5 Zonas), Astronomía y Río Magdalena</td>
                    <td style="padding: 12px 16px;"><span class="source-tag" style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:600;">[Fuente: ProColombia]</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Transporte y Registro</td>
                    <td style="padding: 12px 16px;">Vehículos privados climatizados + Vuelo interno + RNT N° 44180</td>
                    <td style="padding: 12px 16px;"><span class="source-tag" style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:600;">[Fuente: Operador RNT N° 44180]</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Calidad de Servicio</td>
                    <td style="padding: 12px 16px;">Excelente satisfacción de viajeros y guías locales certificados</td>
                    <td style="padding: 12px 16px;"><span class="source-tag" style="background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:4px; font-size:0.85rem; font-weight:600;">[Fuente: TripAdvisor]</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`;

// 6g. Inline the raw tour configuration data
const tourDataScript = `<script>\nwindow.tourData = ${JSON.stringify(tourData, null, 2)};\n</script>`;

// 7. Inject template placeholders
html = html.replace(/{{SEO_TITLE}}/g, cleanTitle);
html = html.replace(/{{SEO_META_DESC}}/g, cleanDesc);
html = html.replace(/{{GEO_POSITION}}/g, tourData.geo_position);
html = html.replace(/{{GEO_REGION}}/g, tourData.geo_region);
html = html.replace(/{{GEO_PLACENAME}}/g, tourData.geo_placename);
html = html.replace(/{{CANONICAL_LINKS}}/g, canonicalLinks);
html = html.replace(/{{JSON_LD_SCHEMA}}/g, schemaScript);
html = html.replace(/{{TOUR_DATA}}/g, tourDataScript);
html = html.replace(/{{ITINERARY_ACCORDION}}/g, accordionHtml);
html = html.replace(/{{INCLUSIONS_LIST}}/g, inclusionsHtml);
html = html.replace(/{{EXCLUSIONS_LIST}}/g, exclusionsHtml);
html = html.replace(/{{FAQS_LIST}}/g, faqsHtml);

html = html.replace(/{{HERO_H1}}/g, tourData.translations.es["hero-h1"] || cleanTitle);
html = html.replace(/{{HERO_TAGLINE}}/g, tourData.translations.es["hero-tagline"] || cleanDesc);
html = html.replace(/{{HERO_BADGE_1}}/g, tourData.translations.es["hero-badge-1"] || "");
html = html.replace(/{{HERO_BADGE_2}}/g, tourData.translations.es["hero-badge-2"] || "");
html = html.replace(/{{HERO_BADGE_3}}/g, tourData.translations.es["hero-badge-3"] || "");
html = html.replace(/{{HERO_BADGE_4}}/g, tourData.translations.es["hero-badge-4"] || "");

html = html.replace(/{{BADGE_1_TITLE}}/g, tourData.translations.es["badge-1-title"] || "");
html = html.replace(/{{BADGE_1_DESC}}/g, tourData.translations.es["badge-1-desc"] || "");
html = html.replace(/{{BADGE_2_TITLE}}/g, tourData.translations.es["badge-2-title"] || "");
html = html.replace(/{{BADGE_2_DESC}}/g, tourData.translations.es["badge-2-desc"] || "");
html = html.replace(/{{BADGE_3_TITLE}}/g, tourData.translations.es["badge-3-title"] || "");
html = html.replace(/{{BADGE_3_DESC}}/g, tourData.translations.es["badge-3-desc"] || "");
html = html.replace(/{{BADGE_4_TITLE}}/g, tourData.translations.es["badge-4-title"] || "");
html = html.replace(/{{BADGE_4_DESC}}/g, tourData.translations.es["badge-4-desc"] || "");

html = html.replace(/{{ITINERARY_SUBTITLE}}/g, tourData.translations.es["itinerary-subtitle"] || "");
html = html.replace(/{{CALC_TITLE}}/g, tourData.translations.es["calc-title"] || "Calculadora de Tarifas");
html = html.replace(/{{CALC_SUBTITLE}}/g, tourData.translations.es["calc-subtitle"] || "");
html = html.replace(/{{CALC_TITLE_ALEJANDRIA}}/g, tourData.translations.es["calc-title-alejandria"] || "");
html = html.replace(/{{CALC_DESC_ALEJANDRIA}}/g, tourData.translations.es["calc-desc-alejandria"] || "");
html = html.replace(/{{CALC_TITLE_EUTOPIQ}}/g, tourData.translations.es["calc-title-eutopiq"] || "");
html = html.replace(/{{CALC_DESC_EUTOPIQ}}/g, tourData.translations.es["calc-desc-eutopiq"] || "");

html = html.replace(/{{AEO_SNIPPET_BOX}}/g, aeoSnippetHtml);
html = html.replace(/{{GEO_SPECS_TABLE}}/g, geoSpecsHtml);

html = html.replace(/{{TEST_TITLE}}/g, tourData.translations.es["test-title"] || 'Opiniones de <span>Nuestros Pasajeros</span>');
html = html.replace(/{{TEST_SUBTITLE}}/g, tourData.translations.es["test-subtitle"] || 'Clientes reales que han disfrutado de este itinerario.');
html = html.replace(/{{TEST_1_TEXT}}/g, tourData.translations.es["test-1-text"] || '');
html = html.replace(/{{TEST_2_TEXT}}/g, tourData.translations.es["test-2-text"] || '');
html = html.replace(/{{TEST_3_TEXT}}/g, tourData.translations.es["test-3-text"] || '');

html = html.replace(/{{INTRO_IMAGE}}/g, tourData.intro_image || 'assets/medellin_experience.png');
html = html.replace(/{{INTRO_TITLE}}/g, tourData.translations.es['intro-title'] || 'Descubre nuestro tour');
html = html.replace(/{{INTRO_DESC_1}}/g, tourData.translations.es['intro-desc-1'] || '');
html = html.replace(/{{INTRO_DESC_2}}/g, tourData.translations.es['intro-desc-2'] || '');
html = html.replace(/{{INTRO_DESC_3}}/g, tourData.translations.es['intro-desc-3'] || '');
html = html.replace(/{{HERO_IMAGE}}/g, tourData.hero_image || 'assets/medellin_hero.png');

// 8. Create destination directory
const destFolder = path.join(__dirname, tourData.folder_name);
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

// 9. Write compiled output
fs.writeFileSync(path.join(destFolder, 'index.html'), html, 'utf8');

// 10. Copy static stylesheets and scripts
if (fs.existsSync(stylesPath)) {
  fs.copyFileSync(stylesPath, path.join(destFolder, 'styles.css'));
}
if (fs.existsSync(appPath)) {
  fs.copyFileSync(appPath, path.join(destFolder, 'app.js'));
}

console.log(`\n======================================================`);
console.log(`SUCCESS: Compiled landing page for: '${tourId}'`);
console.log(`Output folder: './${tourData.folder_name}/'`);
console.log(`======================================================\n`);
