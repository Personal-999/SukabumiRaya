-- VERSI 2: Drop SEMUA policy yang mungkin ada, lalu buat ulang
-- Jalankan di Supabase SQL Editor

-- GRANT dasar
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Drop SEMUA kemungkinan nama policy
DO $$ 
DECLARE tbl text; pol text;
BEGIN
  FOR tbl IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('events','players','brackets','matches','news','videos','pools') LOOP
    FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = tbl LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
    END LOOP;
  END LOOP;
END $$;

-- Buat ulang policy per tabel
CREATE POLICY "allow_all" ON public.events  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.players FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.brackets FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.matches  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.news    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.videos  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Pools table (buat jika belum ada)
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
CREATE POLICY "allow_all" ON public.pools FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
GRANT ALL ON public.pools TO anon;
