// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
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

// SHA-256 Hashing Helper for Meta CAPI compliance
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashUserData(value: string | undefined | null, isPhone = false): Promise<string | null> {
  if (!value) return null;
  let normalized = value.trim().toLowerCase();
  if (isPhone) {
    normalized = normalized.replace(/\D/g, ''); // Keep digits only (country code + number)
  }
  return await sha256(normalized);
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
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
    
    // Meta Tracking properties sent by client
    const metaEventId = body.meta_event_id || null
    const eventSourceUrl = body.event_source_url || null

    // Validate required fields
    if (!fullName) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios en el formulario (Nombre es requerido)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Supabase Client using native Edge Function credentials
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Save lead to Supabase Database (landing_leads table)
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
      console.error('Error saving lead to Supabase Database:', dbError)
      // We log the error but do not throw, so that the lead is still sent to Kommo CRM
    }

    // --- META CONVERSIONS API (CAPI) INTEGRATION ---
    const metaPixelId = Deno.env.get('META_PIXEL_ID') || '1703033940132796'
    const metaAccessToken = Deno.env.get('META_ACCESS_TOKEN') || 'EAAZCsJobRSD4BSAYzRl1okG4GNlRMWaPIonbA6zJLeVwCrNlPxjwB3eZCU7FdZCkxMYNvS9guwHFiFsduITC8oublu9AbapIhFBrmXO95mZCmqAicZBpEXzLegDPuqZAO1xWIgZBfec3kMAfKtsxBot02LXES0dk0v6ZB6G9XIT185m6uv1d1WgyUZCjCpfApSgZDZD'

    if (metaPixelId && metaAccessToken) {
      try {
        // Extract client headers for Meta quality matching
        const clientIp = req.headers.get('x-real-ip') || 
                         req.headers.get('cf-connecting-ip') || 
                         req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                         '';
        const clientUserAgent = req.headers.get('user-agent') || '';

        // Hash sensitive user data
        const hashedEmail = await hashUserData(email);
        const hashedPhone = await hashUserData(phone, true);

        const userData: any = {
          client_ip_address: clientIp || undefined,
          client_user_agent: clientUserAgent || undefined,
        };
        if (hashedEmail) userData.em = [hashedEmail];
        if (hashedPhone) userData.ph = [hashedPhone];

        // Format estimated price (remove non-numeric chars if any)
        let parsedPrice = 0;
        if (estimatedPrice) {
          const priceString = String(estimatedPrice).replace(/[^\d]/g, '');
          parsedPrice = parseInt(priceString, 10) || 0;
        }

        const metaEvent = {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: metaEventId || undefined,
          event_source_url: eventSourceUrl || req.headers.get('referer') || undefined,
          action_source: 'website',
          user_data: userData,
          custom_data: {
            value: parsedPrice || undefined,
            currency: 'COP', // Currency standard for this business, fallback to COP
          }
        };

        console.log(`Sending Conversions API Lead Event (EventID: ${metaEventId}) to Meta Pixel: ${metaPixelId}`);

        const capiResponse = await fetch(`https://graph.facebook.com/v19.0/${metaPixelId}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [metaEvent],
            access_token: metaAccessToken
          })
        });

        if (!capiResponse.ok) {
          const capiErrText = await capiResponse.text();
          console.error('Failed to send event to Meta Conversions API:', capiErrText);
        } else {
          const capiResJson = await capiResponse.json();
          console.log('Successfully sent event to Meta Conversions API:', capiResJson);
        }
      } catch (metaError) {
        console.error('Error during Meta CAPI execution:', metaError);
      }
    } else {
      console.warn('Meta Pixel ID or Access Token is missing. Meta CAPI event not sent.');
    }
    // -----------------------------------------------

    const subdomain = Deno.env.get('KOMMO_SUBDOMAIN')
    const accessToken = Deno.env.get('KOMMO_ACCESS_TOKEN') ?? Deno.env.get('KOMMO_TOKEN')
    const pipelineId = Deno.env.get('KOMMO_PIPELINE_ID')

    if (!subdomain || !accessToken) {
      console.error('Server Configuration Error: KOMMO_SUBDOMAIN or KOMMO_ACCESS_TOKEN/KOMMO_TOKEN is missing')
      return new Response(JSON.stringify({ error: 'Error de configuración del servidor. Faltan credenciales del CRM.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // We only create/link contact in Kommo if phone or email is present
    let contactId = null;
    if (phone || email) {
      // Step 1: Check if Contact already exists in Kommo CRM (search by email or phone)
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

      // If Contact does not exist, create it
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
          const errText = await createContactRes.text()
          console.error('Failed to create contact in Kommo CRM:', errText)
        }
      }
    }

    // Step 2: Create a Lead in Kommo CRM and link it to the Contact
    const leadPayload: any = {
      name: `Reserva ${landingName} - ${fullName}`,
      price: estimatedPrice || (passengerCount * 99),
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
      const errText = await createLeadRes.text()
      console.error('Failed to create lead in Kommo CRM:', errText)
      throw new Error('No se pudo crear el prospecto en el CRM')
    }

    const leadResData = await createLeadRes.json()
    const leadId = leadResData._embedded.leads[0].id

    // Step 3: Add detailed reservation notes to the Lead
    let noteText = `Detalles de la Reserva:\n`;
    noteText += `- Landing: ${landingName}\n`;
    noteText += `- Nombre Completo: ${fullName}\n`;
    if (email) noteText += `- Correo Electrónico: ${email}\n`;
    if (phone) noteText += `- Teléfono / WhatsApp: ${phone}\n`;
    if (passengerCount) noteText += `- Pasajeros: ${passengerCount}\n`;
    if (travelDate) noteText += `- Fecha del Viaje: ${travelDate}\n`;
    if (pickupAddress) noteText += `- Preferencia Hotel/Recogida: ${pickupAddress}\n`;
    if (age) noteText += `- Edad: ${age}\n`;
    if (countryOfBirth) noteText += `- País de Nacimiento: ${countryOfBirth}\n`;
    if (passportOrId) noteText += `- Pasaporte / Identificación: ${passportOrId}\n`;
    if (additionalRequests) noteText += `- Comentarios / Cotización: ${additionalRequests}\n`;
    if (message) noteText += `- Mensaje: ${message}\n`;

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

    if (!addNoteRes.ok) {
      const errText = await addNoteRes.text()
      console.warn('Failed to attach note to lead in Kommo CRM (non-blocking):', errText)
    }

    return new Response(JSON.stringify({ success: true, leadId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Edge Function Error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
