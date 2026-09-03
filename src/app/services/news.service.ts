import { Injectable } from '@angular/core';

export interface Article {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  relatedTo?: string;
  relatedFlag?: string;
  excerpt: string;
  body: string;
  publishedDate: string;
  imageUrl: string;
  author?: string;
  favourite?: boolean;
}

const STORAGE_KEY = 'stt-articles';

const SEED: Article[] = [
  {
    id: 1001,
    category: 'Ticketing', categoryColor: '#f06b25',
    title: 'Are You Ready, Beijing? China Smash 2026 Tickets On Sale Now',
    relatedTo: 'China Smash 2026 Presented by Beijing Shijingshan Culture & Tourism Group',
    relatedFlag: 'cn', author: 'WTT Staff',
    excerpt: 'China Smash 2026, where the greatest players on the circuit compete for one of the sport\'s biggest prizes in the capital city that lives and breathes table tennis, will take over Beijing from October 1 to 11, and fans across the world can now secure their tickets for what is sure ...',
    body: `<p>China Smash 2026 is set to take over Beijing from October 1 to 11, bringing together the world's greatest table tennis players for an unmissable spectacle at the Capital Indoor Stadium.</p>
<p>Tickets are now available across a range of categories — from single-session passes through to full event packages that include access to all premium matches across the 11 days of action.</p>
<p>Fan Zhendong, Wang Chuqin, Ma Long, and a host of international stars will be in attendance, making this one of the most anticipated WTT Grand Smash events in history.</p>
<p>Do not miss your chance to witness history in the making. Secure your tickets now through the official WTT website.</p>`,
    publishedDate: '5 hours ago',
    imageUrl: 'assets/articleimages/China-Smash-2026_Ticket-Announcement_General-Tickets-On-Sale-16x9_96db3bef-b39f-4997-8551-3bda43b3466e.png',
    favourite: false
  },
  {
    id: 1002,
    category: 'Partnerships', categoryColor: '#e63946',
    title: 'Nomad Table Tennis Academy Named Presenting Partner Of WTT Star Contender Astana 2026 - President\'s Cup',
    relatedTo: 'WTT Star Contender Astana 2026 - President\'s Cup',
    relatedFlag: 'kz', author: 'WTT Staff',
    excerpt: 'World Table Tennis (WTT) is set to join forces with Nomad Table Tennis Academy as the Presenting Partner of WTT Star Contender Astana 2026 – President\'s Cup, bringing together world-class on-court action, Kazakhstan\'s sporting heritage and a celebration of the nation\'s rich culture in the heart ...',
    body: `<p>World Table Tennis (WTT) is proud to announce Nomad Table Tennis Academy as the Presenting Partner of WTT Star Contender Astana 2026 – President's Cup.</p>
<p>This landmark partnership brings together two organisations united by their passion for table tennis excellence. Nomad Table Tennis Academy, founded with the mission of developing Kazakhstan's next generation of elite players, will play a central role in promoting and showcasing the event to local fans.</p>
<p>The WTT Star Contender Astana 2026 – President's Cup will take place at the Palace of Sports and Culture in Astana, offering fans the chance to witness world-class table tennis in the heart of Central Asia.</p>`,
    publishedDate: '1 day ago',
    imageUrl: 'assets/articleimages/SC-Astana-Presenting-Partner-Announcement_ENG-01_b532cc7e-74cc-42c0-8466-640d2c7bd8d3.png',
    favourite: false
  },
  {
    id: 1003,
    category: 'Ticketing', categoryColor: '#f06b25',
    title: 'WTT Star Contender Astana 2026 Tickets On Sale Now',
    relatedTo: 'WTT Star Contender Astana 2026 - President\'s Cup',
    relatedFlag: 'kz', author: 'WTT Staff',
    excerpt: 'WTT Star Contender Astana 2026 – President\'s Cup tickets are now on sale. Don\'t miss the opportunity to witness the world\'s best table tennis players compete in the heart of Kazakhstan at the Palace of Sports and Culture ...',
    body: `<p>Tickets for WTT Star Contender Astana 2026 – President's Cup are now officially on sale, giving fans across Kazakhstan and beyond the chance to be part of a world-class sporting event.</p>
<p>The event will be held at the iconic Palace of Sports and Culture in Astana, with matches featuring elite players from across the globe competing for top honours on the WTT circuit.</p>
<p>Tickets are available in multiple categories including courtside, premium, and standard seating. Purchase yours today through the official WTT ticketing platform.</p>`,
    publishedDate: '2 days ago',
    imageUrl: 'assets/articleimages/WTT-Star-Contender-Astana-2026_KV_16x9_Presidents-Cup_6962e650-194d-4cc0-9b0f-efb9a1e71bca.png',
    favourite: false
  },
  {
    id: 1004,
    category: 'WTT Grand Smash', categoryColor: '#1a6fc4',
    title: 'China Smash 2026 Headliners Revealed — Star-Studded Field Confirmed',
    relatedTo: 'China Smash 2026', relatedFlag: 'cn', author: 'WTT Staff',
    excerpt: 'The full list of headliners for the WTT China Smash 2026 has been revealed, with all of the world\'s top players confirmed to compete. Fan Zhendong, Wang Chuqin, Ma Long and a host of international stars will battle it out at the Capital Indoor Stadium ...',
    body: `<p>The star-studded field for WTT China Smash 2026 has been confirmed, with every one of the world's top-ranked players set to compete for glory at the Capital Indoor Stadium in Beijing.</p>
<p>World No.1 Fan Zhendong headlines the men's singles draw, alongside defending champion Wang Chuqin, veteran legend Ma Long, and an array of international challengers including Felix Lebrun, Truls Moregard, and Tomokazu Harimoto.</p>
<p>On the women's side, Sun Yingsha leads a formidable Chinese contingent, with Mima Ito, Hina Hayata, and Bernadette Szocs among the international contenders bidding to challenge for the title.</p>
<p>The action runs from October 1–11. Do not miss a single moment.</p>`,
    publishedDate: '3 days ago',
    imageUrl: 'assets/articleimages/CHINA-SMASH-2026_0f1ab713-2d10-4949-90a7-44e90f8f2583.png',
    favourite: false
  },
  {
    id: 1005,
    category: 'WTT Contender', categoryColor: '#457b9d',
    title: 'Sachi Aoki And Andrej Gacina Are Heading To WTT Contender Panagyurishte 2026',
    relatedTo: 'WTT Contender Panagyurishte 2026', relatedFlag: 'bg', author: 'WTT Staff',
    excerpt: 'Japan\'s Sachi Aoki and Croatia\'s Andrej Gacina have confirmed their participation in WTT Contender Panagyurishte 2026, as the event continues to attract top international talent to Bulgaria\'s rising table tennis scene ...',
    body: `<p>Two exciting international names have confirmed their participation in WTT Contender Panagyurishte 2026, adding further star power to what promises to be a thrilling event in Bulgaria.</p>
<p>Japan's Sachi Aoki, one of the most exciting young talents on the WTT circuit, arrives in fine form after a series of strong results this season. She is expected to be among the chief contenders for the women's singles title.</p>
<p>Croatia's Andrej Gacina, a fan favourite known for his aggressive playing style and never-say-die attitude, will anchor the men's draw and provide stiff competition for the region's best players.</p>
<p>WTT Contender Panagyurishte 2026 takes place at the Panagyurishte Sports Hall. Tickets are available now.</p>`,
    publishedDate: '4 days ago',
    imageUrl: 'assets/articleimages/Sachi-AOKI_WTT-Star-Contender-Chennai-2026_Day-2_073A0619_94f47ed0-008f-4d2f-99ba-2d1ff025f409.png',
    favourite: false
  },
  {
    id: 1006,
    category: 'WTT Champions', categoryColor: '#c0090e',
    title: 'Ma Long Claims WTT Champions Frankfurt 2025 In Dominant Fashion',
    relatedTo: 'WTT Champions Frankfurt 2025', relatedFlag: 'de', author: 'WTT Staff',
    excerpt: 'Ma Long added another incredible chapter to his legendary career by defeating Wang Chuqin 4-2 in the final of WTT Champions Frankfurt 2025. The Chinese veteran showed no signs of slowing down as he delivered a masterclass performance ...',
    body: `<p>Ma Long once again defied the march of time, producing a masterclass performance to claim WTT Champions Frankfurt 2025 with a commanding 4-2 victory over compatriot Wang Chuqin in the final.</p>
<p>Playing with the poise and precision that has made him the greatest player in the history of the sport, the Chinese legend was near flawless throughout the tournament, not dropping a single set until the penultimate round.</p>
<p>"This win means everything to me," Ma Long said after the match. "Every title I win at this stage of my career is a gift. I want to keep going for as long as my body allows."</p>
<p>The victory adds to Ma Long's extraordinary haul of WTT titles and cements his status as a living legend of the game.</p>`,
    publishedDate: '1 week ago',
    imageUrl: 'assets/articleimages/Award-Ceremony_WTT-China-Smash-2025_Day-6_004_42598010-f865-4ab6-bdf6-88640873ae77.png',
    favourite: false
  },
  {
    id: 1007,
    category: 'Partnerships', categoryColor: '#e63946',
    title: 'ABC Confirmed As Official Partner Of WTT China Smash 2026',
    relatedTo: 'China Smash 2026', relatedFlag: 'cn', author: 'WTT Staff',
    excerpt: 'World Table Tennis is proud to welcome ABC as an Official Partner of the WTT China Smash 2026. This collaboration brings together two world-class organisations committed to delivering the best possible experience ...',
    body: `<p>World Table Tennis (WTT) is delighted to confirm that ABC has joined as an Official Partner of WTT China Smash 2026, further strengthening the commercial framework of one of the sport's most prestigious events.</p>
<p>The partnership will see ABC's branding feature prominently across all event assets, including in-venue signage, broadcast graphics, and digital media throughout the 11-day tournament.</p>
<p>"We are thrilled to have ABC on board for China Smash 2026," said a WTT spokesperson. "This partnership reflects the growing commercial appeal of our flagship events and our commitment to delivering world-class experiences for fans and partners alike."</p>`,
    publishedDate: '1 week ago',
    imageUrl: 'assets/articleimages/CHINA-SMASH-2026-X-ABC_OFFICIAL-PARTNER_ENG_16x9_5ae33b76-a171-4c85-9baa-012ac189ac24.png',
    favourite: false
  },
  {
    id: 1008,
    category: 'WTT Contender', categoryColor: '#457b9d',
    title: 'WTT Contender Zagreb 2026 — Award Ceremony Highlights',
    relatedTo: 'WTT Contender Zagreb 2026', relatedFlag: 'hr', author: 'WTT Staff',
    excerpt: 'The WTT Contender Zagreb 2026 concluded with an incredible award ceremony. Hugo Calderano delivered a stunning performance throughout the week to claim the men\'s singles title, while Miyuu Kihara took home the women\'s crown ...',
    body: `<p>WTT Contender Zagreb 2026 came to a spectacular conclusion as champions were crowned across all five disciplines in front of an enthusiastic sell-out crowd at the Zagreb Sports Hall.</p>
<p>Hugo Calderano was imperious throughout the week, using his powerful forehand and intelligent shot selection to defeat each of his opponents in straight games, culminating in a dominant final performance to claim the men's singles crown.</p>
<p>Miyuu Kihara was equally impressive on the women's side, deploying her trademark speed and consistency to outlast a field packed with European talent and take home the title for Japan.</p>
<p>A spectacular awards ceremony brought the curtain down on the event, celebrating the achievements of all competitors and setting the stage for the next chapter of the WTT Contender series.</p>`,
    publishedDate: '2 weeks ago',
    imageUrl: 'assets/articleimages/Award-Ceremony_WTT-Contender-Zagreb-2026_Day-3_1006_d1c353c5-b82d-46c5-b07d-5b010b04a6e0.png',
    favourite: false
  }
];

@Injectable({ providedIn: 'root' })
export class NewsService {

  private articles: Article[] = [];

  constructor() { this.load(); }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.articles = raw ? JSON.parse(raw) : [...SEED];
    } catch { this.articles = [...SEED]; }
    if (!localStorage.getItem(STORAGE_KEY)) { this.save(); }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.articles));
  }

  getAll(): Article[] { return [...this.articles]; }

  getById(id: number): Article | undefined {
    return this.articles.find(a => a.id === id);
  }

  nextId(): number {
    if (this.articles.length === 0) { return 1001; }
    return Math.max(...this.articles.map(a => a.id)) + 1;
  }

  create(data: Omit<Article, 'id'>): Article {
    const article: Article = { ...data, id: this.nextId() };
    this.articles.unshift(article);
    this.save();
    return article;
  }

  update(id: number, data: Partial<Article>): void {
    const idx = this.articles.findIndex(a => a.id === id);
    if (idx >= 0) { this.articles[idx] = { ...this.articles[idx], ...data }; this.save(); }
  }

  delete(id: number): void {
    this.articles = this.articles.filter(a => a.id !== id);
    this.save();
  }

  resetToSeed(): void {
    this.articles = [...SEED];
    this.save();
  }
}
