# WTT Theme Extraction
> Diekstrak dari `wtt-reference-styles.css` (37.681 baris, 729 KB)
> Rekonstruksi berbasis analisis kode — markup HTML asli tidak tersedia.

---

## 1. Custom Properties `:root` (Baris 3–81)

### Layer / Surface
- `--layer-0: #ffffff`
- `--layer-1: #f4f4f4`
- `--layer-2: #eaeaea`
- `--text-color: #333333`
- `--text-color-secondary: #848484`

### WTT Tema Utama
- `--c-theme-color: #FF6B00` ← **WARNA TEMA UTAMA (oranye)**
- `--c-theme-colors: #ff4224`
- `--c-theme-color-darker: #e76922`
- `--c-theme-gradient: linear-gradient(90deg, #f37822 0%, #d45022 45%, #e6342d 100%)`
- `--c-theme-gradient-alt: linear-gradient(45deg, #e6342d 0%, #d45022 45%, #f37822 100%)`
- `--c-theme-blue-gradient: linear-gradient(90deg, #0a9ab3 0%, #3298b3 45%, #022e6d 100%)`
- `--c-theme-glow-blue: #2babd2`
- `--c-theme-red-color: #d01717`
- `--c-theme-red-color-2: #ef2020`
- `--c-theme-green-color: #088423`
- `--c-theme-yellow: #858e38`
- `--c-row-highlight-color: rgba(232, 105, 34, 0.18)`

### Border & Shadow
- `--c-common-border-rounded-radius: 2px`
- `--c-common-border-rounded-radius-mid: 5px`
- `--c-common-border-rounded-radius-large: 10px`
- `--c-common-box-shadow: 0 0 40px #efeded`

### Teams Theme (hijau / merah)
- `--c-teams-theme-color: #409a32`
- `--c-teams-theme-gradient-color: linear-gradient(180deg, #409a36 0%, #00923f 45%, #065748 100%)`
- `--c-teams-red-theme-gradient: #DE2726`
- `--teams-theme-border-color: #409a32`
- `--teams-red-theme-border-color: #DE2726`

### Event / Modal
- `--event-default-bg-color: #000`
- `--event-modal-bg-color: #222`
- `--teams-sections-bg-color: rgb(0 0 0 / 65%)`
- `--teams-event-card-text-color: #ffc107`
- `--teams-bracket-default-item-bg: #fff`
- `--teams-theme-score-color: #858383`

### Tier Theme
- `--c-tier-theme-color: #db4526`
- `--c-tier-theme-color-match-card: #db4526`
- `--c-tier-theme-color-header-score-card: #e76922`

### Breakpoints
- xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px

---

## 2. @font-face Bio Sans (FONT UTAMA WTT, baris 33950–34044)

Source: `https://documentstore.ittf.com/websitefiles/assets/font/biosans/`

| Weight | Style | File |
|--------|-------|------|
| 200 | normal | BioSans-ExtraLight.woff2 |
| 200 | italic | BioSans-ExtraLightItalic.woff2 |
| 300 | normal | BioSans-Light.woff2 |
| 300 | italic | BioSans-LightItalic.woff2 |
| 400 | normal | BioSans-Regular.woff2 |
| 400 | italic | BioSans-Italic.woff2 |
| 600 | normal | BioSans-SemiBold.woff2 |
| 600 | italic | BioSans-SemiBoldItalic.woff2 |
| 700 | normal | BioSans-Bold.woff2 |
| 700 | italic | BioSans-BoldItalic.woff2 |
| 800 | normal | BioSans-ExtraBold.woff2 |
| 800 | italic | BioSans-ExtraBoldItalic.woff2 |

---

## 3. body/html FINAL (baris 34046–34066) — paling bawah = menang cascade

```
body, html {
  font-family: "Bio Sans", sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: .2px;
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;
  overflow-x: initial;
}
body {
  background-color: #000;   /* GELAP/HITAM */
  margin: 0;
  overflow-x: hidden;
}
```

---

## 4. Navbar Classes

| Class | Deskripsi |
|-------|-----------|
| `.wtt_menulist` | Nav desktop container (baris 35243) |
| `.wtt_menulist ul li a` | Link nav |
| `.wtt_menulist .active_header` | State aktif |
| `.wtt_mobile_menu_list` | Nav mobile (baris 35753) |
| `.wtt_mobile_menu_list.show_menu` | Menu terbuka |
| `.wtt_mobile_menu_list.hide_menu` | Menu tersembunyi |

---

## 5. Footer Classes

> Tidak ada class `.wtt_footer` eksplisit — hanya `footer` element Bootstrap (baris 18870).
> Layout footer merupakan **estimasi** dari konteks navigasi.

---

## 6. Bracket / Draw Classes

| Class | Deskripsi |
|-------|-----------|
| `.bracket_span` | Container bracket (popover min-width 500px) |
| `.dark_bracket_span` | Varian dark bracket |
| `.game_bracket_highlighter` | Wrapper highlight bracket |
| `.game_bracket_highlighter .show_full_score_col` | Kolom skor penuh (flex 15%) |
| `.progression_highlight_bracket_item` | Item yang maju babak |
| `.team_country_flag_bracket` | Bendera 12x15px di bracket |
| `.team_country_flag_match_card_2` | Bendera 12x17px di match card |

---

## 7. Ranking Classes

| Class | Deskripsi |
|-------|-----------|
| `.toprank_person_row` | Baris pemain |
| `.toprank_person_row .rank_holder` | Nomor rank |
| `.toprank_person_row .points_holder` | Poin |
| `.toprank_person_row .name_holder` | Nama |
| `.top_rank_card_holder` | Card holder |
| `.ranking_last_updated_text` | Teks update terakhir |
| `.rankings_container` | Container halaman |

---

## 8. Video / Slick Carousel Classes

| Class | Deskripsi |
|-------|-----------|
| `.slick-slider` | Container (baris 29569) |
| `.slick-slide` | Satu item slide |
| `.slick-dots` | Dot navigasi |
| `.added_live_score_cards` | Live score di carousel home |
| `.front_carousel_image` | Gambar carousel |

---

## 9. Player List Classes

| Class | Deskripsi |
|-------|-----------|
| `.wtt_player_list` | Tabel pemain |
| `.wtt_player_list .country_name` | Nama negara |
| `.wtt_player_list .player_name` | Nama pemain |

---

## 10. Ringkasan Nilai Tema Literal

| Token | Nilai |
|-------|-------|
| Warna utama | `#FF6B00` |
| Gradient utama | `linear-gradient(90deg, #f37822, #d45022, #e6342d)` |
| Background body | `#000` |
| Font utama | `"Bio Sans", sans-serif` |
| Font size dasar | `13px` |
| Border radius kecil | `2px` |
| Border radius mid | `5px` |
| Border radius besar | `10px` |
| Box shadow | `0 0 40px #efeded` |
| Row highlight | `rgba(232, 105, 34, 0.18)` |
| Teams hijau | `#409a32` |
| Match card accent | `#db4526` |
