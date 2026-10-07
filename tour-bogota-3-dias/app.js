// Master translations dictionary (populated at runtime by window.tourData)
let translations = {};

// Global language state
let currentLang = "es";

// Switch language function
function switchLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;

  // Update active buttons state
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) activeBtn.classList.add("active");

  // Update DOM canonical tag self-referentially to prevent search engine cannibalization
  const canonicalTag = document.querySelector("link[rel='canonical']");
  if (canonicalTag && window.tourData && window.tourData.canonical_url) {
    const baseUrl = window.tourData.canonical_url;
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const selfCanonical = lang === 'es' ? cleanBaseUrl : `${cleanBaseUrl}?lang=${lang}`;
    canonicalTag.setAttribute("href", selfCanonical);
  }

  // Update html lang attribute
  document.documentElement.setAttribute("lang", lang);

  // Translate all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    let text = translations[lang][key];
    
    if (text) {
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
        el.setAttribute("placeholder", text);
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Recompute prices after language switch
  updatePrices();
}

// Pricing Calculator configuration
let paxCount = 2;
let selectedHotel = "alejandria"; // "alejandria" or "eutopiq"

function updatePrices() {
  const pricing = window.tourData.pricing;
  let basePrice = pricing.base_prices[selectedHotel] || 400;

  // Progressive Group Discount
  let discountPercent = 0;
  if (paxCount >= pricing.group_discount.min_pax) {
    discountPercent = pricing.group_discount.discount_percent;
  }

  // Check if basePrice is an array (representing a range)
  const isRange = Array.isArray(basePrice);
  let finalPricePerPerson, totalReservationPrice;

  if (isRange) {
    const finalMin = Math.round(basePrice[0] * (1 - discountPercent / 100));
    const finalMax = Math.round(basePrice[1] * (1 - discountPercent / 100));
    finalPricePerPerson = [finalMin, finalMax];
    totalReservationPrice = [finalMin * paxCount, finalMax * paxCount];
  } else {
    finalPricePerPerson = Math.round(basePrice * (1 - discountPercent / 100));
    totalReservationPrice = finalPricePerPerson * paxCount;
  }

  // Format currency helper
  const formatSingleVal = (val) => {
    if (pricing.currency === "USD") {
      return "$" + val.toLocaleString("en-US") + " USD";
    } else {
      return "$" + val.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " COP";
    }
  };

  const formatCurrency = (val) => {
    if (Array.isArray(val)) {
      return `${formatSingleVal(val[0])} - ${formatSingleVal(val[1])}`;
    }
    return formatSingleVal(val);
  };

  // Update DOM displays
  const priceDisplay = document.getElementById("price-value");
  const totalPriceDisplay = document.getElementById("total-price-value");
  const savingInfo = document.getElementById("calc-saving-info");

  if (priceDisplay) {
    priceDisplay.innerText = `${formatCurrency(finalPricePerPerson)}`;
  }
  if (totalPriceDisplay) {
    totalPriceDisplay.innerText = `${formatCurrency(totalReservationPrice)}`;
  }

  if (savingInfo) {
    if (discountPercent > 0) {
      savingInfo.className = "calc-saving-alert active";
      let savingTxt = translations[currentLang]["calc-saving"] || "";
      savingTxt = savingTxt.replace("{percent}", discountPercent);
      savingInfo.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${savingTxt}`;
    } else {
      savingInfo.className = "calc-saving-alert";
      const standardText = translations[currentLang]["calc-no-saving"] || "Tarifa estándar garantizada para grupos de 1 a 4 personas.";
      savingInfo.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${standardText}</span>`;
    }
  }
}

// DOM Elements Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Initialize translations from window.tourData
  if (window.tourData && window.tourData.translations) {
    translations = window.tourData.translations;
  }

  // 1. Detect language parameter in URL (?lang=en|pt|de)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  if (langParam && ["es", "en", "pt", "de"].includes(langParam.toLowerCase())) {
    currentLang = langParam.toLowerCase();
  }
  switchLanguage(currentLang);

  // 2. Language switch click events
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.id.replace("lang-", "");
      switchLanguage(lang);
    });
  });

  // 3. Itinerary Accordion
  document.querySelectorAll(".day-header").forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains("open");
      
      // Close all days
      document.querySelectorAll(".itinerary-day").forEach(day => {
        day.classList.remove("open");
      });
      
      // Toggle current day
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });

  // 4. FAQ Accordion
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains("open");
      
      // Close all FAQs
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
      });
      
      // Toggle current FAQ
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });

  // 5. Calculator controls
  const btnMinus = document.getElementById("btn-minus");
  const btnPlus = document.getElementById("btn-plus");
  const displayPax = document.getElementById("calc-travelers-count");
  
  if (btnMinus && btnPlus && displayPax) {
    btnMinus.addEventListener("click", () => {
      if (paxCount > 1) {
        paxCount--;
        displayPax.innerText = paxCount;
        updatePrices();
      }
    });
    
    btnPlus.addEventListener("click", () => {
      if (paxCount < 30) {
        paxCount++;
        displayPax.innerText = paxCount;
        updatePrices();
      }
    });
  }

  // 6. Hotel tier selectors
  const optAlejandria = document.getElementById("opt-alejandria");
  const optEutopiq = document.getElementById("opt-eutopiq");

  if (optAlejandria && optEutopiq) {
    optAlejandria.addEventListener("click", () => {
      selectedHotel = "alejandria";
      optAlejandria.classList.add("active");
      optEutopiq.classList.remove("active");
      updatePrices();
    });

    optEutopiq.addEventListener("click", () => {
      selectedHotel = "eutopiq";
      optEutopiq.classList.add("active");
      optAlejandria.classList.remove("active");
      updatePrices();
    });
  }

  // 7. Whatsapp Reservation CTA Link
  const btnCalcBook = document.getElementById("calc-book-btn");
  if (btnCalcBook) {
    btnCalcBook.addEventListener("click", () => {
      const pricing = window.tourData.pricing;
      let discountPercent = paxCount >= pricing.group_discount.min_pax ? pricing.group_discount.discount_percent : 0;
      let basePrice = pricing.base_prices[selectedHotel] || 400;

      const isRange = Array.isArray(basePrice);
      let finalPricePerPerson, totalReservationPrice;

      if (isRange) {
        const finalMin = Math.round(basePrice[0] * (1 - discountPercent / 100));
        const finalMax = Math.round(basePrice[1] * (1 - discountPercent / 100));
        finalPricePerPerson = [finalMin, finalMax];
        totalReservationPrice = [finalMin * paxCount, finalMax * paxCount];
      } else {
        finalPricePerPerson = Math.round(basePrice * (1 - discountPercent / 100));
        totalReservationPrice = finalPricePerPerson * paxCount;
      }

      const hotelName = selectedHotel === "alejandria" ? (translations[currentLang]["calc-title-alejandria"] || "Opción Estándar") : (translations[currentLang]["calc-title-eutopiq"] || "Opción Premium");

      const formatSingleVal = (val) => {
        if (pricing.currency === "USD") {
          return "$" + val.toLocaleString("en-US") + " USD";
        } else {
          return "$" + val.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " COP";
        }
      };

      const formatCurrency = (val) => {
        if (Array.isArray(val)) {
          return `${formatSingleVal(val[0])} - ${formatSingleVal(val[1])}`;
        }
        return formatSingleVal(val);
      };

      let message = `Hola Transfers & Tours. Quiero cotizar el Circuito ${window.tourData.landing_name} para ${paxCount} personas. `;
      message += `Hotel preferido: ${hotelName}. `;
      message += `Costo total estimado: ${formatCurrency(totalReservationPrice)}.`;

      // Trigger Google Ads conversion tracking event
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
        });
      }

      // Trigger Meta Pixel Contact event
      if (typeof fbq === 'function') {
        fbq('track', 'Contact');
      }

      const whatsappUrl = `https://wa.me/573146644303?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // 8. Lead Capture Form Submission (Supabase + WhatsApp Redirect)
  if (window.tourData && window.tourData.supabase) {
    const SUPABASE_CONFIG = {
      url: window.tourData.supabase.url, 
      anonKey: window.tourData.supabase.anonKey,
      functionName: window.tourData.supabase.functionName, 
    };

    const heroForm = document.getElementById("hero-lead-form");
    if (heroForm) {
      heroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const eventId = generateEventId();
        const submitBtn = document.getElementById("hero-submit-button");
        if (submitBtn) submitBtn.disabled = true;

        const nameVal = document.getElementById("hero-name").value;
        const emailVal = document.getElementById("hero-email").value;
        const phoneVal = document.getElementById("hero-phone").value;
        const dateVal = document.getElementById("hero-date").value;

        const hotelName = selectedHotel === "alejandria" ? (translations[currentLang]["calc-title-alejandria"] || "Opción Estándar") : (translations[currentLang]["calc-title-eutopiq"] || "Opción Premium");
        const pricing = window.tourData.pricing;
        let discountPercent = paxCount >= pricing.group_discount.min_pax ? pricing.group_discount.discount_percent : 0;
        let basePrice = pricing.base_prices[selectedHotel] || 400;

        const isRange = Array.isArray(basePrice);
        let finalPricePerPerson, totalReservationPrice;

        if (isRange) {
          const finalMin = Math.round(basePrice[0] * (1 - discountPercent / 100));
          const finalMax = Math.round(basePrice[1] * (1 - discountPercent / 100));
          finalPricePerPerson = [finalMin, finalMax];
          totalReservationPrice = [finalMin * paxCount, finalMax * paxCount];
        } else {
          finalPricePerPerson = Math.round(basePrice * (1 - discountPercent / 100));
          totalReservationPrice = finalPricePerPerson * paxCount;
        }

        const formatSingleVal = (val) => {
          if (pricing.currency === "USD") {
            return "$" + val.toLocaleString("en-US") + " USD";
          } else {
            return "$" + val.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " COP";
          }
        };

        const formatCurrency = (val) => {
          if (Array.isArray(val)) {
            return `${formatSingleVal(val[0])} - ${formatSingleVal(val[1])}`;
          }
          return formatSingleVal(val);
        };

        const payload = {
          landing_name: window.tourData.landing_name,
          destination: window.tourData.destination,
          source: "Landing B2C",
          full_name: nameVal,
          email: emailVal,
          phone: phoneVal,
          travel_date: dateVal,
          tickets: paxCount,
          estimated_price: isRange ? finalPricePerPerson[0] * paxCount : finalPricePerPerson * paxCount, 
          special_requests: `Hotel: ${hotelName}. Formulario de Conversión Hero. Rango: ${formatCurrency(totalReservationPrice)}`,
          message: `Solicitud de reserva de circuito ${window.tourData.landing_name}. Hotel: ${hotelName}. Fecha llegada: ${dateVal}. Rango: ${formatCurrency(totalReservationPrice)}`,
          status: "Nuevo Lead",
          meta_event_id: eventId,
          event_source_url: window.location.href
        };

        try {
          const endpoint = `${SUPABASE_CONFIG.url}/functions/v1/${SUPABASE_CONFIG.functionName}`;
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify(payload)
          });

          // Show success toast notification
          const toast = document.getElementById("success-toast");
          if (toast) {
            toast.classList.add("active");
            setTimeout(() => {
              toast.classList.remove("active");
              // Trigger Google Ads conversion tracking event
              if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                  'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
                });
              }

              // Trigger Meta Pixel Lead event with deduplication ID
              if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                  content_name: window.tourData.landing_name,
                  value: isRange ? finalPricePerPerson[0] * paxCount : finalPricePerPerson * paxCount,
                  currency: pricing.currency || 'COP'
                }, { eventID: eventId });
              }

              // Redirect to WhatsApp
              const msgWa = `Hola Transfers & Tours. Acabo de registrarme para el Circuito ${window.tourData.landing_name}. Mi nombre es ${nameVal}. Hotel preferido: ${hotelName}.`;
              window.location.href = `https://wa.me/573146644303?text=${encodeURIComponent(msgWa)}`;
            }, 3000);
          }

          heroForm.reset();
        } catch (err) {
          console.error("Error al enviar lead a Supabase:", err);
          // Trigger Google Ads conversion tracking event
          if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
              'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
            });
          }

          // Trigger Meta Pixel Lead event with deduplication ID (fallback)
          if (typeof fbq === 'function') {
            fbq('track', 'Lead', {
              content_name: window.tourData.landing_name,
              value: isRange ? finalPricePerPerson[0] * paxCount : finalPricePerPerson * paxCount,
              currency: pricing.currency || 'COP'
            }, { eventID: eventId });
          }

          // Fallback WhatsApp redirection on network error
          const msgWaFallback = `Hola. Me registré en la landing de ${window.tourData.landing_name} pero hubo un error. Nombre: ${nameVal}, Email: ${emailVal}, Tel: ${phoneVal}, Fecha: ${dateVal}, Hotel: ${hotelName}.`;
          window.location.href = `https://wa.me/573146644303?text=${encodeURIComponent(msgWaFallback)}`;
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }
});

// Helper to generate a unique event ID for Meta deduplication
function generateEventId() {
  return 'meta-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}
