import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Chaves do Supabase (NUNCA exponha essas chaves em produção!)
const SUPABASE_URL = "https://ssethvlmwzdoainknztb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZXRodmxtd3pkb2FpbmtuenRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTEwMzksImV4cCI6MjA1ODA2NzAzOX0.pyI4BkggUm9DnAIXaeAqyN99ymMJ98s-PnGMyMBqZu4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
