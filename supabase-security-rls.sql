-- ============================================================
--  SUPABASE RLS (Row Level Security) untuk SukabumiRaya
--  Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. PLAYERS table ─────────────────────────────────────────
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Siapapun bisa baca (untuk halaman publik /playerslist)
DROP POLICY IF EXISTS "players_public_read" ON players;
CREATE POLICY "players_public_read"
  ON players FOR SELECT USING (true);

-- Hanya authenticated (admin) yang bisa INSERT / UPDATE / DELETE
DROP POLICY IF EXISTS "players_admin_insert" ON players;
CREATE POLICY "players_admin_insert"
  ON players FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "players_admin_update" ON players;
CREATE POLICY "players_admin_update"
  ON players FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "players_admin_delete" ON players;
CREATE POLICY "players_admin_delete"
  ON players FOR DELETE USING (auth.role() = 'authenticated');

-- ── 2. EVENTS table ──────────────────────────────────────────
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_public_read" ON events;
CREATE POLICY "events_public_read"
  ON events FOR SELECT USING (true);

DROP POLICY IF EXISTS "events_admin_write" ON events;
CREATE POLICY "events_admin_write"
  ON events FOR ALL USING (auth.role() = 'authenticated');

-- ── 3. MATCHES table ─────────────────────────────────────────
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "matches_public_read" ON matches;
CREATE POLICY "matches_public_read"
  ON matches FOR SELECT USING (true);

DROP POLICY IF EXISTS "matches_admin_write" ON matches;
CREATE POLICY "matches_admin_write"
  ON matches FOR ALL USING (auth.role() = 'authenticated');

-- ── 4. BRACKETS table ────────────────────────────────────────
ALTER TABLE brackets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "brackets_public_read" ON brackets;
CREATE POLICY "brackets_public_read"
  ON brackets FOR SELECT USING (true);

DROP POLICY IF EXISTS "brackets_admin_write" ON brackets;
CREATE POLICY "brackets_admin_write"
  ON brackets FOR ALL USING (auth.role() = 'authenticated');

-- ── 5. POOLS table ───────────────────────────────────────────
ALTER TABLE pools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pools_public_read" ON pools;
CREATE POLICY "pools_public_read"
  ON pools FOR SELECT USING (true);

DROP POLICY IF EXISTS "pools_admin_write" ON pools;
CREATE POLICY "pools_admin_write"
  ON pools FOR ALL USING (auth.role() = 'authenticated');

-- ── 6. NEWS / ARTICLES table (jika ada) ──────────────────────
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (true);
-- CREATE POLICY "articles_admin_write" ON articles FOR ALL USING (auth.role() = 'authenticated');

-- ── Verifikasi RLS aktif ──────────────────────────────────────
-- Jalankan query ini untuk cek semua tabel sudah punya RLS:
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
