# Blueprint & Guía de Replicación: Landing Pages de Alta Conversión

Esta guía documenta la estructura técnica de SEO, GEO-targeting y diseño visual utilizada en la landing page de **Transfers & Tours Colombia**. Úsala como plantilla para construir rápidamente futuras páginas manteniendo la misma identidad estética y optimización técnica.

---

## 📋 Checklist de Lanzamiento Rápido

Antes de publicar cualquier nueva landing page, asegúrate de configurar los siguientes puntos clave:

### 1. SEO Técnico & Hreflang
- [ ] **Canonical URL:** Modificar `<link rel="canonical" href="..." />` con la dirección final del nuevo tour.
- [ ] **Hreflang Tags (SEO Internacional):** Añadir las etiquetas `<link rel="alternate" hreflang="..." href="..." />` para cada idioma soportado (es, en, pt, de y x-default).
- [ ] **Meta-Title (SEO):** Título de menos de 60 caracteres que incluya palabra clave y marca (ej: `Tour [Destino] [Días] Días | Transfers & Tours`).
- [ ] **Meta-Description (SEO):** Resumen de menos de 155 caracteres enfocado al cliente final con los atractivos principales.
- [ ] **Open Graph (Social):** Actualizar las etiquetas de compartir (`og:title`, `og:description`, `og:url` y `og:image` con recursos locales correctos del destino).
- [ ] **Schema.org Structured Data (@graph JSON-LD):** Implementar el gráfico de esquemas conteniendo:
  - `@type: TouristTrip` con el itinerario detallado (`itinerary` con pasos `HowToStep`).
  - `@type: Product` y `AggregateRating` para estrellas en buscadores tradicionales (calificaciones y oferta de precios).
  - `@type: FAQPage` conteniendo el listado de preguntas y respuestas oficiales del acordeón de la web.

### 2. Orientación Geográfica & AEO/GEO (Buscadores de IA)
- [ ] **Geo Meta-tags:** Actualizar la ubicación física y coordenadas correctas de los atractivos del tour:
  ```html
  <meta name="geo.region" content="CO-CUN" /> <!-- Cambiar según la región principal -->
  <meta name="geo.placename" content="Zipaquirá, Cundinamarca, Colombia" />
  <meta name="geo.position" content="5.018783;-74.011664" />
  <meta name="ICBM" content="5.018783, -74.011664" />
  ```
- [ ] **Ficha Técnica Estructurada:** Insertar tabla HTML de especificaciones en la introducción detallando Duración, Transporte, Atractivo, Seguro y RNT, cruzado con sus fuentes institucionales.
- [ ] **Veracidad de Fuentes Factoides:** Asegurar que las citaciones en corchetes `[Fuente: ...]` correspondan a entes lógicos (ej. ANATO, IDEAM, Alcaldías o la entidad gestora del atractivo, no entes desconectados como IPSE para minería de sal).

### 3. Usabilidad & Conversión (CRO Focus)
- [ ] **RNT Unificado:** El número oficial de RNT para Transfers & Tours es **RNT N° 44180**. Actualizar en HTML y todos los diccionarios de traducción.
- [ ] **Flexibilidad del Cotizador:** Implementar selectores interactivos para la calculadora:
  - Modalidad de servicio (Compartido vs. Privado).
  - Inclusión de alimentación (Con Almuerzo Típico vs. Sin Almuerzo).
- [ ] **Mensajes WhatsApp Dinámicos:** Configurar el string del enlace de WhatsApp para detallar la modalidad de servicio y almuerzo seleccionados junto al precio final.
- [ ] **Cumplimiento Legal (Casilla Habeas Data):** Agregar casilla de verificación de políticas Ley 1581 de 2012 tanto en el formulario Hero como en la calculadora (con validación de bloqueo en JS si no se acepta).
- [ ] **Microcopias de Cancelación:** Añadir *"Cancelación gratuita hasta 24 horas antes"* bajo todos los CTAs principales del formulario y calculadora.
- [ ] **Botón Flotante de WhatsApp:** Integrar el widget flotante con tooltips traducidos en todos los idiomas del diccionario.
- [ ] **IDs Únicas:** Asegurar que los botones tengan identificadores únicos para trackear clics en herramientas de analítica.

---

## 🎨 Estética & Sistema de Diseño (CSS)

Para que todas tus páginas se vean idénticas y profesionales, mantén los estilos definidos en [styles.css](file:///c:/Users/Miguel/Landing%20Cartagena/styles.css). Si necesitas cambiar el tema de color para un destino diferente, modifica únicamente estas variables en la sección `:root`:

```css
:root {
  /* Paleta de Colores Corporativos (Transfers & Tours Standard) */
  --color-primary: #022a92;      /* Color de marca principal (Azul Confianza) */
  --color-primary-hover: #011d66;/* Tono hover para botones principales */
  --color-accent: #cd2653;       /* Color de acento de marca (Rojo Coral) */
  --color-accent-hover: #b01f44; /* Tono hover para CTA */
  --color-dark: #070c25;         /* Negro azulado para textos principales */
  --color-muted: #636267;        /* Gris medio para textos secundarios */
  --color-light: #f8fafe;        /* Fondo gris claro/cálido */
  --color-white: #ffffff;
  
  /* Estados */
  --color-success: #2ecc71;      /* Verde (para Incluye) */
  --color-danger: #e74c3c;       /* Rojo (para No Incluye) */

  /* Tipografía */
  --font-family: 'Poppins', system-ui, -apple-system, sans-serif;

  /* Elevaciones y Sombras */
  --shadow-sm: 0 2px 4px rgba(7, 12, 37, 0.05);
  --shadow-md: 0 10px 20px rgba(7, 12, 37, 0.08);
  --shadow-lg: 0 20px 40px rgba(7, 12, 37, 0.12);
  
  /* Bordes Suaves */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  
  /* Animación */
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```

---

## 🧱 Plantilla Base de Estructura HTML

Al crear un nuevo archivo de landing page, asegúrate de mantener esta arquitectura básica de secciones para maximizar el SEO y la conversión:

> [!WARNING]
> **Prohibido el uso de doble asterisco (`**`) en el HTML**: Los navegadores web no interpretan Markdown por defecto, lo que hace que los asteriscos se rendericen en crudo para el cliente final. Usa siempre etiquetas `<strong>` o `<b>` nativas para destacar palabras clave.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- 1. Metadatos SEO, Hreflang Tags (es, en, pt, de), Redes Sociales y GEO -->
  
  <!-- 2. Marcado JSON-LD para Google Schema (TouristTrip y FAQPage) -->
  
  <!-- 3. Hojas de Estilo y Fuentes -->
</head>
<body>

  <!-- ==================== HEADER ==================== -->
  <!-- Logo, Selector de 4 Idiomas (ES, EN, PT, DE) y Botón Cotizar/Reservar -->

  <main>
    <!-- ==================== HERO SECTION ==================== -->
    <!-- Contiene un H1 optimizado AEO/GEO, beneficios rápidos (incluyendo ticket de entrada si aplica),
         formulario B2C limpio de términos corporativos, y microcopia de cancelación gratuita de 24h -->

    <!-- ==================== TRUST BAR ==================== -->
    <!-- Tarjetas de confianza B2C (Recogida en hotel, Soporte 24/7, RNT 44180 legal, etc.) 
         IMPORTANTE: Utilizar exactamente 4 tarjetas para llenar el grid (.trust-badges -> .badges-grid con 4 columnas) -->

    <!-- ==================== INTRODUCCIÓN SEO ==================== -->
    <!-- Texto escaneable (párrafos de max 3 líneas, uso de <strong>) enfocado en AEO/LLMO con citación de fuentes.
         IMPORTANTE: Usar la clase contenedora de grilla '.seo-intro-grid' (y NO '.seo-grid') para renderizar el texto 
         y la imagen en dos columnas armónicas (proporción 1.20fr y 0.80fr).
         Asegurarse de añadir un 'margin-bottom: 24px;' al h2 de esta sección para separar el subtítulo de los párrafos. -->

    <!-- ==================== ITINERARIO (Interactivo) ==================== -->
    <!-- Acordeón colapsable con fotos locales, descripciones limpias de guías físicos e hitos con tags específicos.
         REGLA DE IMÁGENES: No repetir imágenes. Días de vuelos, traslados de llegada/salida y check-ins de hotel 
         deben utilizar imágenes de viaje variadas e independientes (ej. aviones, aeropuertos, maletas), reservando 
         las fotos locales específicas (Monserrate, Catedral de Sal, Cartagena, etc.) para las excursiones correspondientes. -->

    <!-- ==================== INCLUSIONES / EXCLUSIONES ==================== -->
    <!-- Lista formal comparativa detallando de forma transparente las entradas y cobertura médica -->

    <!-- ==================== CALCULADORA DINÁMICA B2C ==================== -->
    <!-- Panel de cotización con más/menos que actualiza instantáneamente:
         - Tarifa por Persona (aplicando descuentos grupales a partir de 5 pax)
         - Total de la Reserva (Totalizador de compra)
         - Microcopia de Cancelación Gratuita debajo del CTA de WhatsApp -->

    <!-- ==================== TESTIMONIALS ==================== -->
    <!-- Tarjetas con opiniones reales adaptadas al tipo de servicio (incluyendo opiniones del audio guía).
         IMPORTANTE: Utilizar exactamente 3 testimonios para completar el grid de 3 columnas (.testimonials-grid). -->

    <!-- ==================== FAQS ==================== -->
    <!-- Acordeón secundario resolviendo dudas clave con citación fáctica -->
  </main>


  <!-- ==================== FOOTER ==================== -->
  <!-- Datos de RNT 44180, contacto, dirección y enlaces a políticas legales -->

  <!-- ==================== WIDGET FLOTANTE DE WHATSAPP ==================== -->
  <!-- Botón flotante con tooltips traducidos en todos los idiomas del diccionario -->

</body>
</html>
```

---

## 🗺️ Cómo Agregar Nuevos Días al Itinerario

Para agregar un día adicional al acordeón del itinerario, copia el siguiente fragmento HTML dentro del contenedor `#itinerary-main-accordion` y modifica los números de los IDs:

```html
<!-- Día X -->
<div class="itinerary-day" id="day-X-node">
  <div class="day-header">
    <div class="day-title-wrapper">
      <div class="day-number">X</div>
      <div class="day-title-info">
        <span data-i18n="day">Día</span>
        <h3 data-i18n="dX-title">Título del Día X</h3>
      </div>
    </div>
    <div class="day-toggle"><i class="fa-solid fa-chevron-down"></i></div>
  </div>
  <div class="day-content">
    <div class="day-content-inner">
      <div class="day-desc">
        <p data-i18n="dX-desc">Descripción de las actividades en español.</p>
        <div class="day-highlights">
          <span class="day-highlight-tag" data-i18n="dX-highlight-1">Atractivo 1</span>
          <span class="day-highlight-tag" data-i18n="dX-highlight-2">Atractivo 2</span>
        </div>
        <div class="day-included-items">
          <div class="day-included-item"><i class="fa-solid fa-car"></i> <span data-i18n="tag-location">Ciudad</span></div>
        </div>
      </div>
      <div class="day-img">
        <img src="assets/nombre-imagen.png" alt="Descripción de la imagen" />
      </div>
    </div>
  </div>
</div>
```

---

## 🌐 Cómo Configurar Traducciones Multilingües (ES / EN / PT / DE)

El sistema de traducción funciona de forma client-side a través de los atributos `data-i18n` en el HTML, y permite la indexación internacional en buscadores usando detección de parámetros de URL.

### 1. Detección Automática de Idioma en URL
Para permitir que los motores de búsqueda indexen la página en diferentes idiomas (conforme a las etiquetas `hreflang`), el script `app.js` detecta el parámetro de consulta `?lang=...` al cargar la página:
```javascript
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && ["es", "en", "pt", "de"].includes(langParam.toLowerCase())) {
    currentLang = langParam.toLowerCase();
  }
  // inicializar listeners, calculadora y finalmente aplicar switchLanguage(currentLang)
});
```

### 2. Diccionario de Traducción en `app.js`
Asegúrate de registrar las claves de traducción para los cuatro idiomas principales:
```javascript
const translations = {
  es: {
    "cancellation-policy": "Cancelación gratuita hasta 24 horas antes",
    "whatsapp-tooltip": "¿Preguntas? Chatea con nosotros"
  },
  en: {
    "cancellation-policy": "Free cancellation up to 24 hours before",
    "whatsapp-tooltip": "Questions? Chat with us"
  },
  pt: {
    "cancellation-policy": "Cancelamento gratuito até 24 horas antes",
    "whatsapp-tooltip": "Dúvidas? Fale conosco"
  },
  de: {
    "cancellation-policy": "Kostenlose Stornierung bis zu 24 Stunden vorher",
    "whatsapp-tooltip": "Fragen? Chatten Sie mit uns"
  }
};
```

---

## 💾 Integración Segura con Supabase y Kommo CRM

Al utilizar Supabase como tu capa de backend, puedes capturar los leads de forma segura y automatizada en Kommo CRM usando **Edge Functions**. Esto protege tus tokens de acceso privados.

### 1. Configurar Variables de Conexión en `app.js`
Abre el archivo [app.js](file:///c:/Users/Miguel/Landing-transferstours/tour-catedral-de-sal/app.js) y rellena los valores en el objeto `SUPABASE_CONFIG`:
```javascript
const SUPABASE_CONFIG = {
  url: "https://tu-proyecto.supabase.co", // Tu endpoint de Supabase
  anonKey: "tu-anon-key-de-supabase",     // Tu clave pública anónima
  useEdgeFunction: true,                  // true para procesar con Kommo
  functionName: "create-lead",            // Nombre de la Edge Function en Supabase
  tableName: "landing_leads"              // Nombre de la tabla de respaldo
};
```

### 2. Estructura de la Base de Datos (Opcional - Guardado Directo)
Si prefieres guardar los leads primero en una tabla en tu base de datos, ejecuta esta consulta SQL en el SQL Editor de tu Dashboard de Supabase:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  source text,
  name text,
  email text,
  phone text,
  travel_date date,
  hotel_tier text,
  travelers_count integer,
  estimated_price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

### 3. Código de la Supabase Edge Function (`create-lead`)
Crea una Edge Function en tu terminal local con el CLI de Supabase:
```bash
supabase functions new create-lead
```

Copia y pega el siguiente código de producción en el archivo `index.ts` creado dentro de la carpeta `supabase/functions/create-lead/`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Manejo de CORS Preflight para navegadores
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const fullName = body.fullName || body.full_name
    const email = body.email
    const phone = body.phone
    const passengerCount = body.passengerCount || body.tickets || 1
    const travelDate = body.travelDate || body.travel_date
    const pickupAddress = body.pickupAddress || body.hotel_preference
    const age = body.age
    const countryOfBirth = body.countryOfBirth
    const passportOrId = body.passportOrId
    const additionalRequests = body.additionalRequests || body.special_requests
    const landingName = body.landingName || body.landing_name || 'Catedral de sal'
    const campaign = body.campaign || 'web-direct'
    const source = body.source || 'web'
    const destination = body.destination || 'Bogotá - Zipaquira'
    const message = body.message
    const status = body.status || 'new'
    const estimatedPrice = body.estimatedPrice || body.estimated_price

    // Validación de campos requeridos
    if (!fullName) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios (Nombre es requerido)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Inicializar cliente Supabase local para persistencia
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Guardar lead de respaldo en la base de datos de Supabase
    const { error: dbError } = await supabase
      .from('landing_leads')
      .insert([
        {
          landing_name: landingName,
          full_name: fullName,
          phone: phone || null,
          email: email || null,
          tickets: passengerCount,
          hotel_preference: pickupAddress || null,
          special_requests: additionalRequests || null,
          campaign: campaign,
          source: source,
          destination: destination,
          message: message || null,
          status: status
        }
      ])

    if (dbError) {
      console.error('Error al guardar lead en base de datos Supabase:', dbError)
    }

    const subdomain = Deno.env.get('KOMMO_SUBDOMAIN')
    const accessToken = Deno.env.get('KOMMO_ACCESS_TOKEN') ?? Deno.env.get('KOMMO_TOKEN')
    const pipelineId = Deno.env.get('KOMMO_PIPELINE_ID')

    if (!subdomain || !accessToken) {
      console.error('Faltan variables de entorno KOMMO_SUBDOMAIN o KOMMO_ACCESS_TOKEN en Supabase')
      return new Response(JSON.stringify({ error: 'Error de configuración. Faltan credenciales del CRM.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Registrar o asociar contacto en Kommo CRM
    let contactId = null;
    if (phone || email) {
      const searchQuery = email ? email : phone
      const searchRes = await fetch(
        `https://${subdomain}.kommo.com/api/v4/contacts?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (searchRes.status === 200) {
        const searchData = await searchRes.json()
        if (searchData && searchData._embedded && searchData._embedded.contacts && searchData._embedded.contacts.length > 0) {
          contactId = searchData._embedded.contacts[0].id
        }
      }

      if (!contactId) {
        const customFields = []
        if (email) {
          customFields.push({
            field_code: 'EMAIL',
            values: [{ value: email, enum_code: 'WORK' }]
          })
        }
        if (phone) {
          customFields.push({
            field_code: 'PHONE',
            values: [{ value: phone, enum_code: 'WORK' }]
          })
        }

        const createContactRes = await fetch(`https://${subdomain}.kommo.com/api/v4/contacts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            {
              name: fullName,
              custom_fields_values: customFields
            }
          ])
        })

        if (createContactRes.ok) {
          const contactData = await createContactRes.json()
          contactId = contactData._embedded.contacts[0].id
        } else {
          console.error('Error al crear contacto en Kommo CRM:', await createContactRes.text())
        }
      }
    }

    // Crear Lead/Prospecto en Kommo CRM
    const leadPayload: any = {
      name: `Reserva ${landingName} - ${fullName}`,
      price: estimatedPrice || 0,
    }

    if (contactId) {
      leadPayload._embedded = {
        contacts: [
          {
            id: contactId
          }
        ]
      }
    }

    if (pipelineId) {
      const parsedPipelineId = parseInt(pipelineId, 10)
      if (!isNaN(parsedPipelineId)) {
        leadPayload.pipeline_id = parsedPipelineId
      }
    }

    const createLeadRes = await fetch(`https://${subdomain}.kommo.com/api/v4/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([leadPayload])
    })

    if (!createLeadRes.ok) {
      throw new Error('No se pudo crear el prospecto en Kommo CRM')
    }

    const leadResData = await createLeadRes.json()
    const leadId = leadResData._embedded.leads[0].id

    // Adjuntar nota detallada con el resumen de la reserva en Kommo
    let noteText = `Detalles de la Reserva:\\n`;
    noteText += `- Landing: ${landingName}\\n`;
    noteText += `- Nombre Completo: ${fullName}\\n`;
    if (email) noteText += `- Correo Electrónico: ${email}\\n`;
    if (phone) noteText += `- Teléfono / WhatsApp: ${phone}\\n`;
    if (passengerCount) noteText += `- Pasajeros: ${passengerCount}\\n`;
    if (travelDate) noteText += `- Fecha del Viaje: ${travelDate}\\n`;
    if (pickupAddress) noteText += `- Preferencia Hotel/Recogida: ${pickupAddress}\\n`;
    if (additionalRequests) noteText += `- Comentarios / Cotización: ${additionalRequests}\\n`;
    if (message) noteText += `- Mensaje: ${message}\\n`;

    const addNoteRes = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/${leadId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        {
          note_type: 'common',
          params: {
            text: noteText
          }
        }
      ])
    })

    return new Response(JSON.stringify({ success: true, leadId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
```

### 4. Desplegar y Configurar Secretos en Supabase
Para desplegar la función a producción, ejecuta en tu terminal:
```bash
supabase functions deploy create-lead
```

Luego, introduce las credenciales de la API de tu Kommo de manera segura en tu proyecto de Supabase para que la función las pueda leer:
```bash
supabase secrets set KOMMO_SUBDOMAIN="tu_subdominio_kommo"
supabase secrets set KOMMO_ACCESS_TOKEN="tu_clave_larga_api_bearer_de_kommo"
supabase secrets set KOMMO_PIPELINE_ID="id_de_embudo_opcional"
```

