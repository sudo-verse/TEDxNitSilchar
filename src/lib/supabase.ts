import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ebnrksgpbdvfrykbdhwi.supabase.co';
const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibnJrc2dwYmR2ZnJ5a2JkaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODEyOTIsImV4cCI6MjA1MTA1NzI5Mn0.2Kn3aWzL4vPz9pX6yF8uB2nQ7rT5sJ1mN3xR6cV9wE4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
