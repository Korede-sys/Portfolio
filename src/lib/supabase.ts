import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars missing — content editing and live data will fall back to static defaults."
  );
}

// Force every request to bypass HTTP caching. Without this, browsers can
// serve a stale cached response for the site_content GET request even
// after an admin edit has actually saved — the fix isn't optional.
const noCacheFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

export const supabase = url && anonKey
  ? createClient(url, anonKey, { global: { fetch: noCacheFetch } })
  : null;
