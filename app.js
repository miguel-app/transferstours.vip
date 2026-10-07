// ==========================================================================
// SUPABASE INTEGRATION CONFIGURATION (B2B Catalog Portal)
// ==========================================================================
const SUPABASE_CONFIG = {
  url: "https://cwnghbusxhjdrqtaoxal.supabase.co", // Tu endpoint de Supabase
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bmdoYnVzeGhqZHJxdGFveGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDE0MzQsImV4cCI6MjA5NTcxNzQzNH0.L4sxIBAzLHNR4y-JsCEy5zHFcf0SHDtf12q1xwneFVE", // Tu clave pública anon
  functionName: "create-lead" // Nombre de la Edge Function en Supabase
};

// Main function to register B2B Lead
async function sendB2BLeadToSupabase(leadData) {
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.log("Supabase no configurado en 'app.js'. Omitiendo registro.");
    return;
  }
  
  try {
    const url = `${SUPABASE_CONFIG.url}/functions/v1/${SUPABASE_CONFIG.functionName}`;
    const headers = {
      "apikey": SUPABASE_CONFIG.anonKey,
      "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
      "Content-Type": "application/json"
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(leadData)
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    console.log("Lead B2B registrado exitosamente en Supabase y Kommo.");
  } catch (error) {
    console.error("Error al registrar lead B2B en Supabase:", error);
  }
}

// ==========================================================================
// FORM SUBMISSION (B2B Portal)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const b2bForm = document.getElementById("b2b-registration-form");
  
  if (b2bForm) {
    b2bForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const eventId = generateEventId();
      const b2bSubmitBtn = document.getElementById("b2b-submit-btn");
      if (b2bSubmitBtn) {
        b2bSubmitBtn.disabled = true;
        b2bSubmitBtn.innerText = "Procesando Registro...";
      }

      const agencyName = document.getElementById("agency-name").value;
      const agentName = document.getElementById("agent-name").value;
      const email = document.getElementById("agent-email").value;
      const phone = document.getElementById("agent-phone").value;
      const comments = document.getElementById("agent-message").value;
      
      // Structure leadData to match Deno Edge Function parser
      const leadData = {
        landingName: "Portal Catalogo B2B",
        destination: "Colombia B2B",
        source: "b2b_catalog",
        fullName: agentName,
        email: email,
        phone: phone,
        tickets: 1,
        campaign: "direct-b2b",
        specialRequests: `Agencia: ${agencyName}. Comentarios: ${comments || "Ninguno."}`,
        status: "new",
        meta_event_id: eventId,
        event_source_url: window.location.href
      };

      // Send to Supabase in background
      await sendB2BLeadToSupabase(leadData);

      // Trigger Meta Pixel Lead event
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: "Portal Catalogo B2B",
          value: 10,
          currency: 'USD'
        }, { eventID: eventId });
      }

      // Show Success Toast
      showToast();

      // Reset form & button state
      b2bForm.reset();
      if (b2bSubmitBtn) {
        b2bSubmitBtn.disabled = false;
        b2bSubmitBtn.innerText = "Enviar Solicitud de Afiliación";
      }
    });
  }
});

function showToast() {
  const toast = document.getElementById("success-toast");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }
}

// Helper to generate a unique event ID for Meta deduplication
function generateEventId() {
  return 'meta-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}
