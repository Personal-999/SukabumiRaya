-- JALANKAN INI DI SUPABASE SQL EDITOR
-- Tambah tabel pools untuk menyimpan data pool dari admin

CREATE TABLE IF NOT EXISTS public.pools (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL,
  name text NOT NULL,
  cabang text DEFAULT '',
  teams jsonb DEFAULT '[]'::jsonb,
  schedule jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all_pools" ON public.pools FOR ALL USING (true) WITH CHECK (true);
