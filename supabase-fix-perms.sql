-- JALANKAN DI SUPABASE SQL EDITOR
-- Fix: Berikan akses DELETE untuk anon key

GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Hapus policy lama jika ada, buat ulang yang benar
DROP POLICY IF EXISTS "anon_all" ON public.events;
DROP POLICY IF EXISTS "anon_all" ON public.players;
DROP POLICY IF EXISTS "anon_all" ON public.brackets;
DROP POLICY IF EXISTS "anon_all" ON public.matches;
DROP POLICY IF EXISTS "anon_all" ON public.news;
DROP POLICY IF EXISTS "anon_all" ON public.videos;

-- Policy baru: eksplisit per operasi
CREATE POLICY "anon_select" ON public.events FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.events FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.events FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select" ON public.players FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.players FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.players FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.players FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select" ON public.brackets FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.brackets FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.brackets FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.brackets FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select" ON public.matches FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.matches FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.matches FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.matches FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select" ON public.news FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.news FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.news FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.news FOR DELETE TO anon USING (true);

CREATE POLICY "anon_select" ON public.videos FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert" ON public.videos FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update" ON public.videos FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete" ON public.videos FOR DELETE TO anon USING (true);
