// ==========================================================================
// TRANSLATION DICTIONARY (Bilingual Support ES/EN)
// ==========================================================================
const translations = {
  es: {
    // Header
    "nav-home": "Inicio",
    "nav-itinerary": "Itinerario",
    "nav-included": "Qué Incluye",
    "nav-calc": "Cotizar",
    "nav-faq": "Preguntas",
    "btn-quote-now": "Cotizar Ahora",
    
    // Hero
    "hero-h1": "Bogotá & Cartagena <span>5 Días Mágicos</span>",
    "hero-tagline": "El circuito ideal para el portafolio de tu agencia de viajes: 5 días combinando los Andes y el Caribe con tiquetes nacionales incluidos y tarifas netas competitivas.",
    "hero-badge-1": "Vuelos Internos Incluidos",
    "hero-badge-2": "Operador Receptivo DMC",
    "hero-badge-3": "Tarifas Netas Comisionables",
    "form-title": "Registro de Agencias & Cotización",
    "form-subtitle": "Ingresa los datos del grupo y recibe tarifas netas para tu agencia en minutos.",
    "lbl-name": "Nombre del Asesor / Agencia",
    "lbl-email": "Correo Corporativo",
    "lbl-phone": "WhatsApp / Teléfono",
    "lbl-date": "Fecha Estimada de Viaje",
    "ph-name": "Ej. Juan de Viajes ABC",
    "ph-email": "juan@agencia.com",
    "ph-phone": "Ej. +57 314 6644303",
    "btn-submit-hero": "Enviar Solicitud B2B",
    
    // Trust Badges
    "badge-1-title": "DMC Receptivo en Colombia",
    "badge-1-desc": "Operación directa propia. Tarifas netas B2B altamente competitivas y sin intermediarios.",
    "badge-2-title": "Soporte VIP para Agencias",
    "badge-2-desc": "Canal de emergencias y soporte logístico en tiempo real 24/7 para tus pasajeros.",
    "badge-3-title": "Operador 100% Certificado",
    "badge-3-desc": "Cumplimiento legal total (RNT N° 45890). Facturación y contratos B2B simplificados.",
    "badge-4-title": "Bloqueos y Cupos Hoteleros",
    "badge-4-desc": "Tarifas preferenciales negociadas en hoteles premium (El Chicó y Bocagrande) con allotments activos.",

    // Itinerary Section
    "itinerary-title": "Itinerario del Tour",
    "itinerary-subtitle": "Un viaje de 5 días diseñado para la máxima satisfacción de tus clientes.",
    "day": "Día",
    "tag-bogota": "Bogotá",
    "tag-zipaquira": "Zipaquirá",
    "tag-cartagena": "Cartagena",
    "tag-tierrabomba": "Tierra Bomba",
    "tag-historical": "Histórico",
    "tag-nature": "Naturaleza",
    "tag-beach": "Playa & Sol",
    
    // Day 1
    "d1-title": "Llegada a Bogotá & City Tour Histórico",
    "d1-desc": "Bienvenida en el Aeropuerto El Dorado y traslado privado al hotel en la zona de El Chicó. Recorrido por el centro histórico de La Candelaria, visita al Museo del Oro y ascenso en teleférico al Cerro de Monserrate.",
    "d1-highlight-1": "La Candelaria",
    "d1-highlight-2": "Monserrate",
    "d1-highlight-3": "Museo del Oro",
    
    // Day 2
    "d2-title": "Catedral de Sal de Zipaquirá",
    "d2-desc": "Desayuno en el hotel. Viaje privado hacia el norte de la sabana para visitar la Catedral de Sal de Zipaquirá, una joya arquitectónica construida a 180 metros bajo tierra. Disfruta de un almuerzo tradicional en el pueblo colonial y tarde libre en Bogotá para explorar o realizar compras.",
    "d2-highlight-1": "Catedral de Sal",
    "d2-highlight-2": "Almuerzo Típico",
    "d2-highlight-3": "Sabana de Bogotá",
    
    // Day 3
    "d3-title": "Vuelo a Cartagena & Atardecer Amurallado",
    "d3-desc": "Traslado privado al aeropuerto de Bogotá para tomar el vuelo interno hacia Cartagena de Indias. Recibimiento en Cartagena y traslado al hotel en Bocagrande. Por la tarde, caminata guiada por las murallas y las coloridas calles del Centro Histórico, finalizando con la visita al imponente Castillo de San Felipe.",
    "d3-highlight-1": "Vuelo Interno Incluido",
    "d3-highlight-2": "Castillo de San Felipe",
    "d3-highlight-3": "Ciudad Amurallada",
    
    // Day 4
    "d4-title": "Día de Sol en Fénix Beach (Isla Tierra Bomba)",
    "d4-desc": "Desayuno en el hotel. Traslado al muelle para tomar una lancha rápida hacia el exclusivo club de playa Fénix Beach en Isla Tierra Bomba. Disfruta de un día completo de descanso con tumbonas, piscina frente al mar, coctel de bienvenida y un almuerzo caribeño típico (arroz con coco, pescado frito y patacones). Retorno al final de la tarde.",
    "d4-highlight-1": "Fénix Beach Club",
    "d4-highlight-2": "Traslado en Lancha",
    "d4-highlight-3": "Almuerzo Caribeño",
    
    // Day 5
    "d5-title": "Despedida del Caribe & Retorno",
    "d5-desc": "Desayuno en el hotel. Mañana libre en Cartagena para disfrutar de la playa de Bocagrande o comprar artesanías locales en Las Bóvedas. A la hora indicada, traslado privado del hotel al Aeropuerto Internacional Rafael Núñez de Cartagena para tomar tu vuelo de retorno.",
    "d5-highlight-1": "Playa Bocagrande",
    "d5-highlight-2": "Las Bóvedas",
    "d5-highlight-3": "Traslado de Salida",

    // Inclusions
    "inc-title": "Servicios del Paquete",
    "inc-subtitle": "Especificaciones técnicas completas para tu cotizador y propuestas de venta.",
    "inc-box-included": "Servicios Incluidos",
    "inc-box-not-included": "No Incluye",
    
    "inc-1": "<strong>Tique aéreo interno:</strong> Vuelo de Bogotá a Cartagena (aerolínea nacional con equipaje).",
    "inc-2": "<strong>Hospedaje de 4 noches:</strong> 2 en Bogotá (Hotel 4★) y 2 en Cartagena (Hotel 3★/4★ en Bocagrande).",
    "inc-3": "<strong>Alimentación diaria:</strong> Desayunos buffet incluidos en los hoteles de ambas ciudades.",
    "inc-4": "<strong>Traslados privados:</strong> Transporte climatizado en vans/autos en aeropuertos y tours.",
    "inc-5": "<strong>Tours con entradas:</strong> Monserrate, Museo del Oro, Zipaquirá y Castillo de San Felipe.",
    "inc-6": "<strong>Almuerzos y experiencias:</strong> Almuerzo tradicional en Zipaquirá y pasadía de playa en Fénix Beach con almuerzo.",
    "inc-7": "<strong>Seguridad médica:</strong> Tarjeta de asistencia médica local con cobertura de accidentes.",
    
    "exc-1": "<strong>Vuelos internacionales:</strong> Tiques desde tu país de origen hacia Bogotá y de Cartagena de retorno.",
    "exc-2": "<strong>Alimentación no descrita:</strong> Cenas y almuerzos en días libres no especificados.",
    "exc-3": "<strong>Propinas e imprevistos:</strong> Gastos personales, llamadas o lavandería en hoteles.",
    "exc-4": "<strong>Servicios opcionales:</strong> Guías adicionales en idiomas diferentes a Español e Inglés.",

    // Calculator Section
    "calc-title": "Cotizador de Tarifas Netas B2B",
    "calc-subtitle": "Calcula precios netos comisionables para tu grupo. Descuentos de volumen aplicados al instante.",
    "calc-desc-h3": "Tarifario Corporativo y para Agencias",
    "calc-desc-p": "Nuestras tarifas están optimizadas para la reventa. Accede a precios netos escalonados según el tamaño del grupo de tus pasajeros, ideales para viajes de incentivos, corporativos o familiares.",
    "calc-f1": "Tarifas netas exclusivas para profesionales",
    "calc-f2": "Comisiones garantizadas y márgenes flexibles",
    "calc-f3": "Detalle de inclusiones listo para marca blanca",
    "calc-f4": "Soporte de reservas aéreas y bloqueos locales",
    "calc-step1-lbl": "1. Selecciona el Número de Viajeros",
    "calc-step2-lbl": "2. Selecciona la Categoría de Hotel",
    "calc-hotel-std": "Estándar 3★/4★",
    "calc-hotel-std-p": "Zonas seguras de Bogotá y Bocagrande",
    "calc-hotel-prem": "Premium Luxury 4★/5★",
    "calc-hotel-prem-p": "Hoteles boutique e internacionales top",
    "calc-price-lbl": "Precio Neto Estimado",
    "calc-price-desc": "Tarifa neta por persona en acomodación doble",
    "calc-btn-book": "Bloquear Grupo vía WhatsApp",
    "calc-saving": "¡Descuento neto: <span>{percent}%</span> aplicado!",
    "calc-no-saving": "Tarifa neta base (1 pasajero)",

    // Testimonials
    "test-title": "Opiniones de Agencias y Viajeros",
    "test-subtitle": "Lee la experiencia de quienes ya vivieron este mágico recorrido y trabajan con nosotros.",
    "test-1-text": "\"El viaje fue impecable. El contraste entre el clima fresco e histórico de Bogotá y el calor caribeño de Cartagena fue espectacular. El pasadía en Tierra Bomba superó nuestras expectativas. ¡100% recomendados!\"",
    "test-2-text": "\"Operaron nuestro grupo familiar de 8 personas de forma excelente. La calculadora nos dio el descuento exacto y los guías en Monserrate y Zipaquirá fueron supremamente profesionales. Los traslados siempre puntuales.\"",
    "test-3-text": "\"Como agencia de viajes minorista, Transfers & Tours es mi proveedor de confianza en Colombia. Sus tarifas son competitivas, el soporte técnico es real y mis pasajeros siempre regresan felices.\"",
    "test-3-author": "Mariana Gómez",
    "test-3-sub": "Agente de Viajes - México",

    // FAQs
    "faq-title": "Preguntas Frecuentes (Agencias)",
    "faq-subtitle": "Todo lo que necesitas saber como socio comercial para vender este paquete.",
    
    "faq-1-q": "¿El precio incluye el vuelo de Bogotá a Cartagena?",
    "faq-1-a": "Sí, el paquete incluye el vuelo interno completo de Bogotá a Cartagena en aerolínea regular, incluyendo un artículo de mano y maleta de cabina de hasta 10kg.",
    
    "faq-2-q": "¿Cómo gestionan las comisiones o el margen para agencias?",
    "faq-2-a": "Ofrecemos tarifas netas (donde aplicas tu propio margen sobre el precio neto de la calculadora) o tarifas comisionables (te pagamos la comisión acordada tras el cierre de la venta). El pago se puede realizar vía transferencia internacional o link seguro.",
    
    "faq-3-q": "¿Cómo funciona el pasadía en Fénix Beach?",
    "faq-3-a": "El día 4 los recogemos en el hotel y los llevamos al muelle. Un trayecto de 15 minutos en lancha los lleva a Tierra Bomba. Incluye entrada al club de playa, uso de instalaciones (tumbonas, camas de playa, piscina), un coctel de bienvenida y el tradicional almuerzo de mar.",
    
    "faq-4-q": "¿Se pueden personalizar itinerarios en marca blanca?",
    "faq-4-a": "Absolutamente. Diseñamos itinerarios a la medida y te enviamos la propuesta en PDF bajo tu propio logotipo (marca blanca) para que la presentes a tus clientes. Escríbenos por WhatsApp.",

    // Footer
    "foot-desc": "Transfers & Tours es tu operador local de confianza en Colombia. Nos especializamos en crear itinerarios inolvidables a la medida con soporte profesional e infraestructura propia.",
    "foot-links": "Enlaces Rápidos",
    "foot-contact": "Información de Contacto",
    "foot-rights": "Todos los derechos reservados. Registro Nacional de Turismo N° 45890.",
    "foot-laws": "Leyes de Turismo",
    "foot-terms": "Términos y Condiciones",
    "foot-privacy": "Privacidad",
    
    // Toast
    "toast-success-title": "¡Solicitud Recibida!",
    "toast-success-msg": "Un asesor comercial B2B se contactará con tu agencia de inmediato."
  },
  en: {
    // Header
    "nav-home": "Home",
    "nav-itinerary": "Itinerary",
    "nav-included": "What's Included",
    "nav-calc": "Get Quote",
    "nav-faq": "FAQ",
    "btn-quote-now": "Quote Now",
    
    // Hero
    "hero-h1": "Bogota & Cartagena <span>5 Magical Days</span>",
    "hero-tagline": "The perfect circuit for your travel agency's portfolio: 5 days combining the Andes and the Caribbean with domestic flights included and competitive net rates.",
    "hero-badge-1": "Domestic Flights Included",
    "hero-badge-2": "Inbound DMC Operator",
    "hero-badge-3": "Net Commissionable Rates",
    "form-title": "Agency Registration & Quote",
    "form-subtitle": "Enter the group details and receive net rates for your agency in minutes.",
    "lbl-name": "Agent / Agency Name",
    "lbl-email": "Agency Corporate Email",
    "lbl-phone": "WhatsApp / Phone",
    "lbl-date": "Estimated Travel Date",
    "ph-name": "E.g. John from ABC Travel",
    "ph-email": "john@agency.com",
    "ph-phone": "E.g. +1 234 567 890",
    "btn-submit-hero": "Submit B2B Request",
    
    // Trust Badges
    "badge-1-title": "Inbound DMC in Colombia",
    "badge-1-desc": "Direct self-operated logistics. Highly competitive B2B net rates with no middlemen.",
    "badge-2-title": "Dedicated Agency Support",
    "badge-2-desc": "24/7 real-time hotline and logistics support for your passengers.",
    "badge-3-title": "100% Certified Operator",
    "badge-3-desc": "Fully compliant (RNT No. 45890). Hassle-free B2B invoicing and contracting.",
    "badge-4-title": "Allotments & Hotel Blocks",
    "badge-4-desc": "Negotiated rates at premium hotels (El Chico & Bocagrande) with active allotments.",

    // Itinerary Section
    "itinerary-title": "Tour Itinerary",
    "itinerary-subtitle": "A seamless 5-day journey designed for your clients' maximum satisfaction.",
    "day": "Day",
    "tag-bogota": "Bogota",
    "tag-zipaquira": "Zipaquira",
    "tag-cartagena": "Cartagena",
    "tag-tierrabomba": "Tierra Bomba",
    "tag-historical": "Historical",
    "tag-nature": "Nature",
    "tag-beach": "Sun & Beach",
    
    // Day 1
    "d1-title": "Arrival in Bogota & Historical City Tour",
    "d1-desc": "Greeting at El Dorado Airport and private transfer to your hotel in the El Chico area. Tour through the historical center of La Candelaria, visit the Gold Museum, and ascend Monserrate Hill via cable car.",
    "d1-highlight-1": "La Candelaria",
    "d1-highlight-2": "Monserrate",
    "d1-highlight-3": "Gold Museum",
    
    // Day 2
    "d2-title": "Zipaquira Salt Cathedral",
    "d2-desc": "Breakfast at the hotel. Private trip north of the savannah to visit the Salt Cathedral of Zipaquira, an architectural masterpiece built 180 meters underground. Enjoy a traditional lunch in the colonial town and a free afternoon in Bogota to explore or shop.",
    "d2-highlight-1": "Salt Cathedral",
    "d2-highlight-2": "Traditional Lunch",
    "d2-highlight-3": "Bogota Savannah",
    
    // Day 3
    "d3-title": "Flight to Cartagena & Walled City Sunset",
    "d3-desc": "Private transfer to Bogota airport for your domestic flight to Cartagena de Indias. Reception in Cartagena and transfer to your hotel in Bocagrande. In the afternoon, enjoy a guided walking tour along the ramparts and colorful streets of the Walled City, ending with a visit to the imposing San Felipe Castle.",
    "d3-highlight-1": "Domestic Flight Included",
    "d3-highlight-2": "San Felipe Castle",
    "d3-highlight-3": "Walled City",
    
    // Day 4
    "d4-title": "Day in the Sun at Fenix Beach (Tierra Bomba Island)",
    "d4-desc": "Breakfast at the hotel. Transfer to the dock to board a speedboat to the exclusive Fenix Beach club on Tierra Bomba Island. Enjoy a full day of relaxation with sun loungers, beachfront pool, welcome cocktail, and a traditional Caribbean lunch (coconut rice, fried fish, and plantains). Return in the late afternoon.",
    "d4-highlight-1": "Fenix Beach Club",
    "d4-highlight-2": "Speedboat Transfer",
    "d4-highlight-3": "Caribbean Lunch",
    
    // Day 5
    "d5-title": "Farewell to the Caribbean & Departure",
    "d5-desc": "Breakfast at the hotel. Free morning in Cartagena to enjoy Bocagrande beach or shop for local crafts at Las Bovedas. At the scheduled time, private transfer from the hotel to Cartagena's Rafael Nuñez International Airport for your departure flight.",
    "d5-highlight-1": "Bocagrande Beach",
    "d5-highlight-2": "Las Bovedas",
    "d5-highlight-3": "Departure Transfer",

    // Inclusions
    "inc-title": "Package Services",
    "inc-subtitle": "Complete technical specifications for your quotes and sales proposals.",
    "inc-box-included": "Included Services",
    "inc-box-not-included": "Not Included",
    
    "inc-1": "<strong>Domestic flight ticket:</strong> Bogota to Cartagena flight (national airline with baggage).",
    "inc-2": "<strong>4-night accommodation:</strong> 2 in Bogota (4★ Hotel) and 2 in Cartagena (3★/4★ Hotel in Bocagrande).",
    "inc-3": "<strong>Daily meals:</strong> Buffet breakfasts included at hotels in both cities.",
    "inc-4": "<strong>Private transfers:</strong> Air-conditioned vehicles for airports and tours.",
    "inc-5": "<strong>Tours with entries:</strong> Monserrate, Gold Museum, Zipaquira, and San Felipe Castle.",
    "inc-6": "<strong>Meals and experiences:</strong> Traditional lunch in Zipaquira and full day beach pass at Fenix Beach with lunch.",
    "inc-7": "<strong>Medical safety:</strong> Local medical assistance card covering accidents.",
    
    "exc-1": "<strong>International flights:</strong> Tickets from your home country to Bogota and returning from Cartagena.",
    "exc-2": "<strong>Unspecified meals:</strong> Dinners and lunches on free days not specified.",
    "exc-3": "<strong>Tips and incidentals:</strong> Personal expenses, calls, or laundry at hotels.",
    "exc-4": "<strong>Optional services:</strong> Additional tour guides in languages other than Spanish and English.",

    // Calculator Section
    "calc-title": "B2B Net Rate Calculator",
    "calc-subtitle": "Calculate commissionable net rates for your group with instant volume discounts.",
    "calc-desc-h3": "Corporate & Agency Tariffs",
    "calc-desc-p": "Our rates are optimized for resale. Access tiered net prices based on the passenger group size, ideal for incentive, corporate, or leisure family groups.",
    "calc-f1": "Exclusive net rates for travel professionals",
    "calc-f2": "Guaranteed commissions and flexible markups",
    "calc-f3": "Inclusions list ready for white-label branding",
    "calc-f4": "Air booking support and local block management",
    "calc-step1-lbl": "1. Select Number of Travelers",
    "calc-step2-lbl": "2. Select Hotel Category",
    "calc-hotel-std": "Standard 3★/4★",
    "calc-hotel-std-p": "Safe zones in Bogota and Bocagrande",
    "calc-hotel-prem": "Premium Luxury 4★/5★",
    "calc-hotel-prem-p": "Boutique hotels & top international chains",
    "calc-price-lbl": "Estimated Net Price",
    "calc-price-desc": "Net rate per person in double occupancy",
    "calc-btn-book": "Hold Group via WhatsApp",
    "calc-saving": "Net discount: <span>{percent}%</span> applied!",
    "calc-no-saving": "Base net rate (1 passenger)",

    // Testimonials
    "test-title": "Agency & Traveler Reviews",
    "test-subtitle": "Read the experiences of those who have already lived this magical journey and work with us.",
    "test-1-text": "\"The trip was flawless. The contrast between Bogota's cool, historic climate and Cartagena's Caribbean heat was spectacular. The day trip to Tierra Bomba exceeded our expectations. 100% recommended!\"",
    "test-2-text": "\"They handled our family group of 8 people excellently. The calculator gave us the exact discount and the guides in Monserrate and Zipaquira were extremely professional. Transfers were always punctual.\"",
    "test-3-text": "\"As a retail travel agency, Transfers & Tours is my trusted supplier in Colombia. Their rates are competitive, their technical support is real, and my passengers always return happy.\"",
    "test-3-author": "Mariana Gomez",
    "test-3-sub": "Travel Agent - Mexico",

    // FAQs
    "faq-title": "Frequently Asked Questions (Agencies)",
    "faq-subtitle": "Everything you need to know as a business partner to sell this package.",
    
    "faq-1-q": "Does the price include the flight from Bogota to Cartagena?",
    "faq-1-a": "Yes, the package includes the full domestic flight from Bogota to Cartagena on a scheduled airline, including a personal item and carry-on luggage up to 10kg.",
    
    "faq-2-q": "How do you handle commissions or markups for agencies?",
    "faq-2-a": "We offer net rates (you apply your own markup on the net price of the calculator) or commissionable rates (we pay the agreed commission after booking confirmation). Payments can be made via international wire or secure link.",
    
    "faq-3-q": "How does the day pass at Fenix Beach work?",
    "faq-3-a": "On day 4 we pick you up at the hotel and take you to the dock. A 15-minute speedboat ride takes you to Tierra Bomba. It includes beach club entry, use of facilities (loungers, daybeds, pool), a welcome cocktail, and a traditional seafood lunch.",
    
    "faq-4-q": "Can we customize white-label itineraries?",
    "faq-4-a": "Absolutely. We customize itineraries and send the proposal as a white-label PDF with your own logo to present to your clients. Message us via WhatsApp.",

    // Footer
    "foot-desc": "Transfers & Tours is your trusted local operator in Colombia. We specialize in creating unforgettable custom itineraries with professional support and our own infrastructure.",
    "foot-links": "Quick Links",
    "foot-contact": "Contact Information",
    "foot-rights": "All rights reserved. National Tourism Registry No. 45890.",
    "foot-laws": "Tourism Laws",
    "foot-terms": "Terms & Conditions",
    "foot-privacy": "Privacy Policy",
    
    "toast-success-title": "Request Received!",
    "toast-success-msg": "A B2B sales advisor will contact your agency immediately."
  }
};

let currentLang = 'es';

// ==========================================================================
// DOM CONTENT LOADED INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize elements
  initLanguageSwitcher();
  initItineraryAccordion();
  initFaqAccordion();
  initPriceCalculator();
  initFormSubmissions();
  
  // Update translation values for default language
  updateDOMTranslations(currentLang);
});

// ==========================================================================
// LANGUAGE SWITCHER LOGIC
// ==========================================================================
function initLanguageSwitcher() {
  const esBtn = document.getElementById("lang-es");
  const enBtn = document.getElementById("lang-en");
  
  if (esBtn && enBtn) {
    esBtn.addEventListener("click", () => {
      if (currentLang !== 'es') {
        currentLang = 'es';
        esBtn.classList.add("active");
        enBtn.classList.remove("active");
        updateDOMTranslations(currentLang);
      }
    });
    
    enBtn.addEventListener("click", () => {
      if (currentLang !== 'en') {
        currentLang = 'en';
        enBtn.classList.add("active");
        esBtn.classList.remove("active");
        updateDOMTranslations(currentLang);
      }
    });
  }
}

function updateDOMTranslations(lang) {
  const translatableElements = document.querySelectorAll("[data-i18n]");
  translatableElements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      // Check if it's an input with placeholder
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.hasAttribute("placeholder")) {
          el.setAttribute("placeholder", translations[lang][key]);
        }
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Re-trigger calculator update to refresh translated label states
  updatePrice();
}

// ==========================================================================
// ACCORDION CONTROLLERS (ITINERARY & FAQS)
// ==========================================================================
function initItineraryAccordion() {
  const dayHeaders = document.querySelectorAll(".day-header");
  
  dayHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const parentDay = header.parentElement;
      const content = parentDay.querySelector(".day-content");
      const isAlreadyActive = parentDay.classList.contains("active");
      
      // Close all other days
      document.querySelectorAll(".itinerary-day").forEach(day => {
        day.classList.remove("active");
        day.querySelector(".day-content").style.maxHeight = null;
      });
      
      // Toggle current day
      if (!isAlreadyActive) {
        parentDay.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Open first day by default
  const firstDay = document.querySelector(".itinerary-day");
  if (firstDay) {
    firstDay.classList.add("active");
    const firstContent = firstDay.querySelector(".day-content");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  }
}

function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const parentFaq = question.parentElement;
      const answer = parentFaq.querySelector(".faq-answer");
      const isAlreadyActive = parentFaq.classList.contains("active");
      
      // Close all other FAQs
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".faq-answer").style.maxHeight = null;
      });
      
      // Toggle current FAQ
      if (!isAlreadyActive) {
        parentFaq.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ==========================================================================
// PRICE CALCULATOR LOGIC
// ==========================================================================
let travelersCount = 2;
let selectedHotelTier = 'standard'; // 'standard' or 'premium'

function initPriceCalculator() {
  const decBtn = document.getElementById("calc-dec");
  const incBtn = document.getElementById("calc-inc");
  const stdOpt = document.getElementById("opt-std");
  const premOpt = document.getElementById("opt-prem");
  
  if (decBtn && incBtn) {
    decBtn.addEventListener("click", () => {
      if (travelersCount > 1) {
        travelersCount--;
        document.getElementById("calc-qty-val").innerText = travelersCount;
        updatePrice();
      }
    });
    
    incBtn.addEventListener("click", () => {
      if (travelersCount < 20) {
        travelersCount++;
        document.getElementById("calc-qty-val").innerText = travelersCount;
        updatePrice();
      }
    });
  }

  if (stdOpt && premOpt) {
    stdOpt.addEventListener("click", () => {
      selectedHotelTier = 'standard';
      stdOpt.classList.add("active");
      premOpt.classList.remove("active");
      updatePrice();
    });
    
    premOpt.addEventListener("click", () => {
      selectedHotelTier = 'premium';
      premOpt.classList.add("active");
      stdOpt.classList.remove("active");
      updatePrice();
    });
  }
}

function updatePrice() {
  // Pricing configuration
  const basePriceStd = 549; // Standard hotel package price
  const basePricePrem = 699; // Premium hotel package price
  
  let basePrice = selectedHotelTier === 'premium' ? basePricePrem : basePriceStd;
  let discountPercent = 0;
  
  // Calculate progressive group discounts
  if (travelersCount === 2) {
    discountPercent = 5; // 5% off
  } else if (travelersCount >= 3 && travelersCount <= 5) {
    discountPercent = 8; // 8% off
  } else if (travelersCount >= 6 && travelersCount <= 9) {
    discountPercent = 12; // 12% off
  } else if (travelersCount >= 10) {
    discountPercent = 15; // 15% off (Group base rate)
  }
  
  const finalPricePerPerson = Math.round(basePrice * (1 - (discountPercent / 100)));
  const finalTotalPrice = finalPricePerPerson * travelersCount;
  
  // Update Price values in DOM
  const valEl = document.getElementById("price-value");
  if (valEl) {
    valEl.innerText = `$${finalPricePerPerson} USD`;
  }
  
  // Update Saving Alert badge
  const savingEl = document.getElementById("calc-saving-info");
  if (savingEl) {
    if (discountPercent > 0) {
      let savingTxt = translations[currentLang]["calc-saving"];
      savingTxt = savingTxt.replace("{percent}", discountPercent);
      savingEl.innerHTML = savingTxt;
      savingEl.style.display = "block";
    } else {
      savingEl.innerHTML = translations[currentLang]["calc-no-saving"];
      savingEl.style.display = "block";
    }
  }
}

// ==========================================================================
// SUPABASE INTEGRATION CONFIGURATION
// ==========================================================================
const SUPABASE_CONFIG = {
  url: "https://cwnghbusxhjdrqtaoxal.supabase.co", // Tu endpoint de Supabase
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bmdoYnVzeGhqZHJxdGFveGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDE0MzQsImV4cCI6MjA5NTcxNzQzNH0.L4sxIBAzLHNR4y-JsCEy5zHFcf0SHDtf12q1xwneFVE", // Tu clave pública anon
  useEdgeFunction: true, // true para enviar a una Edge Function (que conecte a Kommo), false para guardar en tabla
  functionName: "create-lead", // Nombre de la Edge Function en Supabase
  tableName: "landing_leads"
};

async function sendLeadToSupabase(leadData) {
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.log("Supabase no configurado en 'app.js'. Omitiendo registro automático.");
    return;
  }
  
  try {
    let url = "";
    let headers = {
      "apikey": SUPABASE_CONFIG.anonKey,
      "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
      "Content-Type": "application/json"
    };
    let body = {};

    if (SUPABASE_CONFIG.useEdgeFunction) {
      // Envía los datos directamente a tu Supabase Edge Function (método recomendado para Kommo)
      url = `${SUPABASE_CONFIG.url}/functions/v1/${SUPABASE_CONFIG.functionName}`;
      body = JSON.stringify(leadData);
    } else {
      // Guarda directamente en una tabla (puedes activar un Trigger en Base de Datos)
      url = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`;
      body = JSON.stringify(leadData);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    console.log("Lead registrado exitosamente en Supabase.");
  } catch (error) {
    console.error("Error al registrar lead en Supabase:", error);
  }
}

// ==========================================================================
// FORM SUBMISSION & WHATSAPP INTEGRATION (CRO Focus)
// ==========================================================================
function initFormSubmissions() {
  const heroForm = document.getElementById("hero-lead-form");
  const calcBookBtn = document.getElementById("calc-book-btn");
  
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const eventId = generateEventId();
      const name = document.getElementById("hero-name").value;
      const email = document.getElementById("hero-email").value;
      const phone = document.getElementById("hero-phone").value;
      const date = document.getElementById("hero-date").value;
      
      // Registrar el lead en Supabase/Kommo en segundo plano
      const leadData = {
        landing_name: "Tour Bogotá y Cartagena 5 Días",
        destination: "Cartagena",
        source: "formulario_hero",
        full_name: name,
        email: email,
        phone: phone,
        tickets: parseInt(travelersCount) || 1,
        hotel_preference: selectedHotelTier,
        travel_date: date,
        special_requests: `Fecha estimada de viaje: ${date}`,
        message: `Contacto registrado desde el formulario principal para fecha ${date}.`,
        status: "new",
        meta_event_id: eventId,
        event_source_url: window.location.href
      };
      sendLeadToSupabase(leadData);

      // Mostrar Toast de Éxito
      showToast();

      // Trigger Google Ads conversion tracking event
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
        });
      }
      // Trigger Meta Pixel Lead event
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: "Tour Bogotá y Cartagena 5 Días",
          value: selectedHotelTier === 'premium' ? 699 : 549,
          currency: 'USD'
        }, { eventID: eventId });
      }
      
      // Crear mensaje para WhatsApp
      const whatsappText = `Hola Transfers & Tours. Quiero cotizar el Tour Bogotá-Cartagena 5 Días.\n\n*Datos de Solicitud:*\n- *Nombre:* ${name}\n- *Email:* ${email}\n- *WhatsApp:* ${phone}\n- *Fecha Estimada:* ${date}`;
      const encodedMsg = encodeURIComponent(whatsappText);
      
      // Redirigir tras retraso
      setTimeout(() => {
        window.open(`https://wa.me/573146644303?text=${encodedMsg}`, '_blank');
      }, 1500);
      
      heroForm.reset();
    });
  }

  if (calcBookBtn) {
    calcBookBtn.addEventListener("click", () => {
      const eventId = generateEventId();
      const hotelText = selectedHotelTier === 'premium' ? 'Premium Luxury 4*/5*' : 'Estándar 3*/4*';
      const basePrice = selectedHotelTier === 'premium' ? 699 : 549;
      let discountPercent = 0;
      if (travelersCount === 2) discountPercent = 5;
      else if (travelersCount >= 3 && travelersCount <= 5) discountPercent = 8;
      else if (travelersCount >= 6 && travelersCount <= 9) discountPercent = 12;
      else if (travelersCount >= 10) discountPercent = 15;
      
      const finalPrice = Math.round(basePrice * (1 - (discountPercent / 100)));
      const totalPrice = finalPrice * travelersCount;

      // Registrar la cotización de la calculadora
      const leadData = {
        landing_name: "Tour Bogotá y Cartagena 5 Días",
        destination: "Cartagena",
        source: "calculadora_precio",
        full_name: "Cliente Calculadora B2B",
        email: "",
        phone: "",
        tickets: parseInt(travelersCount) || 1,
        hotel_preference: selectedHotelTier,
        estimated_price: totalPrice,
        special_requests: `Cotización realizada: Total $${totalPrice} USD ($${finalPrice} USD por persona).`,
        message: `Cotización de la calculadora: ${travelersCount} personas, hotel ${selectedHotelTier === 'premium' ? 'Premium' : 'Estándar'}.`,
        status: "new",
        meta_event_id: eventId,
        event_source_url: window.location.href
      };
      sendLeadToSupabase(leadData);
      
      const whatsappText = `Hola Transfers & Tours. Me interesa reservar el Tour Bogotá-Cartagena de 5 Días.\n\n*Mi Cotización en la Web:*\n- *Viajeros:* ${travelersCount} personas\n- *Hotel:* Categoría ${hotelText}\n- *Precio por Persona:* $${finalPrice} USD\n- *Precio Total:* $${totalPrice} USD\n\nPor favor, confírmenme disponibilidad.`;
      const encodedMsg = encodeURIComponent(whatsappText);
      
      showToast();

      // Trigger Google Ads conversion tracking event
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
        });
      }
      // Trigger Meta Pixel Contact and Lead events
      if (typeof fbq === 'function') {
        fbq('track', 'Contact');
        fbq('track', 'Lead', {
          content_name: "Tour Bogotá y Cartagena 5 Días",
          value: totalPrice,
          currency: 'USD'
        }, { eventID: eventId });
      }
      
      setTimeout(() => {
        window.open(`https://wa.me/573146644303?text=${encodedMsg}`, '_blank');
      }, 1500);
    });
  }
}

function showToast() {
  const toast = document.getElementById("success-toast");
  if (toast) {
    // Dynamically localize toast message
    const titleEl = toast.querySelector(".toast-msg h4");
    const descEl = toast.querySelector(".toast-msg p");
    if (titleEl && descEl) {
      titleEl.innerText = translations[currentLang]["toast-success-title"];
      descEl.innerText = translations[currentLang]["toast-success-msg"];
    }
    
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
}

// Helper to generate a unique event ID for Meta deduplication
function generateEventId() {
  return 'meta-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}
