/* ==========================================================================
   APP.JS - LÓGICA MULTILINGÜE Y COTIZADOR DINÁMICO
   ========================================================================== */

// Configuración Supabase Edge Function
const SUPABASE_CONFIG = {
  url: "https://cwnghbusxhjdrqtaoxal.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1...xwneFVE",
  useEdgeFunction: true, 
  functionName: "create-lead", 
  tableName: "landing_leads"
};

// Diccionarios Multilingües
const translations = {
  es: {
    // Header & CTA
    "btn-quote-header": "Reservar Viaje",
    "calc-info-desc": "Las tarifas publicadas son en base regular B2C. A partir de <strong>5 personas</strong> se aplica un <strong>5% de descuento</strong> automático.",
    "tag-pickup": "Bogotá",
    "tag-hotel": "Alojamiento",
    "tag-lunch": "Almuerzo",
    "tag-tickets": "Entradas",
    "tag-flight": "Vuelo Interno",
    "tag-drink": "Degustación",
    "tag-guide": "Guía Local",
    "tag-buffet": "Almuerzo Buffet",
    "tag-yacht": "Yate Majestic",
    "tag-history": "Histórico",
    "tag-cocktail": "Cóctel Incluido",
    "tag-airport": "Aeropuerto",
    "tag-thanks": "Fin del Viaje",
    "hero-pretitle": "Circuito Regular de 10 Días",
    "hero-title": "Sabores, Ritmos y <span>Paisajes de Colombia</span>",
    "hero-desc": "Descubre la magia de <strong>Bogotá, Medellín y Cartagena</strong> en una ruta perfecta que integra pasajes aéreos internos, hoteles de categoría 4 estrellas, pasadía en club de playa y excursiones icónicas con soporte logístico bilingüe.",
    
    // Badges Hero
    "badge-1": "Vuelos Internos Incluidos",
    "badge-2": "Hoteles 4★ con Desayuno",
    "badge-3": "Pasadía en Playa Premium",
    "badge-4": "Seguro Médico Integral",
    
    // Formulario
    "form-title": "Asegura tu Cupo",
    "form-subtitle": "Completa tus datos para recibir asesoría inmediata",
    "lbl-name": "Nombre Completo",
    "ph-name": "Ej. Ana Gómez",
    "lbl-email": "Correo Electrónico",
    "ph-email": "ana@correo.com",
    "lbl-phone": "WhatsApp / Teléfono",
    "ph-phone": "Ej. +57 300 123 4567",
    "lbl-date": "Fecha del Viaje",
    "btn-submit-hero": "Reservar Cupos Ahora",
    "cancellation-policy": "Cancelación gratuita hasta 3 días antes",
    
    // Trust Bar
    "trust-1-title": "Operador Local Directo",
    "trust-1-desc": "Logística y coordinadores propios en cada ciudad receptiva de Colombia.",
    "trust-2-title": "RNT N° 44180 Activo",
    "trust-2-desc": "Garantía total de cumplimiento legal bajo las normas del Ministerio de Comercio.",
    "trust-3-title": "Soporte 24/7 Bilingüe",
    "trust-3-desc": "Línea de asistencia telefónica exclusiva para emergencias durante el circuito.",
    "trust-4-title": "Hoteles Seleccionados 4★",
    "trust-4-desc": "Alojamientos de primera categoría con desayuno incluido y excelente ubicación.",
    
    // Intro SEO
    "seo-title": "Un Circuito Único Diseñado para el Viajero Exigente",
    
    // Itinerary Section
    "itinerary-title": "Itinerario del Tour",
    "itinerary-subtitle": "Un viaje de 10 días diseñado para la máxima comodidad y disfrute.",
    "day": "Día",
    
    // Days
    "d1-title": "Llegada a Bogotá y Traslado al Hotel",
    "d1-desc": "Bogotá es la extensa capital en altura de Colombia. Con nuestro vehículo privado te recogemos en el Aeropuerto El Dorado de forma inmediata y eficaz, y te llevamos directamente al Hotel SHG Bogotá 100 en el exclusivo sector del Chicó.",
    "d1-highlight-1": "Traslado Privado",
    "d1-highlight-2": "Sector El Chicó",
    "d1-highlight-3": "Asistencia en Destino",
    
    "d2-title": "City Tour en Bogotá: Monserrate y Centro Histórico",
    "d2-desc": "Te recogemos a las 8:00 AM en el hotel. Subiremos en teleférico al Cerro de Monserrate a 3100 m.s.n.m para admirar la panorámica de Bogotá. Continuaremos con un recorrido a pie por La Candelaria, visitando la Plaza de Bolívar, el Museo Botero y el Museo del Oro. Incluye almuerzo típico y botella de agua.",
    "d2-highlight-1": "Monserrate",
    "d2-highlight-2": "La Candelaria",
    "d2-highlight-3": "Museo del Oro",
    
    "d3-title": "Catedral de Sal de Zipaquirá",
    "d3-desc": "Viajamos a Zipaquirá, a 50 km de Bogotá. Visitaremos la Catedral de Sal, primera maravilla de Colombia, construida en una mina de sal activa a 180 metros bajo tierra. Disfrutaremos del recorrido con audio guía en tu idioma, y luego degustaremos un almuerzo tradicional de la sabana.",
    "d3-highlight-1": "Primera Maravilla",
    "d3-highlight-2": "Audio Guía Incluida",
    "d3-highlight-3": "180m Bajo Tierra",
    
    "d4-title": "Vuelo Interno a Medellín",
    "d4-desc": "Traslado privado al aeropuerto de Bogotá y vuelo doméstico incluido hacia Medellín, la ciudad de la eterna primavera. A tu llegada, te recogemos en transporte privado para llevarte al Tequendama Hotel Medellín en el sector de El Poblado o Laureles.",
    "d4-highlight-1": "Vuelo Incluido",
    "d4-highlight-2": "Traslados Privados",
    "d4-highlight-3": "Hotel 4★ Medellín",
    
    "d5-title": "Graffitour Comuna 13 en Medellín",
    "d5-desc": "Sumérgete en la cultura de transformación social de la Comuna 13. Tomaremos el metrocable para apreciar las vistas del valle y recorreremos las icónicas escaleras eléctricas al aire libre. Disfrutaremos del arte callejero y grafitis con guías locales, e incluye una cerveza artesanal o crema de mango de cortesía.",
    "d5-highlight-1": "Graffitour",
    "d5-highlight-2": "Metrocable",
    "d5-highlight-3": "Escaleras Eléctricas",
    
    "d6-title": "Pasadía a Guatapé y Piedra del Peñol",
    "d6-desc": "Te recogemos a las 7:00 AM. Visitaremos el hermoso y colorido pueblo de Guatapé, famoso por sus zócalos artísticos. Navegaremos por el embalse a bordo del yate Majestic y contemplaremos la imponente Piedra del Peñol. Incluye almuerzo buffet completo (la subida a la piedra es opcional por $8 USD).",
    "d6-highlight-1": "Guatapé Colorido",
    "d6-highlight-2": "Navegación en Yate",
    "d6-highlight-3": "Piedra del Peñol",
    
    "d7-title": "Vuelo Interno a Cartagena",
    "d7-desc": "Traslado privado al aeropuerto de Medellín para tomar tu vuelo directo incluido hacia la mágica e histórica Cartagena. Llegada, recogida privada en vehículo climatizado y traslado al Holiday Inn Express Cartagena en el sector turístico de Bocagrande.",
    "d7-highlight-1": "Vuelo Interno",
    "d7-highlight-2": "Bocagrande",
    "d7-highlight-3": "Caribe Colombiano",
    
    "d8-title": "City Tour en Cartagena de Indias",
    "d8-desc": "Haremos un completo recorrido guiado (a las 9 AM o 2 PM) por los barrios modernos, la bahía y el Castillo de San Felipe de Barajas (patrimonio histórico colonial). Continuaremos a pie por la Ciudad Amurallada e incluye una parada fotográfica en las Letras de Cartagena.",
    "d8-highlight-1": "Castillo San Felipe",
    "d8-highlight-2": "Ciudad Amurallada",
    "d8-highlight-3": "Guía Histórico",
    
    "d9-title": "Pasadía Premium en Club de Playa",
    "d9-desc": "Pasadía de descanso en la hermosa isla de Tierra Bomba, a solo 15 minutos en lancha rápida. Incluye lancha ida y vuelta, cóctel o cerveza de bienvenida, uso de instalaciones de playa y un delicioso almuerzo caribeño típico (el impuesto de muelle es de $8 USD no incluido).",
    "d9-highlight-1": "Tierra Bomba",
    "d9-highlight-2": "Lancha Rápida",
    "d9-highlight-3": "Playa Premium",
    
    "d10-title": "Traslado final al Aeropuerto",
    "d10-desc": "A la hora acordada, nuestro conductor privado te recogerá en tu hotel en Cartagena rumbo al aeropuerto para tomar tu vuelo de conexión o regreso a tu país de origen. ¡Gracias por visitarnos!",
    "d10-highlight-1": "Traslado Privado",
    "d10-highlight-2": "Puntualidad Garantizada",
    "d10-highlight-3": "Despedida",
    
    // Inclusions & Exclusions
    "inc-title": "Detalles de Cobertura",
    "inc-subtitle": "Todo lo que necesitas saber de forma transparente antes de tu viaje.",
    "inc-box-included": "Servicios Incluidos",
    "inc-box-not-included": "No Incluido",
    "inc-1": "<strong>Tiquetes aéreos internos:</strong> Vuelos de Bogotá a Medellín y Medellín a Cartagena con aerolíneas de confianza.",
    "inc-2": "<strong>Alojamiento de 4 estrellas:</strong> 9 noches en hoteles ubicados en sectores seguros (Chicó, Poblado/Laureles y Bocagrande).",
    "inc-3": "<strong>Traslados terrestres:</strong> Vehículos privados y cómodos para traslados aeropuerto - hotel - aeropuerto.",
    "inc-4": "<strong>Entradas incluidas:</strong> Acceso a Monserrate, Museo del Oro, Museo Botero, Catedral de Sal y Castillo de San Felipe.",
    "inc-5": "<strong>Pasadías y excursiones:</strong> Navegación en yate Majestic en Guatapé y pasadía en club de playa premium.",
    "inc-6": "<strong>Alimentación especificada:</strong> Desayunos diarios y almuerzos típicos descritos en el itinerario.",
    "inc-7": "<strong>Seguro médico:</strong> Tarjeta de asistencia médica local activa durante todo el circuito.",
    
    "exc-1": "Tiquetes aéreos internacionales de llegada y salida de Colombia.",
    "exc-2": "Subida a la Piedra del Peñol en Guatapé (Costo adicional: $8 USD aprox).",
    "exc-3": "Impuesto portuario de muelle en Cartagena (Costo adicional: $8 USD aprox).",
    "exc-4": "Alimentos o bebidas no especificadas en el itinerario regular.",
    "exc-5": "Propinas voluntarias para conductores y tripulaciones de lanchas.",
    
    // Calculator
    "calc-title": "Calculadora de Tarifas",
    "calc-subtitle": "Simula el costo de tu circuito grupal y personaliza tu cotización en tiempo real.",
    "calc-config-title": "Configura tu Reserva",
    "calc-pax-lbl": "Cantidad de Viajeros",
    "calc-summary-title": "Cotización Estimada",
    "calc-package-title": "Circuito Completo 10 Días",
    "calc-price-lbl": "Precio por Persona:",
    "calc-total-lbl": "Total de la Reserva:",
    "calc-saving": "¡Descuento de Grupo Aplicado: <strong>{percent}%</strong> de ahorro!",
    "calc-no-saving": "Tarifa estándar garantizada.",
    "btn-book": "Reservar en WhatsApp",
    
    // Testimonials
    "test-title": "Experiencias de Nuestros Viajeros",
    "test-subtitle": "Opiniones verificadas de clientes que recorrieron Colombia con nosotros.",
    "test-1-text": '"Un viaje espectacular. La coordinación en Bogotá, el vuelo a Medellín y la llegada a Cartagena fueron perfectos. Los hoteles de 4 estrellas superaron nuestras expectativas. El club de playa es un paraíso absoluto."',
    "test-2-text": '"Es la mejor decisión para viajar por Colombia en familia sin preocuparse de vuelos internos ni hoteles. El soporte 24/7 respondió de inmediato cuando cambiamos la fecha de un tour. Súper recomendado."',
    
    // FAQs
    "faq-title": "Preguntas Frecuentes",
    "faq-subtitle": "Resolvemos tus dudas sobre el circuito de 10 días.",
    "fq1-q": "¿Qué equipaje está incluido en los vuelos internos?",
    "fq1-a": "Todos los vuelos internos incluidos en el paquete cubren un artículo personal (morral) y una maleta de mano en cabina de hasta 10 kg. Si requieres equipaje adicional en bodega, puedes coordinarlo con nosotros.",
    "fq2-q": "¿Cuál es la política de cancelación del circuito de 10 días?",
    "fq2-a": "Para cancelaciones con más de 3 días de antelación al inicio del viaje, no se aplica ningún cargo de penalidad. Cancelaciones entre 24 y 48 horas antes tienen un cargo del 25%, y cancelaciones dentro de las 12 horas previas aplican una penalidad del 100%.",
    "fq3-q": "¿Qué pasa si mi vuelo internacional llega tarde el primer día?",
    "fq3-a": "No te preocupes. Monitoreamos los números de vuelo en tiempo real. Nuestro conductor privado te estará esperando en la zona de salidas internacionales sin importar el retraso para llevarte seguro al hotel.",
    
    // Toasts
    "toast-success-title": "¡Solicitud Enviada!",
    "toast-success-msg": "Conectando con un asesor por WhatsApp para finalizar tu reserva.",
    "whatsapp-tooltip": "¿Preguntas? Chatea con nosotros"
  },
  en: {
    // Header & CTA
    "btn-quote-header": "Book Trip",
    "calc-info-desc": "The published rates are based on regular B2C. From <strong>5 people</strong>, an automatic <strong>5% discount</strong> is applied.",
    "tag-pickup": "Bogota",
    "tag-hotel": "Accommodation",
    "tag-lunch": "Lunch",
    "tag-tickets": "Tickets",
    "tag-flight": "Internal Flight",
    "tag-drink": "Tasting",
    "tag-guide": "Local Guide",
    "tag-buffet": "Buffet Lunch",
    "tag-yacht": "Majestic Yacht",
    "tag-history": "Historical",
    "tag-cocktail": "Cocktail Included",
    "tag-airport": "Airport",
    "tag-thanks": "End of Tour",
    "hero-pretitle": "Regular 10-Day Circuit",
    "hero-title": "Flavors, Rhythms and <span>Landscapes of Colombia</span>",
    "hero-desc": "Discover the magic of <strong>Bogota, Medellin and Cartagena</strong> on a perfect route that integrates internal air tickets, 4-star category hotels, a beach club day pass, and iconic excursions with bilingual logistics support.",
    
    // Badges Hero
    "badge-1": "Internal Flights Included",
    "badge-2": "4★ Hotels with Breakfast",
    "badge-3": "Premium Beach Day Pass",
    "badge-4": "Full Medical Insurance",
    
    // Form
    "form-title": "Secure Your Spot",
    "form-subtitle": "Fill in your details for immediate assistance",
    "lbl-name": "Full Name",
    "ph-name": "e.g. Jane Doe",
    "lbl-email": "Email Address",
    "ph-email": "jane@mail.com",
    "lbl-phone": "WhatsApp / Phone",
    "ph-phone": "e.g. +1 555 123 4567",
    "lbl-date": "Travel Date",
    "btn-submit-hero": "Reserve Spots Now",
    "cancellation-policy": "Free cancellation up to 3 days before",
    
    // Trust Bar
    "trust-1-title": "Direct Local Operator",
    "trust-1-desc": "Our own logistics and coordinators in each receptive city of Colombia.",
    "trust-2-title": "Active RNT N° 44180",
    "trust-2-desc": "Full guarantee of legal compliance under the regulations of the Ministry of Commerce.",
    "trust-3-title": "24/7 Bilingual Support",
    "trust-3-desc": "Exclusive telephone assistance line for emergencies during the tour.",
    "trust-4-title": "Selected 4★ Hotels",
    "trust-4-desc": "First-class accommodations with breakfast included and excellent location.",
    
    // Intro SEO
    "seo-title": "A Unique Circuit Designed for the Discerning Traveler",
    
    // Itinerary Section
    "itinerary-title": "Tour Itinerary",
    "itinerary-subtitle": "A 10-day trip designed for maximum comfort and enjoyment.",
    "day": "Day",
    
    // Days
    "d1-title": "Arrival in Bogota and Hotel Transfer",
    "d1-desc": "Bogota is the sprawling high-altitude capital of Colombia. With our private vehicle, we will pick you up at El Dorado Airport immediately and efficiently, taking you directly to the Hotel SHG Bogota 100 in the exclusive Chico sector.",
    "d1-highlight-1": "Private Transfer",
    "d1-highlight-2": "El Chico Sector",
    "d1-highlight-3": "In-destination Support",
    
    "d2-title": "City Tour in Bogota: Monserrate and Historic Center",
    "d2-desc": "We pick you up at 8:00 AM at the hotel. We will ride the cable car up to Monserrate Hill at 3100 m.a.s.l. to admire the panoramic views of Bogota. We will continue with a walking tour through La Candelaria, visiting Bolivar Square, the Botero Museum, and the Gold Museum. Includes traditional lunch and bottled water.",
    "d2-highlight-1": "Monserrate",
    "d2-highlight-2": "La Candelaria",
    "d2-highlight-3": "Gold Museum",
    
    "d3-title": "Zipaquira Salt Cathedral",
    "d3-desc": "We travel to Zipaquira, 50 km north of Bogota. We will visit the Salt Cathedral, declared the first wonder of Colombia, built inside an active salt mine 180 meters underground. Enjoy the tour with an audio guide in your language, followed by a traditional savanna lunch.",
    "d3-highlight-1": "First Wonder",
    "d3-highlight-2": "Audio Guide Included",
    "d3-highlight-3": "180m Underground",
    
    "d4-title": "Internal Flight to Medellin",
    "d4-desc": "Private transfer to Bogota airport and included domestic flight to Medellin, the city of eternal spring. Upon arrival, we pick you up in private transport to take you to the Tequendama Hotel Medellin in the El Poblado or Laureles sector.",
    "d4-highlight-1": "Flight Included",
    "d4-highlight-2": "Private Transfers",
    "d4-highlight-3": "4★ Hotel Medellin",
    
    "d5-title": "Graffitour Comuna 13 in Medellin",
    "d5-desc": "Immerse yourself in the social transformation culture of Comuna 13. We will take the metrocable to enjoy valley views and walk the iconic outdoor escalators. Enjoy street art and graffiti with local guides, including a complimentary craft beer or mango cream ice cream.",
    "d5-highlight-1": "Graffitour",
    "d5-highlight-2": "Cable Car",
    "d5-highlight-3": "Outdoor Escalators",
    
    "d6-title": "Day Trip to Guatape and Piedra del Peñol",
    "d6-desc": "We pick you up at 7:00 AM. We will visit the beautiful and colorful town of Guatape, famous for its artistic baseboards. We will sail the reservoir on the Majestic yacht and contemplate the imposing Piedra del Peñol. Includes complete buffet lunch (climbing the rock is optional for approx. $8 USD).",
    "d6-highlight-1": "Colorful Guatapé",
    "d6-highlight-2": "Yacht Navigation",
    "d6-highlight-3": "Piedra del Peñol",
    
    "d7-title": "Internal Flight to Cartagena",
    "d7-desc": "Private transfer to Medellin airport to board your included direct flight to magical and historic Cartagena. Arrival, private pickup in an air-conditioned vehicle, and transfer to the Holiday Inn Express Cartagena in the Bocagrande tourist district.",
    "d7-highlight-1": "Internal Flight",
    "d7-highlight-2": "Bocagrande",
    "d7-highlight-3": "Colombian Caribbean",
    
    "d8-title": "City Tour in Cartagena de Indias",
    "d8-desc": "We will do a complete guided tour (at 9 AM or 2 PM) through the modern neighborhoods, the bay, and the San Felipe de Barajas Castle (colonial historical heritage). We will continue on foot through the Walled City, including a photo stop at the iconic Cartagena Sign.",
    "d8-highlight-1": "San Felipe Castle",
    "d8-highlight-2": "Walled City",
    "d8-highlight-3": "Historical Guide",
    
    "d9-title": "Premium Day Pass at Beach Club",
    "d9-desc": "An unforgettable relaxing day on the beautiful island of Tierra Bomba, just 15 minutes away by speedboat. Includes round-trip boat transfer, a welcome cocktail or beer, use of beach facilities, and a delicious typical Caribbean lunch (port tax of $8 USD is not included).",
    "d9-highlight-1": "Tierra Bomba",
    "d9-highlight-2": "Speedboat",
    "d9-highlight-3": "Premium Beach",
    
    "d10-title": "Final Airport Transfer",
    "d10-desc": "At the coordinated time, our private driver will pick you up at your hotel in Cartagena to head to the airport for your connection or return flight. Thank you for visiting us!",
    "d10-highlight-1": "Private Transfer",
    "d10-highlight-2": "Guaranteed Punctuality",
    "d10-highlight-3": "Farewell",
    
    // Inclusions & Exclusions
    "inc-title": "Coverage Details",
    "inc-subtitle": "Everything you need to know transparently before your trip.",
    "inc-box-included": "Services Included",
    "inc-box-not-included": "Not Included",
    "inc-1": "<strong>Internal flights:</strong> Vuelos de Bogotá a Medellín y Medellín a Cartagena with trusted airlines.",
    "inc-2": "<strong>4-Star Accommodation:</strong> 9 nights in hotels located in safe areas (Chico, Poblado/Laureles, and Bocagrande).",
    "inc-3": "<strong>Ground transfers:</strong> Private, comfortable vehicles for airport - hotel - airport transfers.",
    "inc-4": "<strong>Tickets included:</strong> Entry to Monserrate, Gold Museum, Botero Museum, Salt Cathedral, and San Felipe Castle.",
    "inc-5": "<strong>Day passes & excursions:</strong> Majestic yacht navigation in Guatape and premium beach club day pass.",
    "inc-6": "<strong>Specified meals:</strong> Daily breakfast and typical lunches described in the itinerary.",
    "inc-7": "<strong>Medical Insurance:</strong> Local medical assistance card active throughout the circuit.",
    
    "exc-1": "International flights arriving to and departing from Colombia.",
    "exc-2": "Climb up the Piedra del Peñol in Guatape (Additional cost: approx. $8 USD).",
    "exc-3": "Port tax at the dock in Cartagena (Additional cost: approx. $8 USD).",
    "exc-4": "Meals or drinks not specified in the regular itinerary.",
    "exc-5": "Optional tips for drivers and boat crews.",
    
    // Calculator
    "calc-title": "Rate Calculator",
    "calc-subtitle": "Simulate the cost of your group circuit and customize your quote in real time.",
    "calc-config-title": "Configure Your Booking",
    "calc-pax-lbl": "Number of Travelers",
    "calc-summary-title": "Estimated Quote",
    "calc-package-title": "10-Day Complete Circuit",
    "calc-price-lbl": "Price per Person:",
    "calc-total-lbl": "Total Reservation:",
    "calc-saving": "Group discount applied: <strong>{percent}%</strong> savings!",
    "calc-no-saving": "Standard guaranteed rate.",
    "btn-book": "Book via WhatsApp",
    
    // Testimonials
    "test-title": "Experiences of Our Travelers",
    "test-subtitle": "Verified reviews of clients who traveled Colombia with us.",
    "test-1-text": '"A spectacular trip. Coordination in Bogota, the flight to Medellin and arrival in Cartagena were perfect. The 4-star hotels exceeded our expectations. The premium beach club is an absolute paradise."',
    "test-2-text": '"It is the best decision to travel around Colombia as a family without worrying about internal flights or hotels. The 24/7 support responded immediately when we changed a tour date. Super recommended."',
    
    // FAQs
    "faq-title": "Frequently Asked Questions",
    "faq-subtitle": "We answer your questions about the 10-day circuit.",
    "fq1-q": "What luggage is included on internal flights?",
    "fq1-a": "All internal flights included in the package cover a personal item (backpack) and a cabin carry-on bag of up to 10 kg. If you require additional checked luggage, you can coordinate it with us.",
    "fq2-q": "What is the cancellation policy for the 10-day circuit?",
    "fq2-a": "For cancellations more than 3 days prior to the start of the trip, no cancellation fee is applied. Cancellations between 24 and 48 hours prior incur a 25% fee, and cancellations within 12 hours prior incur a 100% penalty.",
    "fq3-q": "What happens if my international flight is delayed on day one?",
    "fq3-a": "Do not worry. We monitor flight numbers in real time. Our private driver will be waiting for you in the international arrivals area regardless of the delay to take you safely to the hotel.",
    
    // Toasts
    "toast-success-title": "Request Sent!",
    "toast-success-msg": "Connecting with an advisor via WhatsApp to finalize your booking.",
    "whatsapp-tooltip": "Questions? Chat with us"
  },
  pt: {
    // Header & CTA
    "btn-quote-header": "Reservar Viagem",
    "calc-info-desc": "As tarifas publicadas são baseadas em B2C regular. A partir de <strong>5 pessoas</strong>, aplica-se um <strong>desconto automático de 5%</strong>.",
    "tag-pickup": "Bogotá",
    "tag-hotel": "Alojamento",
    "tag-lunch": "Almoço",
    "tag-tickets": "Ingressos",
    "tag-flight": "Voo Interno",
    "tag-drink": "Degustação",
    "tag-guide": "Guia Local",
    "tag-buffet": "Almoço Buffet",
    "tag-yacht": "Iate Majestic",
    "tag-history": "Histórico",
    "tag-cocktail": "Coquetel Incluso",
    "tag-airport": "Aeroporto",
    "tag-thanks": "Fim da Viagem",
    "hero-pretitle": "Circuito Regular de 10 Dias",
    "hero-title": "Sabores, Ritmos e <span>Paisagens da Colômbia</span>",
    "hero-desc": "Descubra a magia de <strong>Bogotá, Medellín e Cartagena</strong> em um roteiro perfeito que integra passagens aéreas internas, hotéis de categoria 4 estrelas, day pass em clube de praia e excursões icônicas com suporte logístico bilíngue.",
    
    // Badges Hero
    "badge-1": "Voos Internos Inclusos",
    "badge-2": "Hotéis 4★ com Café da Manhã",
    "badge-3": "Day Pass em Praia Premium",
    "badge-4": "Seguro Médico Integral",
    
    // Form
    "form-title": "Garanta sua Vaga",
    "form-subtitle": "Preencha seus dados para atendimento imediato",
    "lbl-name": "Nome Completo",
    "ph-name": "Ex. Ana Gómez",
    "lbl-email": "E-mail",
    "ph-email": "ana@email.com",
    "lbl-phone": "WhatsApp / Telefone",
    "ph-phone": "Ex. +55 11 99999-9999",
    "lbl-date": "Data da Viagem",
    "btn-submit-hero": "Reservar Vagas Agora",
    "cancellation-policy": "Cancelamento gratuito até 3 dias antes",
    
    // Trust Bar
    "trust-1-title": "Operador Local Direto",
    "trust-1-desc": "Logística e coordenadores próprios em cada cidade receptiva da Colômbia.",
    "trust-2-title": "RNT N° 44180 Ativo",
    "trust-2-desc": "Garantia total de conformidade legal sob as normas do Ministério do Comércio.",
    "trust-3-title": "Suporte 24/7 Bilíngue",
    "trust-3-desc": "Linha de assistência telefônica exclusiva para emergências durante o circuito.",
    "trust-4-title": "Hotéis Selecionados 4★",
    "trust-4-desc": "Acomodações de primeira classe com café da manhã incluso e excelente localização.",
    
    // Intro SEO
    "seo-title": "Um Circuito Único Projetado para o Viajante Exigente",
    
    // Itinerary Section
    "itinerary-title": "Itinerário do Tour",
    "itinerary-subtitle": "Uma viagem de 10 dias projetada para o máximo conforto e diversão.",
    "day": "Dia",
    
    // Days
    "d1-title": "Chegada a Bogotá e Traslado ao Hotel",
    "d1-desc": "Bogotá é a extensa capital em altitude da Colômbia. Com nosso veículo privado te buscamos no Aeroporto El Dorado de forma imediata e eficaz, levando você diretamente ao Hotel SHG Bogotá 100 no exclusivo setor do Chicó.",
    "d1-highlight-1": "Traslado Privado",
    "d1-highlight-2": "Setor El Chicó",
    "d1-highlight-3": "Suporte no Destino",
    
    "d2-title": "City Tour em Bogotá: Monserrate e Centro Histórico",
    "d2-desc": "Buscamos você às 8:00 AM no hotel. Subiremos de teleférico ao Cerro de Monserrate a 3100 m.s.n.m para admirar a vista panorâmica de Bogotá. Continuaremos com uma caminhada por La Candelaria, visitando a Plaza de Bolívar, o Museu Botero e o Museu do Ouro. Inclui almoço típico e garrafa de água.",
    "d2-highlight-1": "Monserrate",
    "d2-highlight-2": "La Candelaria",
    "d2-highlight-3": "Museu do Ouro",
    
    "d3-title": "Catedral de Sal de Zipaquirá",
    "d3-desc": "Viajamos para Zipaquirá, a 50 km de Bogotá. Visitaremos a Catedral de Sal, primeira maravilha da Colômbia, construída em uma mina de sal ativa a 180 metros sob a terra. Desfrutaremos do passeio com áudio guia em seu idioma, e depois degustaremos um almoço tradicional da savana.",
    "d3-highlight-1": "Primeira Maravilha",
    "d3-highlight-2": "Áudio Guia Incluso",
    "d3-highlight-3": "180m sob a Terra",
    
    "d4-title": "Voo Interno para Medellín",
    "d4-desc": "Traslado privado ao aeroporto de Bogotá e voo doméstico incluso para Medellín, a cidade da eterna primavera. Na chegada, buscamos você em transporte privado para levá-lo ao Tequendama Hotel Medellín no setor de El Poblado ou Laureles.",
    "d4-highlight-1": "Voo Incluso",
    "d4-highlight-2": "Traslados Privados",
    "d4-highlight-3": "Hotel 4★ Medellín",
    
    "d5-title": "Graffitour Comuna 13 em Medellín",
    "d5-desc": "Mergulhe na cultura de transformação social da Comuna 13. Tomaremos o teleférico para apreciar as vistas do vale e percorreremos as icônicas escadas rolantes ao ar livre. Desfrutaremos da arte de rua e grafites com guias locais, incluindo uma cerveja artesanal ou sorvete de manga típico de cortesia.",
    "d5-highlight-1": "Graffitour",
    "d5-highlight-2": "Teleférico",
    "d5-highlight-3": "Escadas Rolantes",
    
    "d6-title": "Day Trip para Guatapé e Pedra do Peñol",
    "d6-desc": "Buscamos você às 7:00 AM. Visitaremos a bela e colorida cidade de Guatapé, famosa por seus zócalos artísticos. Navegaremos pelo embalse a bordo do iate Majestic e contemplaremos a imponente Pedra do Peñol. Inclui almoço buffet completo (a subida à pedra é opcional por $8 USD).",
    "d6-highlight-1": "Guatapé Colorida",
    "d6-highlight-2": "Passeio de Iate",
    "d6-highlight-3": "Pedra do Peñol",
    
    "d7-title": "Voo Interno para Cartagena",
    "d7-desc": "Traslado privado ao aeroporto de Medellín para pegar seu voo direto incluso para a mágica e histórica Cartagena. Chegada, recepção privada em veículo climatizado e traslado ao Holiday Inn Express Cartagena no setor turístico de Bocagrande.",
    "d7-highlight-1": "Voo Interno",
    "d7-highlight-2": "Bocagrande",
    "d7-highlight-3": "Caribe Colombiano",
    
    "d8-title": "City Tour em Cartagena das Índias",
    "d8-desc": "Faremos um passeio guiado completo (às 9h ou 14h) pelos bairros modernos, pela baía e pelo Castelo de San Felipe de Barajas (patrimônio histórico colonial). Continuaremos a pé pela Cidade Muralhada e inclui uma parada para fotos nas famosas Letras de Cartagena.",
    "d8-highlight-1": "Castelo San Felipe",
    "d8-highlight-2": "Cidade Muralhada",
    "d8-highlight-3": "Guia Histórico",
    
    "d9-title": "Day Pass Premium no Club de Praia",
    "d9-desc": "Dia de descanso inesquecível na bela ilha de Tierra Bomba, a apenas 15 minutos de lancha rápida. Inclui lancha ida e volta, coquetel ou cerveja de boas-vindas, uso das instalações de praia e um delicioso almoço caribenho típico (taxa de píer de $8 USD não inclusa).",
    "d9-highlight-1": "Tierra Bomba",
    "d9-highlight-2": "Lancha Rápida",
    "d9-highlight-3": "Praia Premium",
    
    "d10-title": "Traslado final ao Aeroporto",
    "d10-desc": "No horário combinado, nosso motorista privado buscará você no hotel em Cartagena rumo ao aeroporto para seu voo de conexão ou retorno ao seu país de origem. Obrigado por nos visitar!",
    "d10-highlight-1": "Traslado Privado",
    "d10-highlight-2": "Pontualidade Garantida",
    "d10-highlight-3": "Despedida",
    
    // Inclusions & Exclusions
    "inc-title": "Detalhes da Cobertura",
    "inc-subtitle": "Tudo o que você precisa saber de forma transparente antes de sua viagem.",
    "inc-box-included": "Serviços Inclusos",
    "inc-box-not-included": "Não Incluso",
    "inc-1": "<strong>Passagens aéreas internas:</strong> Voos de Bogotá a Medellín e Medellín a Cartagena com companhias aéreas confiáveis.",
    "inc-2": "<strong>Acomodação 4 estrelas:</strong> 9 noites em hotéis localizados em áreas seguras (Chicó, Poblado/Laureles e Bocagrande).",
    "inc-3": "<strong>Traslados terrestres:</strong> Veículos privados e confortáveis para traslados aeroporto - hotel - aeroporto.",
    "inc-4": "<strong>Ingressos inclusos:</strong> Acesso a Monserrate, Museu do Ouro, Museu Botero, Catedral de Sal e Castelo de San Felipe.",
    "inc-5": "<strong>Day pass e excursões:</strong> Navegação no iate Majestic em Guatapé e day pass em club de praia premium.",
    "inc-6": "<strong>Alimentação especificada:</strong> Cafés da manhã diários e almoços típicos descritos no itinerário.",
    "inc-7": "<strong>Seguro de viagem:</strong> Cartão de assistência médica local ativo durante todo o circuito.",
    
    "exc-1": "Passagens aéreas internacionais de chegada e saída da Colômbia.",
    "exc-2": "Subida à Pedra do Peñol em Guatapé (Custo adicional: aprox. $8 USD).",
    "exc-3": "Taxa portuária de embarque em Cartagena (Custo adicional: aprox. $8 USD).",
    "exc-4": "Alimentos ou bebidas não especificados no itinerário regular.",
    "exc-5": "Gorjetas voluntárias para motoristas e tripulações de lanchas.",
    
    // Calculator
    "calc-title": "Calculadora de Tarifas",
    "calc-subtitle": "Simule o custo do seu circuito de grupo e personalize sua cotação em tempo real.",
    "calc-config-title": "Configure sua Reserva",
    "calc-pax-lbl": "Quantidade de Viajantes",
    "calc-summary-title": "Cotação Estimada",
    "calc-package-title": "Circuito Completo 10 Dias",
    "calc-price-lbl": "Preço por Pessoa:",
    "calc-total-lbl": "Total da Reserva:",
    "calc-saving": "Desconto de grupo aplicado: <strong>{percent}%</strong> de economia!",
    "calc-no-saving": "Tarifa padrão garantizada.",
    "btn-book": "Reservar no WhatsApp",
    
    // Testimonials
    "test-title": "Experiências dos Nossos Viajantes",
    "test-subtitle": "Opiniões verificadas de clientes que viajaram pela Colômbia conosco.",
    "test-1-text": '"Uma viagem espetacular. A coordenação em Bogotá, o voo para Medellín e a chegada em Cartagena foram perfeitos. Os hotéis de 4 estrelas superaram nossas expectativas. O club de praia premium é um paraíso absoluto."',
    "test-2-text": '"É a melhor decisão para viajar pela Colômbia em família sem se preocupar com voos internos ou hotéis. O suporte 24/7 respondeu imediatamente quando alteramos a data de um passeio. Super recomendado."',
    
    // FAQs
    "faq-title": "Dúvidas Frequentes",
    "faq-subtitle": "Resolvemos suas dúvidas sobre o circuito de 10 dias.",
    "fq1-q": "Qual bagagem está incluída nos voos internos?",
    "fq1-a": "Todos os voos internos incluídos no pacote cobrem um item pessoal (mochila) e uma mala de mão na cabine de até 10 kg. Se precisar de bagagem despachada adicional, você pode coordenar conosco.",
    "fq2-q": "Qual é a política de cancelamento do circuito de 10 dias?",
    "fq2-a": "Para cancelamentos com mais de 3 dias de antecedência ao início da viagem, não se aplica nenhuma taxa de cancelamento. Cancelamentos entre 24 e 48 horas antes têm taxa de 25%, e cancelamentos nas 12 horas anteriores aplicam penalidade de 100%.",
    "fq3-q": "O que acontece se meu voo internacional atrasar no primeiro dia?",
    "fq3-a": "Não se preocupe. Monitoramos os números dos voos em tempo real. Nosso motorista privado estará esperando por você na área de desembarque internacional, independentemente do atraso, para levá-lo com segurança ao hotel.",
    
    // Toasts
    "toast-success-title": "Solicitação Enviada!",
    "toast-success-msg": "Conectando com um assessor por WhatsApp para finalizar sua reserva.",
    "whatsapp-tooltip": "Dúvidas? Fale conosco"
  },
  de: {
    // Header & CTA
    "btn-quote-header": "Reise buchen",
    "calc-info-desc": "Die veröffentlichten Tarife basieren auf regulärem B2C. Ab <strong>5 Personen</strong> wird automatisch ein <strong>Rabatt von 5%</strong> gewährt.",
    "tag-pickup": "Bogota",
    "tag-hotel": "Unterkunft",
    "tag-lunch": "Mittagessen",
    "tag-tickets": "Eintrittskarten",
    "tag-flight": "Inlandsflug",
    "tag-drink": "Verkostung",
    "tag-guide": "Lokaler Guide",
    "tag-buffet": "Mittagsbuffet",
    "tag-yacht": "Majestic Yacht",
    "tag-history": "Historisch",
    "tag-cocktail": "Cocktail inklusive",
    "tag-airport": "Flughafen",
    "tag-thanks": "Reiseende",
    "hero-pretitle": "Reguläre 10-tägige Rundreise",
    "hero-title": "Aromen, Rhythmen und <span>Landschaften Kolumbiens</span>",
    "hero-desc": "Entdecken Sie den Zauber von <strong>Bogota, Medellin und Cartagena</strong> auf einer perfekten Route, die Inlandsflüge, 4-Sterne-Hotels mit Frühstück, einen Strandclub-Tagespass und ikonische Ausflüge mit zweisprachiger Logistikunterstützung beinhaltet.",
    
    // Badges Hero
    "badge-1": "Inlandsflüge inklusive",
    "badge-2": "4★ Hotels mit Frühstück",
    "badge-3": "Premium-Strand-Tagespass",
    "badge-4": "Umfassende Krankenversicherung",
    
    // Form
    "form-title": "Sichern Sie sich Ihren Platz",
    "form-subtitle": "Geben Sie Ihre Daten für sofortige Unterstützung ein",
    "lbl-name": "Vollständiger Name",
    "ph-name": "z.B. Anna Müller",
    "lbl-email": "E-Mail-Adresse",
    "ph-email": "anna@mail.com",
    "lbl-phone": "WhatsApp / Telefon",
    "ph-phone": "z.B. +49 170 123 4567",
    "lbl-date": "Reisedatum",
    "btn-submit-hero": "Jetzt Plätze reservieren",
    "cancellation-policy": "Kostenlose Stornierung bis zu 3 Tage vorher",
    
    // Trust Bar
    "trust-1-title": "Direkter lokaler Reiseveranstalter",
    "trust-1-desc": "Eigene Logistik und Koordinatoren in jeder kolumbianischen Empfangsstadt.",
    "trust-2-title": "Aktive RNT N° 44180",
    "trust-2-desc": "Volle Garantie der Rechtskonformität nach den Vorschriften des Handelsministeriums.",
    "trust-3-title": "24/7 Zweisprachiger Support",
    "trust-3-desc": "Exklusive Telefon-Hotline für Notfälle während der Tour.",
    "trust-4-title": "Ausgewählte 4★ Hotels",
    "trust-4-desc": "Erstklassige Unterkünfte inklusive Frühstück und in hervorragender Lage.",
    
    // Intro SEO
    "seo-title": "Eine einzigartige Rundreise für anspruchsvolle Reisende",
    
    // Itinerary Section
    "itinerary-title": "Reiseroute",
    "itinerary-subtitle": "Eine 10-tägige Reise, konzipiert für maximalen Komfort und Genuss.",
    "day": "Tag",
    
    // Days
    "d1-title": "Ankunft in Bogota und Hoteltransfer",
    "d1-desc": "Bogota ist die riesige, hochgelegene Hauptstadt Kolumbiens. Mit unserem Privatfahrzeug holen wir Sie sofort und effizient vom Flughafen El Dorado ab und bringen Sie direkt zum Hotel SHG Bogota 100 im exklusiven Chico-Viertel.",
    "d1-highlight-1": "Privattransfer",
    "d1-highlight-2": "Chico-Viertel",
    "d1-highlight-3": "Betreuung vor Ort",
    
    "d2-title": "Stadtrundfahrt in Bogota: Monserrate und historisches Zentrum",
    "d2-desc": "Wir holen Sie um 8:00 Uhr am Hotel ab. Wir fahren mit der Seilbahn auf den Monserrate-Hügel auf 3100 m ü. d. M., um die Panoramaaussicht auf Bogota zu bewundern. Weiter geht es mit einem Rundgang durch La Candelaria, bei dem wir den Bolivar-Platz, das Botero-Museum und das Goldmuseum besuchen. Inklusive traditionellem Mittagessen und Wasserflasche.",
    "d2-highlight-1": "Monserrate",
    "d2-highlight-2": "La Candelaria",
    "d2-highlight-3": "Goldmuseum",
    
    "d3-title": "Salzkathedrale von Zipaquira",
    "d3-desc": "Wir reisen nach Zipaquira, 50 km nördlich von Bogota. Wir besuchen die Salzkathedrale, das erste Wunder Kolumbiens, die sich in einer aktiven Salzmine 180 Meter unter der Erde befindet. Genießen Sie die Tour mit einem Audio-Guide in Ihrer Sprache und probieren Sie anschließend ein traditionelles Mittagessen der Savanne.",
    "d3-highlight-1": "Erstes Wunder",
    "d3-highlight-2": "Audio-Guide inklusive",
    "d3-highlight-3": "180m unter der Erde",
    
    "d4-title": "Inlandsflug nach Medellin",
    "d4-desc": "Privattransfer zum Flughafen Bogota und Inlandsflug nach Medellin, der Stadt des ewigen Frühlings, inklusive. Nach der Ankunft holen wir Sie im Privatfahrzeug ab und bringen Sie zum Tequendama Hotel Medellin im Viertel El Poblado oder Laureles.",
    "d4-highlight-1": "Flug inklusive",
    "d4-highlight-2": "Privattransfer",
    "d4-highlight-3": "4★ Hotel Medellin",
    
    "d5-title": "Graffitour Comuna 13 in Medellin",
    "d5-desc": "Tauchen Sie ein in die Kultur der sozialen Transformation in Comuna 13. Wir nehmen die Seilbahn, um die Aussicht auf das Tal zu genießen, und laufen über die berühmten Rolltreppen unter freiem Himmel. Genießen Sie Street-Art und Graffitis mit lokalen Guides, inklusive einer kostenlosen Kostprobe von Craft-Bier oder Mango-Eiscreme.",
    "d5-highlight-1": "Graffitour",
    "d5-highlight-2": "Seilbahn",
    "d5-highlight-3": "Rolltreppen",
    
    "d6-title": "Tagesausflug nach Guatape und Piedra del Peñol",
    "d6-desc": "Wir holen Sie um 7:00 Uhr ab. Wir besuchen die wunderschöne und farbenfrohe Stadt Guatape, die für ihre kunstvollen Zócalos bekannt ist. Wir segeln mit der Majestic-Yacht über den Stausee und betrachten die imposante Piedra del Peñol. Inklusive komplettem Mittagsbuffet (Besteigung des Felsens ist optional für ca. 8 USD).",
    "d6-highlight-1": "Buntes Guatapé",
    "d6-highlight-2": "Yachtfahrt",
    "d6-highlight-3": "Piedra del Peñol",
    
    "d7-title": "Inlandsflug nach Cartagena",
    "d7-desc": "Privattransfer zum Flughafen Medellin, um Ihren Inlandsflug in das magische und historische Cartagena anzutreten. Ankunft, private Abholung im klimatisierten Fahrzeug und Transfer zum Holiday Inn Express Cartagena im Touristenviertel Bocagrande.",
    "d7-highlight-1": "Inlandsflug",
    "d7-highlight-2": "Bocagrande",
    "d7-highlight-3": "Kolumbianische Karibik",
    
    "d8-title": "Stadtrundfahrt in Cartagena de Indias",
    "d8-desc": "Wir machen eine komplette geführte Tour (um 9 Uhr oder 14 Uhr) durch die modernen Stadtteile, die Bucht und die Festung San Felipe de Barajas (koloniales historisches Erbe). Weiter geht es zu Fuß durch die ummauerte Stadt, inklusive Fotostopp am berühmten Cartagena-Schriftzug.",
    "d8-highlight-1": "Festung San Felipe",
    "d8-highlight-2": "Ummauerte Stadt",
    "d8-highlight-3": "Historischer Guide",
    
    "d9-title": "Premium-Tagespass im Beach Club",
    "d9-desc": "Ein unvergesslicher Tag der Entspannung auf der wunderschönen Insel Tierra Bomba, nur 15 Minuten mit dem Schnellboot entfernt. Inklusive Hin- und Rückfahrt mit der Fähre, Begrüßungscocktail oder -bier, Nutzung der Strandeinrichtungen und einem leckeren traditionellen karibischen Mittagessen (Hafengebühr von ca. 8 USD ist nicht enthalten).",
    "d9-highlight-1": "Tierra Bomba",
    "d9-highlight-2": "Schnellboot",
    "d9-highlight-3": "Premium-Strand",
    
    "d10-title": "Finaler Flughafentransfer",
    "d10-desc": "Zur vereinbarten Zeit holt Sie unser Privatfahrer an Ihrem Hotel in Cartagena ab, um Sie zum Flughafen für Ihre Verbindung oder Ihren Rückflug zu bringen. Vielen Dank für Ihren Besuch!",
    "d10-highlight-1": "Privattransfer",
    "d10-highlight-2": "Pünktlichkeit garantiert",
    "d10-highlight-3": "Abschied",
    
    // Inclusions & Exclusions
    "inc-title": "Details zur Abdeckung",
    "inc-subtitle": "Alles, was Sie vor Ihrer Reise transparent wissen müssen.",
    "inc-box-included": "Inklusive Leistungen",
    "inc-box-not-included": "Nicht inklusive",
    "inc-1": "<strong>Inlandsflüge:</strong> Flüge von Bogota nach Medellin und Medellin nach Cartagena mit vertrauenswürdigen Fluggesellschaften.",
    "inc-2": "<strong>4-Sterne-Unterkunft:</strong> 9 Nächte in Hotels in sicheren Gegenden (Chico, Poblado/Laureles und Bocagrande).",
    "inc-3": "<strong>Bodentransfers:</strong> Private, komfortable Fahrzeuge für Transfers Flughafen - Hotel - Flughafen.",
    "inc-4": "<strong>Eintrittskarten inklusive:</strong> Einlass für Monserrate, Goldmuseum, Botero-Museum, Salzkathedrale und Festung San Felipe.",
    "inc-5": "<strong>Tagespässe & Ausflüge:</strong> Majestic-Yachtfahrt in Guatape und Premium-Strandclub-Tagespass.",
    "inc-6": "<strong>Verpflegung wie angegeben:</strong> Tägliches Frühstück und typische Mittagessen wie in der Reiseroute beschrieben.",
    "inc-7": "<strong>Krankenversicherung:</strong> Lokale Krankenversicherungskarte für die gesamte Reise aktiv.",
    
    "exc-1": "Internationale Flüge für die An- und Abreise nach/von Kolumbien.",
    "exc-2": "Besteigung der Piedra del Peñol in Guatape (Zusatzkosten: ca. 8 USD).",
    "exc-3": "Hafengebühr am Pier in Cartagena (Zusatzkosten: ca. 8 USD).",
    "exc-4": "Mahlzeiten oder Getränke, die nicht im regulären Programm enthalten sind.",
    "exc-5": "Trinkgelder für Fahrer und Bootsbesatzungen optional.",
    
    // Calculator
    "calc-title": "Tarifrechner",
    "calc-subtitle": "Simulieren Sie die Kosten Ihrer Gruppenrundreise und passen Sie Ihr Angebot in Echtzeit an.",
    "calc-config-title": "Konfigurieren Sie Ihre Buchung",
    "calc-pax-lbl": "Anzahl der Reisenden",
    "calc-summary-title": "Geschätztes Angebot",
    "calc-package-title": "Komplette 10-tägige Rundreise",
    "calc-price-lbl": "Preis pro Person:",
    "calc-total-lbl": "Gesamtpreis der Buchung:",
    "calc-saving": "Gruppenrabatt angewendet: Sie sparen <strong>{percent}%</strong>!",
    "calc-no-saving": "Garantierter Standardtarif.",
    "btn-book": "Über WhatsApp buchen",
    
    // Testimonials
    "test-title": "Erfahrungen unserer Reisenden",
    "test-subtitle": "Verifizierte Bewertungen von Kunden, die Kolumbien mit uns bereist haben.",
    "test-1-text": '"Eine spektakuläre Reise. Die Koordination in Bogota, der Flug nach Medellin und die Ankunft in Cartagena waren perfekt. Die 4-Sterne-Hotels haben unsere Erwartungen übertroffen. Der Premium-Strandclub ist ein absolutes Paradies."',
    "test-2-text": '"Es ist die beste Entscheidung, als Familie durch Kolumbien zu reisen, ohne sich um Inlandsflüge oder Hotels sorgen zu müssen. Der 24/7-Support reagierte sofort, als wir ein Tourdatum änderten. Sehr zu empfehlen."',
    
    // FAQs
    "faq-title": "Häufig gestellte Fragen",
    "faq-subtitle": "Wir beantworten Ihre Fragen zur 10-tägigen Rundreise.",
    "fq1-q": "Welches Gepäck ist auf Inlandsflügen enthalten?",
    "fq1-a": "Alle im Paket enthaltenen Inlandsflüge decken ein persönliches Gepäckstück (Rucksack) und ein Handgepäckstück in der Kabine von bis zu 10 kg ab. Wenn Sie zusätzliches aufgegebenes Gepäck benötigen, können Sie dies mit uns koordinieren.",
    "faq-q2": "Wie lauten die Stornierungsbedingungen für die 10-tägige Rundreise?",
    "faq-a2": "Bei einer Stornierung bis zu 3 Tage vor Reiseantritt fällt keine Stornogebühr an. Bei einer Stornierung zwischen 24 und 48 Stunden vorher wird eine Gebühr von 25 % erhoben, und bei einer Stornierung innerhalb von 12 Stunden vor Reisebeginn fallen 100 % Stornokosten an.",
    "faq-q3": "Was passiert, wenn sich mein internationaler Flug am ersten Tag verspätet?",
    "faq-a3": "Keine Sorge. Wir überwachen die Flugnummern in Echtzeit. Unser Privatfahrer erwartet Sie unabhängig von der Verspätung im internationalen Ankunftsbereich, um Sie sicher zum Hotel zu bringen.",
    
    // Toasts
    "toast-success-title": "Anfrage gesendet!",
    "toast-success-msg": "Wir verbinden Sie mit einem Berater über WhatsApp, um Ihre Buchung abzuschließen.",
    "whatsapp-tooltip": "Fragen? Chatten Sie mit uns"
  }
};

// Lógica de Inicialización e Idiomas
let currentLang = "es";

function switchLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  
  // Actualizar botones activos
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) activeBtn.classList.add("active");
  
  // Escanear y traducir elementos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    let text = translations[lang][key];
    
    if (text) {
      // Si el elemento es un input con placeholder
      if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) {
        el.setAttribute("placeholder", text);
      } else {
        el.innerHTML = text;
      }
    }
  });
  
  // Actualizar la calculadora de tarifas tras cambiar idioma
  updatePrices();
}

// Lógica del Cotizador de Tarifas
const BASE_PRICE = 1185; // USD por persona
let paxCount = 1;

function updatePrices() {
  let discountPercent = 0;
  
  // Descuento del 5% a partir de 5 personas
  if (paxCount >= 5) {
    discountPercent = 5;
  }
  
  const originalPricePerPerson = BASE_PRICE;
  const finalPricePerPerson = BASE_PRICE * (1 - discountPercent / 100);
  const totalReservationPrice = finalPricePerPerson * paxCount;
  
  // Mostrar valores en pantalla
  const priceDisplay = document.getElementById("price-value");
  const totalPriceDisplay = document.getElementById("total-price-value");
  const savingInfo = document.getElementById("calc-saving-info");
  
  if (priceDisplay) priceDisplay.innerText = `$${Math.round(finalPricePerPerson)} USD`;
  if (totalPriceDisplay) totalPriceDisplay.innerText = `$${Math.round(totalReservationPrice)} USD`;
  
  if (savingInfo) {
    if (discountPercent > 0) {
      savingInfo.className = "calc-saving-alert active";
      // Formatear texto de ahorro
      let savingTxt = translations[currentLang]["calc-saving"] || "";
      savingTxt = savingTxt.replace("{percent}", discountPercent);
      savingInfo.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${savingTxt}`;
    } else {
      savingInfo.className = "calc-saving-alert";
      const standardText = translations[currentLang]["calc-no-saving"] || "Tarifa estándar garantizada.";
      savingInfo.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${standardText}</span>`;
    }
  }
}

// Inicialización de Eventos DOM
document.addEventListener("DOMContentLoaded", () => {
  // 1. Detectar idioma en URL (?lang=en|pt|de)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  if (langParam && ["es", "en", "pt", "de"].includes(langParam.toLowerCase())) {
    currentLang = langParam.toLowerCase();
  }
  switchLanguage(currentLang);
  
  // 2. Acordeones del Itinerario
  document.querySelectorAll(".day-header").forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains("open");
      
      // Cerrar otros
      document.querySelectorAll(".itinerary-day").forEach(day => {
        day.classList.remove("open");
      });
      
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });
  // Abrir el primer día por defecto
  const firstDay = document.getElementById("day-1-node");
  if (firstDay) firstDay.classList.add("open");
  
  // 3. Acordeones de FAQs
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains("open");
      
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
      });
      
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });
  
  // 4. Controles del Cotizador
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
  
  // 5. Botón de Reserva del Cotizador (WhatsApp)
  const btnCalcBook = document.getElementById("calc-book-btn");
  if (btnCalcBook) {
    btnCalcBook.addEventListener("click", () => {
      let discountPercent = paxCount >= 5 ? 5 : 0;
      const finalPrice = BASE_PRICE * (1 - discountPercent / 100);
      const totalCost = finalPrice * paxCount;
      
      let message = `Hola Transfers & Tours. Quiero cotizar el Circuito de 10 días (Bogotá, Medellín, Cartagena) para ${paxCount} personas. `;
      message += `Precio estimado: $${Math.round(totalCost)} USD.`;
      
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
  
  // 6. Envío del Formulario del Hero (Kommo CRM / Supabase)
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
      
      const payload = {
        landing_name: "Sabores Ritmos Paisajes 10 Días",
        destination: "Bogota-Medellin-Cartagena",
        source: "Landing B2C",
        full_name: nameVal,
        email: emailVal,
        phone: phoneVal,
        travel_date: dateVal,
        tickets: paxCount,
        estimated_price: BASE_PRICE * paxCount,
        special_requests: "Formulario de Registro Rápido Hero",
        message: `Solicitud de reserva de circuito regular de 10 días. Fecha: ${dateVal}.`,
        status: "Nuevo Lead",
        meta_event_id: eventId,
        event_source_url: window.location.href
      };
      
      try {
        // Enviar asíncronamente a la Edge Function de Supabase
        const endpoint = `${SUPABASE_CONFIG.url}/functions/v1/${SUPABASE_CONFIG.functionName}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`
          },
          body: JSON.stringify(payload)
        });
        
        // Mostrar Toast de éxito
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
                content_name: "Sabores Ritmos Paisajes 10 Días",
                value: BASE_PRICE * paxCount,
                currency: 'USD'
              }, { eventID: eventId });
            }

            // Redirigir a WhatsApp para finalizar contacto
            const msgWa = `Hola Transfers & Tours. Acabo de registrarme para el Circuito de 10 Días (Bogotá, Medellín, Cartagena). Mi nombre es ${nameVal}.`;
            window.location.href = `https://wa.me/573146644303?text=${encodeURIComponent(msgWa)}`;
          }, 3000);
        }
        
        heroForm.reset();
      } catch (err) {
        console.error("Error enviando lead:", err);
        // Trigger Google Ads conversion tracking event
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': 'AW-924615238/32FZCNHNvskcEMaE8rgD'
          });
        }
        // Trigger Meta Pixel Lead event with deduplication ID (fallback)
        if (typeof fbq === 'function') {
          fbq('track', 'Lead', {
            content_name: "Sabores Ritmos Paisajes 10 Días",
            value: BASE_PRICE * paxCount,
            currency: 'USD'
          }, { eventID: eventId });
        }

        // Respaldo de redirección inmediata a WhatsApp en caso de error
        const msgWaFallback = `Hola. Intenté registrarme en la landing de 10 días pero ocurrió un error. Mi nombre: ${nameVal}, Email: ${emailVal}, Tel: ${phoneVal}, Fecha: ${dateVal}.`;
        window.location.href = `https://wa.me/573146644303?text=${encodeURIComponent(msgWaFallback)}`;
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});

// Helper to generate a unique event ID for Meta deduplication
function generateEventId() {
  return 'meta-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}
