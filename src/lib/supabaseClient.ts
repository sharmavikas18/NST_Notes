import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

const isUrlValid = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const finalUrl = isUrlValid(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co';
const finalKey = supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key_here' ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(finalUrl, finalKey);
