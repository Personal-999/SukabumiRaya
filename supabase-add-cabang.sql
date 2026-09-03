-- JALANKAN DI SUPABASE SQL EDITOR
-- Fix LENGKAP: Buat/perbaiki tabel pools dengan semua kolom yang dibutuhkan

-- Buat tabel pools dari awal jika belum ada
CREATE TABLE IF NOT EXISTS public.pools (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name  TEXT NOT NULL DEFAULT '',
  name        TEXT NOT NULL DEFAULT '',
  cabang      TEXT DEFAULT '',
  teams       JSONB DEFAULT '[]'::jsonb,
  schedule    JSONB DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Tambah kolom yang mungkin belum ada (untuk tabel yang sudah ada)
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS event_name  TEXT DEFAULT '';
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS name        TEXT DEFAULT '';
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS cabang      TEXT DEFAULT '';
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS teams       JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS schedule    JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pools ADD COLUMN IF NOT EXISTS created_at  TIMESTAMPTZ DEFAULT now();

-- Enable RLS
ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;

-- Grant akses
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON public.pools TO anon;

-- Drop policy lama
DROP POLICY IF EXISTS "anon_select" ON public.pools;
DROP POLICY IF EXISTS "anon_insert" ON public.pools;
DROP POLICY IF EXISTS "anon_update" ON public.pools;
DROP POLICY IF EXISTS "anon_delete" ON public.pools;
DROP POLICY IF EXISTS "anon_all"    ON public.pools;

-- Buat policy baru
CREATE POLICY "anon_select" ON public.pools FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.pools FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.pools FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.pools FOR DELETE TO anon USING (true);

-- Konfirmasi kolom yang ada
SELECT column_name, data_type FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'pools'
ORDER BY ordinal_position;
