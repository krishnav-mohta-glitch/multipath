import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://oestvwgkpllikmufvjls.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_ZxcO_ZdsXI11fehS2xajPA_uT2gRJ3M';

const rawUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_PROJECT_URL ||
  import.meta.env.SUPABASE_URL ||
  DEFAULT_SUPABASE_URL
)?.trim();

const rawKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_KEY
)?.trim();

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
  // When credentials are not configured, clientInstance remains null.
  // A configured Supabase connection is required for authenticated learning functionality.
}

export const supabase = clientInstance;

export function isSupabaseConfigured(): boolean {
  return isConfigured && clientInstance !== null;
}

export function getSupabaseClient(): SupabaseClient | null {
  return clientInstance;
}

export function getConfigurationDiagnostics(): {
  isConfigured: boolean;
  hasUrl: boolean;
  hasKey: boolean;
  missingVars: string[];
} {
  const hasUrl = isValidHttpUrl(rawUrl);
  const hasKey = isValidKey(rawKey);
  const missingVars: string[] = [];
  if (!hasUrl) missingVars.push('VITE_SUPABASE_URL');
  if (!hasKey) missingVars.push('VITE_SUPABASE_PUBLISHABLE_KEY');
  return {
    isConfigured: hasUrl && hasKey && clientInstance !== null,
    hasUrl,
    hasKey,
    missingVars,
  };
}
