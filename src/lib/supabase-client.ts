import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://ymkrbeuwvruhmprqjmuj.supabase.co';
// Anon key bersifat publik (dilindungi RLS); fallback agar build lokal tanpa .env tetap jalan.
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlta3JiZXV3dnJ1aG1wcnFqbXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjg0NzUsImV4cCI6MjEwMjYwNDQ3NX0.Hs3PaEvF6Fxie-GvhtVYH9Lj9SwItaO4eMby9a0a9FA';

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});
