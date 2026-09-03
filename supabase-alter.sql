-- Tambah kolom tambahan ke tabel events
-- Jalankan di Supabase SQL Editor jika belum ada

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS tier text DEFAULT 'open-a';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS tier_color text DEFAULT '#9c27b0';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS tier_label text DEFAULT 'Open A';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS prize_money text DEFAULT '';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS categories jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS completed boolean DEFAULT false;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS champions_ms text DEFAULT '';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS champions_ws text DEFAULT '';
