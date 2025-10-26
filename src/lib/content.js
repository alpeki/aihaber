// src/lib/content.js
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function fetchSiteContent() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content?select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
    const data = await res.json();

    // Verileri DOM'a uygula
    data.forEach((item) => {
      const el = document.querySelector(`[data-key="${item.key}"]`);
      if (el) {
        // Eğer linkse href'ini güncelle
        if (el.tagName === "A" && item.value.startsWith("http")) {
          el.href = item.value;
          el.textContent = el.textContent || item.value;
        } else {
          el.textContent = item.value;
        }
      }
    });

    console.log("✅ Site content loaded from Supabase:", data.length, "records");
  } catch (err) {
    console.error("❌ Failed to load content from Supabase:", err);
  }
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener("DOMContentLoaded", fetchSiteContent);
