import { createClient } from "@supabase/supabase-js";

// The anon key is safe to ship in the browser — security comes from the
// row-level security policies on the `plans` table. Values can be overridden
// at build time via Vite env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
const env = import.meta.env || {};
const url =
  env.VITE_SUPABASE_URL || "https://qmvpqqboofgvzfvmbjie.supabase.co";
const anonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdnBxcWJvb2Zndnpmdm1iamllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4Mzg2MjcsImV4cCI6MjA5NzQxNDYyN30.OZ6ztXtS-30_uA1uNsemYMmb5l9BDuQEw7RXe96hU30";

export const supabase = createClient(url, anonKey);
