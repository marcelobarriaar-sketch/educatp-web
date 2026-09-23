import { createClient, type SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | undefined;
// Legacy pages initialize their client only when they read or write data.
// The migrated Inicio and Decap editor do not require Supabase configuration.
export function getSupabase(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  // The migrated Inicio does not call this module. The placeholder keeps the
  // legacy pages and their tests renderable while their content is migrated.
  return client ??= createClient(url || 'https://placeholder.supabase.co', key || 'legacy-placeholder-key');
}
