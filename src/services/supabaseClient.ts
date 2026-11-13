import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function isValidHttpUrl(str?: string): boolean {
  if (!str || str.includes('your-project-ref')) return false;
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidKey(key?: string): boolean {
  if (!key || key.includes('your_key_here') || key.length < 10) return false;
  return true;
}

export const isConfigured = isValidHttpUrl(rawUrl) && isValidKey(rawKey);

let clientInstance: SupabaseClient | null = null;

if (isConfigured && rawUrl && rawKey) {
  try {
    clientInstance = createClient(rawUrl, rawKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'multipath_supabase_auth_session',
      },
    });
  } catch (err) {
    console.warn('[Supabase] Failed to initialize Supabase client:', err);
    clientInstance = null;
  }
} else {
  // In development without credentials or in offline testing, clientInstance remains null
  // The application automatically operates in resilient Guest Mode.
}

export const supabase = clientInstance;

export function isSupabaseConfigured(): boolean {
  return isConfigured && clientInstance !== null;
}

export function getSupabaseClient(): SupabaseClient | null {
  return clientInstance;
}
