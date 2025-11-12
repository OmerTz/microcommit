import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL || 'https://hsiqjmxusktrhcjsoffj.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzaXFqbXh1c2t0cmhjanNvZmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjkzMjAsImV4cCI6MjA1ODA0NTMyMH0.pIGRESjmPBZQKOEhvM_MKBhPXU7AGwXkNhIDzfeoCbA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: undefined, // Will be replaced with proper storage solution
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
