-- ===== SUKABUMI RAYA TABLE TENNIS - SUPABASE SCHEMA =====
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query

-- EVENTS
CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  date_start text DEFAULT '',
  date_end text DEFAULT '',
  venue text DEFAULT '',
  city text DEFAULT '',
  banner_url text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- PLAYERS
CREATE TABLE IF NOT EXISTS public.players (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  ptm text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- BRACKETS (bagan turnamen per event+sub_event+size)
CREATE TABLE IF NOT EXISTS public.brackets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name text NOT NULL,
  sub_event text DEFAULT '',
  size integer DEFAULT 16,
  slots jsonb DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_name, sub_event, size)
);

-- MATCHES (pertandingan manual)
CREATE TABLE IF NOT EXISTS public.matches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  round text DEFAULT '',
  event text DEFAULT '',
  sub_event text DEFAULT '',
  venue text DEFAULT '',
  table_no text DEFAULT '',
  score_a integer DEFAULT 0,
  score_b integer DEFAULT 0,
  player_a jsonb DEFAULT '[]'::jsonb,
  player_b jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'scheduled',
  scheduled_time text DEFAULT '',
  draw_group text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- NEWS
CREATE TABLE IF NOT EXISTS public.news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text DEFAULT '',
  summary text DEFAULT '',
  content text DEFAULT '',
  published_date text DEFAULT '',
  image_url text DEFAULT '',
  category text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- VIDEOS
CREATE TABLE IF NOT EXISTS public.videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text DEFAULT '',
  url text DEFAULT '',
  thumbnail text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- RLS: enable + allow all for anon key (admin auth handled by app)
ALTER TABLE public.events  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brackets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all" ON public.events  FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.players FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.brackets FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.matches FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.news    FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all" ON public.videos  FOR ALL TO anon USING (true) WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.brackets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
