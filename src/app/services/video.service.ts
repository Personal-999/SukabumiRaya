import { Injectable } from '@angular/core';

export interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  thumb: string;
  duration: string;
  daysAgo: string;
  categoryId: number;
  categoryName: string;
  favourite?: boolean;
}

export const VIDEO_CATEGORIES = [
  { id: 22, name: 'COMPILATIONS',    slug: 'comp' },
  { id: 23, name: 'MATCH HIGHLIGHTS', slug: 'high' },
  { id: 24, name: 'PLAYER FEATURES', slug: 'feat' },
];

const STORAGE_KEY = 'stt-videos';

const SEED: Video[] = [
  // COMPILATIONS (22)
  { id: 2201, title: 'Top Points Of Day 6 | #WTTYokohama 2026', description: 'The best points from Day 6 of WTT Star Contender Yokohama 2026.',
    youtubeUrl: '', youtubeId: '', duration: '7:29', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-6---WTTYokohama-2026_73d2eb17-2bec-4d73-adef-b3af7badc917.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },
  { id: 2202, title: 'Top Points Of Day 5 | #WTTYokohama 2026', description: 'Top table tennis rallies and points from Day 5.',
    youtubeUrl: '', youtubeId: '', duration: '8:10', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },
  { id: 2203, title: 'Top Points Of Day 4 | #WTTYokohama 2026', description: 'Best moments from Day 4 in Yokohama.',
    youtubeUrl: '', youtubeId: '', duration: '5:57', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },
  { id: 2204, title: 'Top Points Of Day 4 | #WTTTunis 2026', description: 'All the top points compiled from WTT Star Contender Tunis.',
    youtubeUrl: '', youtubeId: '', duration: '4:43', daysAgo: '5 months ago',
    thumb: 'assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },
  { id: 2205, title: 'Top Points Of Day 3 | #WTTTunis 2026', description: 'Spectacular rallies from Day 3 in Tunis.',
    youtubeUrl: '', youtubeId: '', duration: '4:53', daysAgo: '5 months ago',
    thumb: 'assets/videothumbs/Top-Points---Day-6---WTTYokohama-2026_73d2eb17-2bec-4d73-adef-b3af7badc917.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },
  { id: 2206, title: 'Top Points Of Day 2 | #WTTTunis 2026', description: 'Day 2 highlights compilation from Tunisia.',
    youtubeUrl: '', youtubeId: '', duration: '5:12', daysAgo: '5 months ago',
    thumb: 'assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png',
    categoryId: 22, categoryName: 'COMPILATIONS', favourite: false },

  // MATCH HIGHLIGHTS (23)
  { id: 2301, title: 'MS Final Highlights | #WTTYokohama 2026', description: 'Full match highlights of the Men\'s Singles Final at WTT Yokohama 2026.',
    youtubeUrl: '', youtubeId: '', duration: '12:34', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/maxresdefault_0e784292-f6d6-42f8-8c57-452e3ec7761d.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },
  { id: 2302, title: 'WS Final Highlights | #WTTYokohama 2026', description: 'Women\'s Singles Final full match highlights.',
    youtubeUrl: '', youtubeId: '', duration: '10:52', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },
  { id: 2303, title: 'MD Final Highlights | #WTTYokohama 2026', description: 'Mixed Doubles Final match highlights from Yokohama.',
    youtubeUrl: '', youtubeId: '', duration: '8:21', daysAgo: '4 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-6---WTTYokohama-2026_73d2eb17-2bec-4d73-adef-b3af7badc917.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },
  { id: 2304, title: 'SF: Fan Zhendong vs Lebrun | #WTTYokohama', description: 'Semi-Final clash: Fan Zhendong takes on Felix Lebrun.',
    youtubeUrl: '', youtubeId: '', duration: '15:08', daysAgo: '5 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },
  { id: 2305, title: 'QF: Wang Chuqin vs Harimoto | #WTTYokohama', description: 'Quarter-Final: Wang Chuqin battles Harimoto in a thrilling encounter.',
    youtubeUrl: '', youtubeId: '', duration: '18:44', daysAgo: '5 days ago',
    thumb: 'assets/videothumbs/maxresdefault_0e784292-f6d6-42f8-8c57-452e3ec7761d.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },
  { id: 2306, title: 'R16 Highlights | #WTTYokohama 2026', description: 'Round of 16 highlights from WTT Yokohama 2026.',
    youtubeUrl: '', youtubeId: '', duration: '9:33', daysAgo: '6 days ago',
    thumb: 'assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png',
    categoryId: 23, categoryName: 'MATCH HIGHLIGHTS', favourite: false },

  // PLAYER FEATURES (24)
  { id: 2401, title: 'Fan Zhendong | Champion\'s Profile 2026', description: 'A deep dive into the career and achievements of Fan Zhendong.',
    youtubeUrl: '', youtubeId: '', duration: '6:12', daysAgo: '1 week ago',
    thumb: 'assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png',
    categoryId: 24, categoryName: 'PLAYER FEATURES', favourite: false },
  { id: 2402, title: 'Sun Yingsha | Women\'s World No.1 Story', description: 'How Sun Yingsha reached the top of world table tennis.',
    youtubeUrl: '', youtubeId: '', duration: '7:44', daysAgo: '1 week ago',
    thumb: 'assets/videothumbs/Top-Points---Day-6---WTTYokohama-2026_73d2eb17-2bec-4d73-adef-b3af7badc917.png',
    categoryId: 24, categoryName: 'PLAYER FEATURES', favourite: false },
  { id: 2403, title: 'Hugo Calderano | Road to the Top 2026', description: 'Brazil\'s finest player and his journey on the WTT circuit.',
    youtubeUrl: '', youtubeId: '', duration: '8:02', daysAgo: '2 weeks ago',
    thumb: 'assets/videothumbs/maxresdefault_0e784292-f6d6-42f8-8c57-452e3ec7761d.png',
    categoryId: 24, categoryName: 'PLAYER FEATURES', favourite: false },
  { id: 2404, title: 'Miyuu Kihara | Japan\'s Rising Star', description: 'Meet Miyuu Kihara, Japan\'s brightest young talent.',
    youtubeUrl: '', youtubeId: '', duration: '5:55', daysAgo: '2 weeks ago',
    thumb: 'assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png',
    categoryId: 24, categoryName: 'PLAYER FEATURES', favourite: false },
  { id: 2405, title: 'Felix Lebrun | Teenage Sensation Profile', description: 'Felix Lebrun: the French teenager taking the world by storm.',
    youtubeUrl: '', youtubeId: '', duration: '7:18', daysAgo: '3 weeks ago',
    thumb: 'assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png',
    categoryId: 24, categoryName: 'PLAYER FEATURES', favourite: false },
];

@Injectable({ providedIn: 'root' })
export class VideoService {
  private videos: Video[] = [];

  constructor() { this.load(); }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.videos = raw ? JSON.parse(raw) : [...SEED];
    } catch { this.videos = [...SEED]; }
    if (!localStorage.getItem(STORAGE_KEY)) { this.save(); }
  }

  private save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.videos)); }

  getAll(): Video[] { return [...this.videos]; }

  getByCategory(categoryId: number): Video[] {
    return this.videos.filter(v => v.categoryId === categoryId);
  }

  getById(id: number): Video | undefined {
    return this.videos.find(v => v.id === id);
  }

  nextId(): number {
    if (this.videos.length === 0) { return 2001; }
    return Math.max(...this.videos.map(v => v.id)) + 1;
  }

  extractYouTubeId(url: string): string {
    if (!url) { return ''; }
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }

  getYouTubeThumbnail(youtubeId: string): string {
    return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
  }

  create(data: Omit<Video, 'id'>): Video {
    const video: Video = { ...data, id: this.nextId() };
    this.videos.unshift(video);
    this.save();
    return video;
  }

  update(id: number, data: Partial<Video>): void {
    const idx = this.videos.findIndex(v => v.id === id);
    if (idx >= 0) { this.videos[idx] = { ...this.videos[idx], ...data }; this.save(); }
  }

  delete(id: number): void {
    this.videos = this.videos.filter(v => v.id !== id);
    this.save();
  }

  resetToSeed(): void { this.videos = [...SEED]; this.save(); }
}
