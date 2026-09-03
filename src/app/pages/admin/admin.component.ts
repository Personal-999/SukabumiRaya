import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NewsService, Article } from '../../services/news.service';
import { VideoService, Video, VIDEO_CATEGORIES } from '../../services/video.service';
import { PlayerService, Player } from '../../services/player.service';
import { SupabaseService } from '../../services/supabase.service';

declare const AOS: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  activeMenu = 'dashboard';
  sidebarOpen = true;

  // Stats cards
  stats = [
    { label: 'Total Pemain',  value: 22, icon: 'fas fa-users',     color: '#f06b25', bg: '#fff5f0', change: '+2' },
    { label: 'Total Acara',   value: 8,  icon: 'fas fa-calendar',  color: '#3b82f6', bg: '#eff6ff', change: '+1' },
    { label: 'Total Match',   value: 47, icon: 'fas fa-trophy',    color: '#10b981', bg: '#ecfdf5', change: '+5' },
    { label: 'Total Berita',  value: 0,  icon: 'fas fa-newspaper', color: '#8b5cf6', bg: '#f5f3ff', change: '+0' },
  ];

  // Recent activity
  activities = [
    { icon: 'fas fa-user-plus',    text: 'Pemain baru ditambahkan', time: '2 jam lalu',  color: '#f06b25', bg: '#fff5f0' },
    { icon: 'fas fa-edit',         text: 'Berita diupdate',         time: '4 jam lalu',  color: '#3b82f6', bg: '#eff6ff' },
    { icon: 'fas fa-calendar-plus',text: 'Acara baru dibuat',       time: '1 hari lalu', color: '#10b981', bg: '#ecfdf5' },
    { icon: 'fas fa-trophy',       text: 'Hasil match diperbarui',  time: '2 hari lalu', color: '#8b5cf6', bg: '#f5f3ff' },
    { icon: 'fas fa-video',        text: 'Video baru diunggah',     time: '3 hari lalu', color: '#ef4444', bg: '#fef2f2' },
  ];

  // ===== NEWS MANAGEMENT =====
  newsArticles: Article[] = [];
  newsFormMode: 'list' | 'create' | 'edit' = 'list';
  editingArticle: Article | null = null;
  deleteConfirmId: number | null = null;

  newsForm = {
    title: '',
    category: '',
    categoryColor: '#f06b25',
    imageUrl: '',
    relatedTo: '',
    relatedFlag: '',
    excerpt: '',
    body: '',
    publishedDate: '',
    author: 'WTT Staff'
  };

  categoryPresets = [
    { label: 'Ticketing', color: '#f06b25' },
    { label: 'Partnerships', color: '#e63946' },
    { label: 'WTT Grand Smash', color: '#1a6fc4' },
    { label: 'WTT Champions', color: '#c0090e' },
    { label: 'WTT Contender', color: '#457b9d' },
    { label: 'WTT Star Contender', color: '#2a9d8f' },
    { label: 'Results', color: '#555' },
    { label: 'Feature', color: '#6c3483' },
  ];

  nextArticleId = 1001;

  constructor(public auth: AuthService, private newsService: NewsService, private videoService: VideoService, private playerService: PlayerService, private supabase: SupabaseService) {}

  ngOnInit() {
    this.loadNews();
    this.loadVideos();
    this.loadPlayers();
    this.loadEvents();
    this.loadPools();
    this.loadMatches();
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 450, easing: 'ease-out-cubic', once: true, offset: 30 });
      }
    }, 50);
  }

  loadNews() {
    this.newsArticles = this.newsService.getAll();
    this.nextArticleId = this.newsService.nextId();
    this.stats[3].value = this.newsArticles.length;
  }

  setMenu(menu: string) {
    this.activeMenu = menu;
    if (menu === 'news') { this.newsFormMode = 'list'; this.loadNews(); }
    if (menu === 'videos') { this.videoFormMode = 'list'; this.loadVideos(); }
    if (menu === 'players') { this.playerFormMode = 'list'; this.loadPlayers(); }
    if (menu === 'events') { this.eventFormMode = 'list'; this.loadEvents(); }
    if (menu === 'pool') { this.poolFormMode = 'list'; this.loadPools(); this.loadEvents(); }
    if (menu === 'matches') { this.matchFormMode = 'list'; this.loadMatches(); this.loadEvents(); }
    // Re-trigger AOS after *ngIf content changes
    setTimeout(() => { if (typeof AOS !== 'undefined') { AOS.refresh(); } }, 100);
  }

  logout() { this.auth.logout(); }

  // --- NEWS CRUD ---
  openCreate() {
    this.newsFormMode = 'create';
    this.editingArticle = null;
    this.newsForm = {
      title: '', category: '', categoryColor: '#f06b25', imageUrl: '',
      relatedTo: '', relatedFlag: '', excerpt: '', body: '',
      publishedDate: 'Baru saja', author: 'WTT Staff'
    };
    this.nextArticleId = this.newsService.nextId();
  }

  openEdit(article: Article) {
    this.newsFormMode = 'edit';
    this.editingArticle = article;
    this.newsForm = {
      title: article.title, category: article.category,
      categoryColor: article.categoryColor, imageUrl: article.imageUrl,
      relatedTo: article.relatedTo || '', relatedFlag: article.relatedFlag || '',
      excerpt: article.excerpt, body: article.body || '',
      publishedDate: article.publishedDate, author: article.author || 'WTT Staff'
    };
  }

  saveArticle() {
    if (!this.newsForm.title.trim() || !this.newsForm.category.trim()) { return; }
    const data = {
      title: this.newsForm.title.trim(),
      category: this.newsForm.category.trim(),
      categoryColor: this.newsForm.categoryColor,
      imageUrl: this.newsForm.imageUrl.trim() || 'assets/images/STT V1.png',
      relatedTo: this.newsForm.relatedTo.trim() || undefined,
      relatedFlag: this.newsForm.relatedFlag.trim() || undefined,
      excerpt: this.newsForm.excerpt.trim(),
      body: this.newsForm.body.trim() || `<p>${this.newsForm.excerpt.trim()}</p>`,
      publishedDate: this.newsForm.publishedDate || 'Baru saja',
      author: this.newsForm.author || 'Admin',
      favourite: false
    };
    if (this.newsFormMode === 'create') {
      this.newsService.create(data);
    } else if (this.newsFormMode === 'edit' && this.editingArticle) {
      this.newsService.update(this.editingArticle.id, data);
    }
    this.newsFormMode = 'list';
    this.loadNews();
  }

  confirmDelete(id: number) { this.deleteConfirmId = id; }

  deleteArticle(id: number) {
    this.newsService.delete(id);
    this.deleteConfirmId = null;
    this.loadNews();
  }

  cancelDelete() { this.deleteConfirmId = null; }

  applyPreset(preset: { label: string; color: string }) {
    this.newsForm.category = preset.label;
    this.newsForm.categoryColor = preset.color;
  }

  getArticleUrl(id: number) { return '/description?artId=' + id; }

  // ===== VIDEO MANAGEMENT =====
  videoList: Video[] = [];
  videoFormMode: 'list' | 'create' | 'edit' = 'list';
  editingVideo: Video | null = null;
  deleteVideoConfirmId: number | null = null;
  nextVideoId = 2001;
  videoCategories = VIDEO_CATEGORIES;

  videoForm = {
    title: '', description: '', youtubeUrl: '', youtubeId: '',
    thumb: '', duration: '', daysAgo: 'Baru saja', categoryId: 22, categoryName: 'COMPILATIONS'
  };

  loadVideos() {
    this.videoList = this.videoService.getAll();
    this.nextVideoId = this.videoService.nextId();
    this.stats[2].value = this.videoList.length;
  }

  openVideoCreate() {
    this.videoFormMode = 'create';
    this.editingVideo = null;
    this.nextVideoId = this.videoService.nextId();
    this.videoForm = { title: '', description: '', youtubeUrl: '', youtubeId: '', thumb: '', duration: '', daysAgo: 'Baru saja', categoryId: 22, categoryName: 'COMPILATIONS' };
  }

  openVideoEdit(v: Video) {
    this.videoFormMode = 'edit';
    this.editingVideo = v;
    this.videoForm = { title: v.title, description: v.description || '', youtubeUrl: v.youtubeUrl, youtubeId: v.youtubeId, thumb: v.thumb, duration: v.duration, daysAgo: v.daysAgo, categoryId: v.categoryId, categoryName: v.categoryName };
  }

  onYoutubeUrlChange() {
    this.videoForm.youtubeId = this.videoService.extractYouTubeId(this.videoForm.youtubeUrl);
    if (!this.videoForm.thumb && this.videoForm.youtubeId) {
      this.videoForm.thumb = '';
    }
  }

  onVideoCatChange() {
    const cat = VIDEO_CATEGORIES.find(c => c.id === +this.videoForm.categoryId);
    if (cat) { this.videoForm.categoryName = cat.name; }
  }

  saveVideo() {
    if (!this.videoForm.title.trim()) { return; }
    const youtubeId = this.videoService.extractYouTubeId(this.videoForm.youtubeUrl);
    const data: Omit<Video, 'id'> = {
      title: this.videoForm.title.trim(),
      description: this.videoForm.description.trim(),
      youtubeUrl: this.videoForm.youtubeUrl.trim(),
      youtubeId,
      thumb: this.videoForm.thumb.trim(),
      duration: this.videoForm.duration || '0:00',
      daysAgo: this.videoForm.daysAgo || 'Baru saja',
      categoryId: +this.videoForm.categoryId,
      categoryName: this.videoForm.categoryName,
      favourite: false
    };
    if (this.videoFormMode === 'create') { this.videoService.create(data); }
    else if (this.videoFormMode === 'edit' && this.editingVideo) { this.videoService.update(this.editingVideo.id, data); }
    this.videoFormMode = 'list';
    this.loadVideos();
  }

  confirmVideoDelete(id: number) { this.deleteVideoConfirmId = id; }
  deleteVideo(id: number) { this.videoService.delete(id); this.deleteVideoConfirmId = null; this.loadVideos(); }
  cancelVideoDelete() { this.deleteVideoConfirmId = null; }

  getVideoThumb(v: Video): string {
    if (v.thumb) { return v.thumb; }
    if (v.youtubeId) { return 'https://img.youtube.com/vi/' + v.youtubeId + '/hqdefault.jpg'; }
    return 'assets/images/STT V1.png';
  }

  getCatColor(categoryId: number): string {
    const map: Record<number, string> = { 22: '#f06b25', 23: '#1a6fc4', 24: '#2a9d8f' };
    return map[categoryId] || '#555';
  }

  // ===== PLAYER MANAGEMENT =====
  playerList: Player[] = [];
  playerFormMode: 'list' | 'create' | 'edit' = 'list';
  editingPlayer: Player | null = null;
  deletePlayerConfirmId: number | null = null;
  nextPlayerId = 121001;
  readonly DEFAULT_PLAYER_PHOTO = 'https://wttwebcmsprod.blob.core.windows.net/websitefiles/images/general/men_default_left.png';

  playerForm = {
    fullName: '', ptm: '',
    gender: 'M' as 'M' | 'F', age: 20, divisi: 'A' as 'A'|'B'|'C'|'D',
    playingStyle: 'Right Hand', biography: '', imgUrl: ''
  };

  loadPlayers() {
    this.supabase.getPlayers().then(({ data, error }: any) => {
      if (error) { console.error('loadPlayers error', error); return; }
      this.playerList = (data || []).map((p: any) => ({
        id: p.id,
        fullName: p.full_name || '',
        firstName: '', lastName: '',
        ptm: p.ptm || '',
        gender: 'M', age: 0, divisi: 'A',
        playingStyle: '', biography: '', imgUrl: '',
        country: 'Indonesia', countryCode: 'id',
        rank: 0, winRate: 0, favourites: 0
      }));
      this.stats[0].value = this.playerList.length;
    });
  }

  openPlayerCreate() {
    this.playerFormMode = 'create';
    this.editingPlayer = null;
    this.playerForm = { fullName: '', ptm: '', gender: 'M', age: 20, divisi: 'A', playingStyle: 'Right Hand', biography: '', imgUrl: '' };
  }

  openPlayerEdit(p: Player) {
    this.playerFormMode = 'edit';
    this.editingPlayer = p;
    this.playerForm = { fullName: p.fullName || (p.lastName + ' ' + p.firstName), ptm: p.ptm || '', gender: p.gender, age: p.age, divisi: p.divisi, playingStyle: p.playingStyle, biography: p.biography, imgUrl: p.imgUrl || '' };
  }

  savePlayer() {
    const name = (this.playerForm as any).fullName ? (this.playerForm as any).fullName.trim() : '';
    if (!name) { alert('Nama pemain tidak boleh kosong!'); return; }
    const dbData: any = {
      full_name: name,
      ptm: (this.playerForm.ptm || '').trim()
    };
    if (this.playerFormMode === 'create') {
      this.supabase.insertPlayer(dbData).then(({ error }: any) => {
        if (error) { alert('Gagal simpan: ' + error.message); return; }
        this.playerFormMode = 'list'; this.loadPlayers();
      });
    } else if (this.playerFormMode === 'edit' && this.editingPlayer) {
      this.supabase.updatePlayer(String(this.editingPlayer.id), dbData).then(({ error }: any) => {
        if (error) { alert('Gagal update: ' + error.message); return; }
        this.playerFormMode = 'list'; this.loadPlayers();
      });
    }
  }


  confirmPlayerDelete(id: any) { this.deletePlayerConfirmId = id; }
  deletePlayer(id: any) {
    this.supabase.deletePlayer(id).then(() => { this.deletePlayerConfirmId = null; this.loadPlayers(); });
  }
  cancelPlayerDelete() { this.deletePlayerConfirmId = null; }

  clearAllPlayers() {
    if (confirm('HAPUS SEMUA PEMAIN?\n\nSemua data pemain akan dihapus permanen dan tidak bisa dikembalikan!')) {
      this.supabase.deleteAllPlayers().then(() => this.loadPlayers());
    }
  }

  deletePlayerDirect(p: any) {
    const name = (p.fullName || ((p.lastName || '') + ' ' + (p.firstName || '')) || 'pemain ini').trim() || 'pemain ini';
    if (!confirm('Hapus "' + name + '"?\n\nData pemain akan dihapus permanen.')) { return; }
    this.supabase.deletePlayer(p.id).then(() => this.loadPlayers());
  }

  getPlayerPhoto(p: any): string {
    if (!p) { return this.DEFAULT_PLAYER_PHOTO; }
    if (p.imgUrl) { return p.imgUrl; }
    if (p.gender === 'F') {
      return 'https://wttwebcmsprod.blob.core.windows.net/websitefiles/images/general/women_default_left.png';
    }
    return this.DEFAULT_PLAYER_PHOTO;
  }

  getPlayerUrl(id: any): string { return '/playerDescription?playerId=' + id; }
  getGenderLabel(g: string): string { return g === 'F' ? 'Perempuan' : 'Laki-laki'; }
  getFlagUrl(code: string): string { return 'https://flagcdn.com/16x12/' + (code || 'xx').toLowerCase() + '.png'; }
  getDivisiColor(d: string): string { const m: any = { A: '#f06b25', B: '#1a6fc4', C: '#9b59b6', D: '#2ecc71' }; return m[d] || '#888'; }


  // ========== POOL MANAGEMENT ==========
  poolFormMode: 'list' | 'edit' = 'list';
  selectedPoolAdminEvent = '';
  editingPoolIndex: number | null = null;
  readonly POOL_STORAGE_KEY = 'wtt_pools_v1';
  adminPools: any[] = [];
  poolForm: any = null;

  get poolAdminEvents(): string[] {
    if (this.eventList && this.eventList.length) {
      return this.eventList.map((e: any) => e.name);
    }
    return [];
  }

  /** Categories from the currently selected event in poolForm */
  get poolCabangOptions(): string[] {
    if (!this.poolForm || !this.poolForm.event) { return []; }
    const ev = this.eventList.find((e: any) => e.name === this.poolForm.event);
    if (!ev || !ev.categories || !ev.categories.length) { return []; }
    return ev.categories;
  }

  /** When event changes in pool form, auto-select first cabang */
  onPoolEventChange() {
    const opts = this.poolCabangOptions;
    if (opts.length) {
      this.poolForm.cabang = opts[0];
    } else {
      this.poolForm.cabang = '';
    }
  }

  async loadPools() {
    try {
      const { data } = await this.supabase.getPools();
      this.adminPools = (data || []).map((p: any) => ({
        id: p.id, event: p.event_name, name: p.name,
        cabang: p.cabang || '',
        schedule: p.schedule || [],
        teams: (p.teams || []).map((t: any) => ({
          ...t, playerSearch: t.player || '', showDropdown: false
        }))
      }));
    } catch { this.adminPools = []; }
  }

  savePoolsToStorage() { /* replaced by Supabase */ }

  get filteredAdminPools() {
    if (!this.selectedPoolAdminEvent) { return []; }
    return this.adminPools.filter((p: any) => p.event === this.selectedPoolAdminEvent);
  }

  poolSearchQuery = '';
  selectedPoolAdminCabang = ''; // '' = semua cabang

  /** Cabang options from selected event */
  get poolListCabangOptions(): string[] {
    if (!this.selectedPoolAdminEvent) { return []; }
    const ev = this.eventList.find((e: any) => e.name === this.selectedPoolAdminEvent);
    if (!ev || !ev.categories || !ev.categories.length) { return []; }
    return ev.categories;
  }

  get filteredSearchPools(): any[] {
    let pools = this.filteredAdminPools;
    // Filter by cabang
    if (this.selectedPoolAdminCabang) {
      pools = pools.filter((pool: any) => (pool.cabang || '') === this.selectedPoolAdminCabang);
    }
    const q = (this.poolSearchQuery || '').toLowerCase().trim();
    if (!q) { return pools; }
    return pools.filter((pool: any) => {
      if ((pool.name || '').toLowerCase().includes(q)) { return true; }
      if ((pool.cabang || '').toLowerCase().includes(q)) { return true; }
      if (pool.teams && pool.teams.some((t: any) =>
        (t.player || '').toLowerCase().includes(q) || (t.ptm || '').toLowerCase().includes(q)
      )) { return true; }
      return false;
    });
  }

  getPoolRealIndex(pool: any): number { return this.filteredAdminPools.indexOf(pool); }

  openPoolEdit(idx: number) {
    const pool = this.filteredAdminPools[idx];
    this.editingPoolIndex = idx;
    this.poolForm = JSON.parse(JSON.stringify(pool));
    this.poolFormMode = 'edit';
  }

  openPoolCreate() {
    const teamCount = 3;
    const teams = Array.from({length: teamCount}, (_, i) => ({
      no: i + 1, player: '', ptm: '', menang: 0, kalah: 0, nilai: 0, urt: i + 1,
      playerSearch: '', showDropdown: false,
      results: Array.from({length: teamCount}, (_2, j) => i === j ? null : 0)
    }));
    const perms: string[] = [];
    for (let a = 1; a <= teamCount; a++) { for (let b = a + 1; b <= teamCount; b++) { perms.push(a + ' VS ' + b); } }
    // Auto-set cabang from event categories
    const ev = this.eventList.find((e: any) => e.name === this.selectedPoolAdminEvent);
    const autoCabang = (ev && ev.categories && ev.categories.length) ? ev.categories[0] : '';
    this.poolForm = {
      event: this.selectedPoolAdminEvent, name: 'POOL ' + (this.filteredAdminPools.length + 1),
      cabang: autoCabang, teams, schedule: perms.map((vs, i) => ({ hari: '', jam: '', m: i + 1, acara: vs }))
    };
    this.editingPoolIndex = null;
    this.poolFormMode = 'edit';
  }

  addPoolTeam() {
    const n = this.poolForm.teams.length + 1;
    this.poolForm.teams.forEach((t: any) => t.results.push(0));
    const results = this.poolForm.teams.map((_: any, i: number) => i === n - 1 ? null : 0);
    results.push(null);
    this.poolForm.teams.push({ no: n, player: '', ptm: '', menang: 0, kalah: 0, nilai: 0, urt: n, playerSearch: '', showDropdown: false, results });
    this.rebuildSchedule();
  }

  /** Auto-fill PTM when a player is selected from dropdown */
  /** Filter playerList based on search string (name or PTM) */
  getFilteredPoolPlayers(search: string): any[] {
    const q = (search || '').toLowerCase().trim();
    if (!q) { return this.playerList.slice(0, 30); }
    return this.playerList.filter((p: any) => {
      const name = (p.fullName || ((p.lastName || '') + ' ' + (p.firstName || '')).trim()).toLowerCase();
      const ptm = (p.ptm || '').toLowerCase();
      return name.includes(q) || ptm.includes(q);
    }).slice(0, 20);
  }

  /** Select a player from searchable dropdown */
  selectPoolPlayer(t: any, player: any) {
    const name = (player.fullName || ((player.lastName || '') + ' ' + (player.firstName || '')).trim()).trim();
    t.player = name;
    t.playerSearch = name;
    t.ptm = player.ptm || '';
    t.showDropdown = false;
  }

  /** Clear a player slot */
  clearPoolPlayer(t: any) {
    t.player = ''; t.playerSearch = ''; t.ptm = ''; t.showDropdown = false;
  }

  /** Dropdown position (position:fixed so it escapes table overflow clipping) */
  poolDropdownPos = { top: 0, left: 0, width: 200 };

  /** Open dropdown and calculate fixed position from input element */
  openPoolDropdown(t: any, event: Event) {
    t.showDropdown = true;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.poolDropdownPos = { top: rect.bottom + 2, left: rect.left, width: rect.width };
  }

  /** Close dropdown with small delay (so item click registers first) */
  closePoolDropdown(t: any) {
    setTimeout(() => { t.showDropdown = false; }, 200);
  }

  removePoolTeam(idx: number) {
    if (this.poolForm.teams.length <= 1) { return; }
    this.poolForm.teams.splice(idx, 1);
    this.poolForm.teams.forEach((t: any, i: number) => { t.no = i + 1; t.results.splice(idx, 1); });
    this.rebuildSchedule();
  }

  rebuildSchedule() {
    const n = this.poolForm.teams.length; const perms: string[] = [];
    for (let a = 1; a <= n; a++) { for (let b = a + 1; b <= n; b++) { perms.push(a + ' VS ' + b); } }
    this.poolForm.schedule = perms.map((vs, i) => ({ hari: '', jam: '', m: i + 1, acara: vs }));
  }

  async savePool() {
    const payload = {
      event_name: this.poolForm.event, name: this.poolForm.name,
      cabang: this.poolForm.cabang || '', teams: this.poolForm.teams || [],
      schedule: this.poolForm.schedule || []
    };
    let result: any;
    if (this.poolForm.id) {
      result = await this.supabase.updatePool(String(this.poolForm.id), payload);
    } else {
      result = await this.supabase.insertPool(payload);
    }
    if (result && result.error) {
      alert('Gagal simpan pool: ' + (result.error.message || JSON.stringify(result.error)) +
            '\n\nPastikan sudah menjalankan supabase-pools.sql di Supabase SQL Editor!');
      return;
    }
    await this.loadPools();
    this.poolFormMode = 'list';
    this.poolForm = null;
  }

  async deletePool(idx: number) {
    const pool = this.filteredAdminPools[idx];
    if (!pool) { return; }
    if (!confirm('Hapus pool "' + pool.name + '"?')) { return; }
    if (pool.id) {
      const result = await this.supabase.deletePool(String(pool.id));
      if (result && result.error) {
        alert('Gagal hapus pool: ' + (result.error.message || JSON.stringify(result.error)));
        return;
      }
    }
    await this.loadPools();
  }

  addPoolScheduleRow() {
    const last = this.poolForm.schedule[this.poolForm.schedule.length-1];
    this.poolForm.schedule.push({ hari: '', jam: '', m: last ? last.m+1 : 1, acara: '' });
  }

  removePoolScheduleRow(i: number) { this.poolForm.schedule.splice(i, 1); }


  // ========== EVENT MANAGEMENT (Full SttEvent fields) ==========
  eventFormMode: 'list' | 'edit' | 'create' = 'list';
  editingEventId: number | null = null;
  readonly EVENT_STORAGE_KEY = 'wtt_events_v2';
  eventList: any[] = [];

  tierOptions = [
    { value: 'open-a',  label: 'Open A',  color: '#9c27b0' },
    { value: 'open-b',  label: 'Open B',  color: '#2196f3' },
    { value: 'taruna',  label: 'Taruna',  color: '#ff9800' },
    { value: 'junior',  label: 'Junior',  color: '#4caf50' },
    { value: 'veteran', label: 'Veteran', color: '#607d8b' },
    { value: 'open-c',  label: 'Open C',  color: '#e91e63' },
    { value: 'beregu',  label: 'Beregu',  color: '#795548' },
  ];

  cabangOptions = ['Men\'s Singles','Women\'s Singles','Men\'s Doubles','Women\'s Doubles','Mixed Doubles','Men\'s Team','Women\'s Team'];

  eventForm: any = {
    id: null, name: '', tier: 'open-a', tierColor: '#9c27b0', tierLabel: 'Open A',
    dateStart: '', dateEnd: '', dateLabel: '',
    venue: '', location: 'Sukabumi, Jawa Barat',
    prizeMoney: '', imageUrl: '', categories: [], completed: false,
    championsMs: '', championsWs: '', deskripsi: ''
  };

  async loadEvents() {
    try {
      const { data } = await this.supabase.getEvents();
      this.eventList = (data || []).map((e: any) => {
        const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
        let dateLabel = '';
        if (e.date_start && e.date_end) {
          try {
            const s = new Date(e.date_start); const en = new Date(e.date_end);
            dateLabel = s.getDate()+' '+months[s.getMonth()]+' - '+en.getDate()+' '+months[en.getMonth()]+' '+en.getFullYear();
          } catch {}
        }
        return {
          id: e.id, name: e.name || '',
          dateStart: e.date_start || '', dateEnd: e.date_end || '',
          dateLabel: dateLabel,
          venue: e.venue || '', location: e.city || 'Sukabumi, Jawa Barat',
          imageUrl: e.banner_url || '', deskripsi: e.description || '',
          tier: e.tier || 'open-a', tierColor: e.tier_color || '#9c27b0',
          tierLabel: e.tier_label || 'Open A',
          prizeMoney: e.prize_money || '',
          categories: e.categories || [],
          completed: e.completed || false,
          championsMs: e.champions_ms || '', championsWs: e.champions_ws || '',
        };
      });
    } catch { this.eventList = []; }
  }

  getDefaultEvents(): any[] { return []; }

  saveEventsToStorage() { /* replaced by Supabase */ }

  openEventCreate() {
    this.eventForm = { id: Date.now(), name: '', tier: 'open-a', tierColor: '#9c27b0', tierLabel: 'Open A', dateStart: '', dateEnd: '', dateLabel: '', venue: '', location: 'Sukabumi, Jawa Barat', prizeMoney: '', imageUrl: '', categories: [], completed: false, championsMs: '', championsWs: '', deskripsi: '' };
    this.editingEventId = null;
    this.eventFormMode = 'create';
  }

  openEventEdit(idx: number) {
    this.eventForm = JSON.parse(JSON.stringify(this.eventList[idx]));
    if (!this.eventForm.categories) this.eventForm.categories = [];
    this.editingEventId = this.eventList[idx].id;
    this.eventFormMode = 'edit';
  }

  onTierChange() {
    const found = this.tierOptions.find((t:any) => t.value === this.eventForm.tier);
    if (found) { this.eventForm.tierColor = found.color; this.eventForm.tierLabel = found.label; }
  }

  async saveEvent() {
    if (this.eventForm.dateStart && this.eventForm.dateEnd) {
      const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
      const s = new Date(this.eventForm.dateStart); const e = new Date(this.eventForm.dateEnd);
      this.eventForm.dateLabel = s.getDate()+' '+months[s.getMonth()]+' - '+e.getDate()+' '+months[e.getMonth()]+' '+e.getFullYear();
    }
    const payload: any = {
      name: this.eventForm.name, date_start: this.eventForm.dateStart, date_end: this.eventForm.dateEnd,
      venue: this.eventForm.venue, city: this.eventForm.location,
      banner_url: this.eventForm.imageUrl, description: this.eventForm.deskripsi,
      tier: this.eventForm.tier, tier_color: this.eventForm.tierColor, tier_label: this.eventForm.tierLabel,
      prize_money: this.eventForm.prizeMoney,
      categories: this.eventForm.categories || [],
      completed: this.eventForm.completed || false,
      champions_ms: this.eventForm.championsMs || '', champions_ws: this.eventForm.championsWs || '',
    };
    let result: any;
    if (this.editingEventId !== null) {
      result = await this.supabase.updateEvent(String(this.editingEventId), payload);
    } else {
      result = await this.supabase.insertEvent(payload);
    }
    if (result && result.error) {
      console.error('Supabase saveEvent error:', result.error);
      alert('Gagal simpan: ' + (result.error.message || JSON.stringify(result.error)) +
            '\n\nPastikan sudah menjalankan supabase-alter.sql di Supabase SQL Editor!');
      return;
    }
    await this.loadEvents();
    this.eventFormMode = 'list';
  }

  async deleteEvent(idx: number) {
    const ev = this.eventList[idx];
    if (!ev) { alert('Event tidak ditemukan!'); return; }
    if (!ev.id) {
      if (confirm('Hapus "' + ev.name + '"?')) { this.eventList.splice(idx, 1); }
      return;
    }
    if (!confirm('Hapus acara "' + ev.name + '"?\n\nSemua pertandingan terkait juga akan dihapus.')) { return; }
    // Cascade: hapus semua matches + brackets milik event ini dulu
    if (ev.name) {
      await this.supabase.deleteMatchesByEvent(ev.name);
      await this.supabase.deleteBracketsByEvent(ev.name);
    }
    const result: any = await this.supabase.deleteEvent(String(ev.id));
    if (result && result.error) {
      alert('GAGAL HAPUS ACARA\n\nError: ' + (result.error.message || JSON.stringify(result.error)) +
            '\n\nJalankan supabase-fix-perms.sql di Supabase SQL Editor!');
      return;
    }
    const { data: check } = await this.supabase.getEvents();
    const stillExists = (check || []).some((e: any) => e.id === ev.id);
    if (stillExists) {
      alert('Hapus GAGAL DIAM-DIAM.\n\nJalankan supabase-fix-perms.sql di Supabase SQL Editor lalu coba lagi!');
      return;
    }
    await this.loadEvents();
    await this.loadMatches();
  }


  toggleCabang(cabang: string) {
    if (!this.eventForm.categories) this.eventForm.categories = [];
    const idx = this.eventForm.categories.indexOf(cabang);
    if (idx === -1) { this.eventForm.categories.push(cabang); } else { this.eventForm.categories.splice(idx, 1); }
  }

  isCabangSelected(cabang: string): boolean { return this.eventForm.categories && this.eventForm.categories.includes(cabang); }

  eventStatusLabel(e: any): string { return e.completed ? 'Selesai' : new Date(e.dateStart) > new Date() ? 'Akan Datang' : 'Berlangsung'; }
  eventStatusColor(e: any): string { return e.completed ? '#7e8299' : new Date(e.dateStart) > new Date() ? '#f06b25' : '#27ae60'; }

  // ===== MATCH MANAGEMENT =====
  private readonly MATCH_STORAGE_KEY = 'wtt_matches_v1';
  matchList: any[] = [];
  matchFormMode: 'list' | 'create' | 'edit' = 'list';
  editingMatchIndex: number | null = null;
  selectedMatchEvent = '';

  // Dynamic: only show cabang that are configured for the selected event
  get subEventOptions(): string[] {
    const ALL = ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles", "Men's Team", "Women's Team"];
    if (!this.matchForm || !this.matchForm.event) { return ALL; }
    const ev = this.eventList.find((e: any) => e.name === this.matchForm.event);
    if (!ev || !ev.categories || !ev.categories.length) { return ALL; }
    return ev.categories;
  }

  roundOptions = ['Round 1', 'Round 2', 'Round 3', 'Quarter Final', 'Semi Final', 'Final', 'Group Stage', 'Pool'];
  statusOptions = ['scheduled', 'live', 'completed'];
  drawGroupOptions = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', '-'];

  matchForm: any = {};

  get matchAdminEvents(): string[] {
    return this.eventList.map((e: any) => e.name).filter(Boolean);
  }

  get filteredAdminMatches(): any[] {
    if (!this.selectedMatchEvent) return this.matchList;
    return this.matchList.filter((m: any) => m.event === this.selectedMatchEvent);
  }

  async loadMatches() {
    try {
      const { data } = await this.supabase.getMatches();
      this.matchList = (data || []).map((m: any) => ({
        ...m,
        subEvent: m.sub_event, table: m.table_no,
        scoreA: m.score_a, scoreB: m.score_b,
        playerA: Array.isArray(m.player_a) ? m.player_a : [],
        playerB: Array.isArray(m.player_b) ? m.player_b : [],
        scheduledTime: m.scheduled_time, drawGroup: m.draw_group,
      }));
    } catch { this.matchList = []; }
  }

  saveMatchesToStorage() { /* replaced by Supabase */ }

  resetMatchForm() {
    this.matchForm = {
      id: null,
      event: this.selectedMatchEvent || '',
      subEvent: this.subEventOptions[0] || "Men's Singles",
      round: 'Round 1',
      drawGroup: '-',
      status: 'scheduled',
      tanggal: '',
      jam: '',
      venue: '',
      table: '',
      // Player A
      playerA1Name: '', playerA1PTM: '',
      playerA2Name: '', playerA2PTM: '',
      // Player B
      playerB1Name: '', playerB1PTM: '',
      playerB2Name: '', playerB2PTM: '',
      // Scores (if completed)
      scoreA: 0, scoreB: 0,
      setsA: '', setsB: '',
    };
  }

  openMatchCreate() {
    this.resetMatchForm();
    this.matchForm.event = this.selectedMatchEvent || '';
    this.editingMatchIndex = null;
    this.matchFormMode = 'create';
  }

  openMatchEdit(idx: number) {
    const m = this.filteredAdminMatches[idx];
    const realIdx = this.matchList.indexOf(m);
    this.editingMatchIndex = realIdx;
    this.matchForm = {
      ...m,
      playerA1Name: (m.playerA && m.playerA[0]) ? m.playerA[0].name : '',
      playerA1PTM:  (m.playerA && m.playerA[0]) ? m.playerA[0].ptm : '',
      playerA2Name: (m.playerA && m.playerA[1]) ? m.playerA[1].name : '',
      playerA2PTM:  (m.playerA && m.playerA[1]) ? m.playerA[1].ptm : '',
      playerB1Name: (m.playerB && m.playerB[0]) ? m.playerB[0].name : '',
      playerB1PTM:  (m.playerB && m.playerB[0]) ? m.playerB[0].ptm : '',
      playerB2Name: (m.playerB && m.playerB[1]) ? m.playerB[1].name : '',
      playerB2PTM:  (m.playerB && m.playerB[1]) ? m.playerB[1].ptm : '',
    };
    this.matchFormMode = 'edit';
  }

  async saveMatch() {
    const isDoubles = (this.matchForm.subEvent && this.matchForm.subEvent.includes('Doubles')) || (this.matchForm.subEvent && this.matchForm.subEvent.includes('Team'));
    const playerA: any[] = [{ name: this.matchForm.playerA1Name, ptm: this.matchForm.playerA1PTM, sets: [] }];
    const playerB: any[] = [{ name: this.matchForm.playerB1Name, ptm: this.matchForm.playerB1PTM, sets: [] }];
    if (isDoubles) {
      playerA.push({ name: this.matchForm.playerA2Name, ptm: this.matchForm.playerA2PTM, sets: [] });
      playerB.push({ name: this.matchForm.playerB2Name, ptm: this.matchForm.playerB2PTM, sets: [] });
    }

    const setsA = this.matchForm.setsA ? this.matchForm.setsA.split(',').map((s: string) => parseInt(s.trim())) : [];
    const setsB = this.matchForm.setsB ? this.matchForm.setsB.split(',').map((s: string) => parseInt(s.trim())) : [];
    if (setsA.length) { playerA[0].sets = setsA; }
    if (setsB.length) { playerB[0].sets = setsB; }

    const match = {
      id: this.matchForm.id || Date.now(),
      event: this.matchForm.event,
      subEvent: this.matchForm.subEvent,
      round: this.matchForm.round,
      drawGroup: this.matchForm.drawGroup === '-' ? null : this.matchForm.drawGroup,
      status: this.matchForm.status,
      scheduledTime: this.matchForm.tanggal && this.matchForm.jam
        ? `${this.matchForm.tanggal}T${this.matchForm.jam}`
        : (this.matchForm.tanggal || ''),
      tanggal: this.matchForm.tanggal,
      jam: this.matchForm.jam,
      venue: this.matchForm.venue,
      table: this.matchForm.table,
      playerA,
      playerB,
      scoreA: Number(this.matchForm.scoreA) || 0,
      scoreB: Number(this.matchForm.scoreB) || 0,
    };

    const dbPayload = {
      round: match.round, event: match.event, sub_event: match.subEvent,
      venue: match.venue, table_no: match.table,
      score_a: match.scoreA, score_b: match.scoreB,
      player_a: playerA, player_b: playerB,
      status: match.status, scheduled_time: match.scheduledTime || '',
      draw_group: match.drawGroup || '',
    };
    if (this.editingMatchIndex !== null) {
      const existing = this.filteredAdminMatches[this.editingMatchIndex];
      if (existing && existing.id) {
        await this.supabase.updateMatch(String(existing.id), dbPayload);
      }
    } else {
      await this.supabase.insertMatch(dbPayload);
    }
    await this.loadMatches();
    this.matchFormMode = 'list';
    this.editingMatchIndex = null;
  }

  async deleteMatch(idx: number) {
    const m = this.filteredAdminMatches[idx];
    if (!m) { return; }
    const label = (m.playerA && m.playerA[0] ? m.playerA[0].name : '?') + ' vs ' + (m.playerB && m.playerB[0] ? m.playerB[0].name : '?');
    if (!confirm('Hapus pertandingan\n"' + label + '"?')) { return; }
    if (m.id) {
      const result: any = await this.supabase.deleteMatch(String(m.id));
      if (result && result.error) {
        alert('GAGAL HAPUS PERTANDINGAN\n\nError: ' + (result.error.message || JSON.stringify(result.error)) +
              '\n\nJalankan supabase-fix-perms-v2.sql di Supabase SQL Editor!');
        return;
      }
    }
    await this.loadMatches();
  }

  async clearAllMatches() {
    if (!confirm('HAPUS SEMUA PERTANDINGAN?\n\nSemua ' + this.matchList.length + ' pertandingan akan dihapus permanen!')) { return; }
    let failed = 0;
    for (const m of this.matchList) {
      if (m.id) {
        const result: any = await this.supabase.deleteMatch(String(m.id));
        if (result && result.error) { failed++; }
      }
    }
    if (failed > 0) {
      alert(failed + ' pertandingan gagal dihapus.\n\nJalankan supabase-fix-perms-v2.sql di Supabase SQL Editor!');
    }
    await this.loadMatches();
  }

  isDoublesMatch(): boolean {
    return (this.matchForm.subEvent && this.matchForm.subEvent.includes('Doubles')) || (this.matchForm.subEvent && this.matchForm.subEvent.includes('Team'));
  }

  matchStatusLabel(s: string): string {
    return s === 'completed' ? 'Selesai' : s === 'live' ? 'Live' : 'Terjadwal';
  }
  matchStatusColor(s: string): string {
    return s === 'completed' ? '#7e8299' : s === 'live' ? '#e74c3c' : '#f06b25';
  }

  // ===== BRACKET (BAGAN TURNAMEN) =====
  bracketViewMode: 'bracket' | 'list' = 'bracket';
  bracketEventFilter    = '';
  bracketSubEventFilter = "Men's Singles";
  bracketSizeFilter     = 16;
  bracketData: any[] = [];
  bracketRoundsCache: { label: string; round: number; matches: any[] }[] = [];
  showBracketPanel = false;
  editingBracketMatch: any = null;
  editBMForm: any = {};

  // Dynamic: only show cabang configured for selected bracket event
  get bracketSubEventOptions(): string[] {
    const ALL = ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles", "Men's Team", "Women's Team"];
    if (!this.bracketEventFilter) { return ALL; }
    const ev = this.eventList.find((e: any) => e.name === this.bracketEventFilter);
    if (!ev || !ev.categories || !ev.categories.length) { return ALL; }
    return ev.categories;
  }

  onBracketEventChange() {
    // Auto-select first available cabang for this event
    const opts = this.bracketSubEventOptions;
    if (opts.length && !opts.includes(this.bracketSubEventFilter)) {
      this.bracketSubEventFilter = opts[0];
    }
    this.initOrLoadBracket();
  }

  showSizeConfirm = false;
  pendingSize = 16;
  selectedSizeOption = 16; // tracks dropdown display, separate from applied bracketSizeFilter

  onSizeChange(newSize: number) {
    if (!newSize || newSize === this.bracketSizeFilter) {
      this.selectedSizeOption = this.bracketSizeFilter;
      return;
    }
    this.pendingSize = newSize;
    this.selectedSizeOption = this.bracketSizeFilter; // reset dropdown visually
    this.showSizeConfirm = true;
  }

  async confirmSizeChange() {
    this.bracketSizeFilter  = this.pendingSize;
    this.selectedSizeOption = this.pendingSize;
    this.showSizeConfirm    = false;
    // Changing size always resets the bracket — just build a fresh empty one
    this.createEmptyBracket();
  }

  cancelSizeChange() {
    this.showSizeConfirm = false;
    this.selectedSizeOption = this.bracketSizeFilter;
    this.pendingSize = this.bracketSizeFilter;
  }

  private readonly BRACKET_ROUND_LABELS: any = {
    64: {1:'R64', 2:'R32', 3:'R16', 4:'Quarter Final', 5:'Semi Final', 6:'Final'},
    32: {1:'R32', 2:'R16', 3:'Quarter Final', 4:'Semi Final', 5:'Final'},
    16: {1:'R16', 2:'Quarter Final', 3:'Semi Final', 4:'Final'},
    8:  {1:'Quarter Final', 2:'Semi Final', 3:'Final'},
  };

  /** Call after any bracketData / bracketSizeFilter change — NOT a getter! */
  updateBracketRoundsCache() {
    const sizeMap: any = {
      64: ['ROUND OF 64','ROUND OF 32','ROUND OF 16','Quarter Final','Semi Final','Final'],
      32: ['ROUND OF 32','ROUND OF 16','Quarter Final','Semi Final','Final'],
      16: ['ROUND OF 16','Quarter Final','Semi Final','Final'],
      8:  ['Quarter Final','Semi Final','Final'],
    };
    const labels: string[] = sizeMap[this.bracketSizeFilter] || sizeMap[16];
    this.bracketRoundsCache = labels.map((label: string, ri: number) => ({
      label, round: ri + 1,
      matches: this.bracketData.filter((m: any) => m.round === ri + 1)
    }));
  }

  trackByRound(index: number, r: any): any { return r.round; }
  trackByMatchId(index: number, m: any): any { return m.id; }

  // === DRAWS-STYLE BRACKET POSITIONING (same constants as DrawsComponent) ===
  readonly BRACKET_MATCH_H = 182;
  readonly BRACKET_ROW_H = 38;

  getBracketColumnHeight(): number {
    const firstRound = this.bracketRoundsCache[0];
    const totalSlots = firstRound ? firstRound.matches.length : 1;
    return totalSlots * this.BRACKET_MATCH_H;
  }
  getBracketMatchTop(ri: number, mi: number): number {
    const sectionH = this.BRACKET_MATCH_H * Math.pow(2, ri);
    return mi * sectionH + (sectionH - this.BRACKET_MATCH_H) / 2;
  }
  getBracketConnectorPairs(ri: number): number[] {
    const count = this.bracketRoundsCache[ri] ? this.bracketRoundsCache[ri].matches.length : 0;
    const pairs: number[] = [];
    for (let i = 0; i < count; i += 2) { pairs.push(i); }
    return pairs;
  }
  getBracketConnectorTop(ri: number, evenSlot: number): number {
    return this.getBracketMatchTop(ri, evenSlot) + this.BRACKET_ROW_H;
  }
  getBracketConnectorHeight(ri: number): number {
    return this.BRACKET_MATCH_H * Math.pow(2, ri);
  }

  getBracketKey(): string {
    return 'wtt_bracket_v1_' + this.bracketEventFilter + '_' + this.bracketSubEventFilter + '_' + this.bracketSizeFilter;
  }

  async initOrLoadBracket(autoDetectSize = true) {
    if (!this.bracketEventFilter) { this.bracketData = []; this.bracketRoundsCache = []; return; }
    try {
      // Find bracket by event+cabang to auto-detect stored size (only on initial load)
      const { data: found } = await this.supabase.getBracketByEventCabang(
        this.bracketEventFilter, this.bracketSubEventFilter
      );
      if (found && found.length > 0) {
        const stored = found[0];
        // Auto-restore size from Supabase ONLY if user didn't explicitly pick a size
        if (autoDetectSize && stored.size && stored.size !== this.bracketSizeFilter) {
          this.bracketSizeFilter   = stored.size;
          this.selectedSizeOption  = stored.size;
        }
        if (stored.slots && stored.slots.length > 0) {
          this.bracketData = stored.slots;
          this.updateBracketRoundsCache();
          return;
        }
      }
    } catch {}
    this.createEmptyBracket();
  }

  createEmptyBracket() {
    this.bracketData = [];
    const totalRounds = Math.log2(this.bracketSizeFilter);
    let id = 1;
    for (let r = 1; r <= totalRounds; r++) {
      const count = this.bracketSizeFilter / Math.pow(2, r);
      for (let p = 1; p <= count; p++) {
        this.bracketData.push({
          id: id++, round: r, position: p,
          playerA: { name: '', ptm: '' }, playerB: { name: '', ptm: '' },
          winner: null, scoreA: '', scoreB: '',
          tanggal: '', jam: '', table: '', venue: '', status: 'empty'
        });
      }
    }
    this.updateBracketRoundsCache();
    this.saveBracketToStorage();
  }

  async saveBracketToStorage() {
    if (!this.bracketEventFilter) { return; }
    await this.supabase.upsertBracket(
      this.bracketEventFilter, this.bracketSubEventFilter,
      this.bracketSizeFilter, this.bracketData
    );
  }

  /** No-op: draws now read directly from Supabase brackets table */
  updateDrawsCache() {}

  // === BRACKET PANEL PLAYER SEARCH ===
  bmSearchA = '';
  bmSearchB = '';
  bmShowDropA = false;
  bmShowDropB = false;

  get bmPlayersA(): any[] {
    if (!this.bmSearchA.trim()) { return []; }
    const q = this.bmSearchA.toLowerCase();
    return this.playerList
      .filter((p: any) => p.fullName.toLowerCase().includes(q) || (p.ptm || '').toLowerCase().includes(q))
      .slice(0, 8);
  }

  get bmPlayersB(): any[] {
    if (!this.bmSearchB.trim()) { return []; }
    const q = this.bmSearchB.toLowerCase();
    return this.playerList
      .filter((p: any) => p.fullName.toLowerCase().includes(q) || (p.ptm || '').toLowerCase().includes(q))
      .slice(0, 8);
  }

  selectBracketPlayer(side: 'A' | 'B', player: any) {
    if (side === 'A') {
      this.editBMForm.playerAName = player.fullName;
      this.editBMForm.playerAPTM  = player.ptm || '';
      this.bmSearchA = player.fullName;
      this.bmShowDropA = false;
    } else {
      this.editBMForm.playerBName = player.fullName;
      this.editBMForm.playerBPTM  = player.ptm || '';
      this.bmSearchB = player.fullName;
      this.bmShowDropB = false;
    }
  }

  openBracketEditReset() {
    this.bmSearchA = this.editBMForm.playerAName || '';
    this.bmSearchB = this.editBMForm.playerBName || '';
    this.bmShowDropA = false;
    this.bmShowDropB = false;
  }

  openBracketEdit(match: any) {
    this.editingBracketMatch = match;
    const pA = match.playerA || {};
    const pB = match.playerB || {};
    this.editBMForm = {
      playerAName: pA.name || '', playerAPTM: pA.ptm || '',
      playerBName: pB.name || '', playerBPTM: pB.ptm || '',
      winner: match.winner || '',
      scoreA: match.scoreA || '', scoreB: match.scoreB || '',
      tanggal: match.tanggal || '', jam: match.jam || '',
      table: match.table || '', venue: match.venue || '',
    };
    // Init search boxes with existing player names
    this.bmSearchA = pA.name || '';
    this.bmSearchB = pB.name || '';
    this.bmShowDropA = false;
    this.bmShowDropB = false;
    this.showBracketPanel = true;
  }

  saveBracketEdit() {
    if (!this.editingBracketMatch) { return; }
    const f = this.editBMForm;
    this.editingBracketMatch.playerA = { name: f.playerAName, ptm: f.playerAPTM };
    this.editingBracketMatch.playerB = { name: f.playerBName, ptm: f.playerBPTM };
    this.editingBracketMatch.winner = f.winner || null;
    this.editingBracketMatch.scoreA = f.scoreA;
    this.editingBracketMatch.scoreB = f.scoreB;
    this.editingBracketMatch.tanggal = f.tanggal;
    this.editingBracketMatch.jam = f.jam;
    this.editingBracketMatch.table = f.table;
    this.editingBracketMatch.venue = f.venue;
    this.editingBracketMatch.event = this.bracketEventFilter;
    this.editingBracketMatch.subEvent = this.bracketSubEventFilter;
    const hasPlayers = f.playerAName || f.playerBName;
    this.editingBracketMatch.status = f.winner ? 'completed' : hasPlayers ? 'scheduled' : 'empty';
    this.saveBracketToStorage();
    this.updateBracketRoundsCache();   // <-- update cache
    this.showBracketPanel = false;
    this.editingBracketMatch = null;
  }

  async clearBracket() {
    if (confirm('Reset semua bagan? Semua data akan dihapus.')) {
      await this.supabase.deleteBracket(
        this.bracketEventFilter, this.bracketSubEventFilter, this.bracketSizeFilter
      );
      this.createEmptyBracket();
    }
  }

  getBracketRoundLabel(round: number): string {
    const r = this.bracketRoundsCache[round - 1];
    return r ? r.label : 'Round ' + round;
  }

  getBracketMatchCount(): number { return this.bracketData.filter((m: any) => m.playerA && m.playerA.name).length; }

  /** Generate seed.json from current localStorage data and download it.
   *  User replaces src/assets/seed.json and rebuilds so all browsers see the data. */
  publishData() {
    const seed: any = { _note: 'Generated by Admin Publish.', _version: Date.now() };

    // Core data keys
    const coreKeys = ['wtt_events_v2', 'wtt_matches_v1', 'wtt_draws_cache', 'stt-players-v2'];
    coreKeys.forEach(k => {
      try {
        const raw = localStorage.getItem(k);
        seed[k] = raw ? JSON.parse(raw) : [];
      } catch { seed[k] = []; }
    });

    // Bracket keys
    const bracketKeyList: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('wtt_bracket_v1_') === 0) {
        bracketKeyList.push(k);
        try {
          const raw = localStorage.getItem(k);
          seed[k] = raw ? JSON.parse(raw) : [];
        } catch { seed[k] = []; }
      }
    }
    seed['wtt_bracket_keys'] = bracketKeyList;

    // Download
    const blob = new Blob([JSON.stringify(seed, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seed.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('seed.json berhasil didownload!\n\nLangkah selanjutnya:\n1. Salin seed.json ke folder src/assets/\n2. Jalankan: npm run build\n3. Semua pengunjung akan melihat data terbaru.');
  }
}





