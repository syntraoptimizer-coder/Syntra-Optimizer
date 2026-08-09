import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl !== 'https://your-supabase-url.supabase.co' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-anon-key'
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const SUPABASE_ENV_STATUS = {
  isConfigured: isSupabaseConfigured,
  url: supabaseUrl ? supabaseUrl.replace(/(https:\/\/.*?)\..*/, '$1.supabase.co') : 'Not Configured (Demo Mode Active)'
};
