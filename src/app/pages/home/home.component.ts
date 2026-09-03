import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({ selector: "app-home", templateUrl: "./home.component.html", styleUrls: ["./home.component.scss"] })
export class HomeComponent implements OnInit, OnDestroy {

  // === HERO SLIDES (full-screen carousel seperti web asli WTT) ===
  heroSlides = [
    {
      bgImage: "assets/articleimages/WTT-Star-Contender-Astana-2026_KV_16x9_Presidents-Cup_6962e650-194d-4cc0-9b0f-efb9a1e71bca.png",
      tag: "WTT STAR CONTENDER",
      title: "WTT Champions Macao 2026?",
      excerpt: "Fresh off the back of making it to the final of Europe Smash - Sweden 2026, Hong Kong, China's prolific Mixed Doubles duo WONG Chun Ting and DOO Hoi Kem will make the short journey to WTT Champions Macao 2026 Presented by Galaxy Entertainment Group, where they will look to assert...",
      readMoreLink: "/news",
      players: [
        { name: "WONG Chun Ting", flag: "hk", img: "assets/players/112620_HEADSHOT_R_WONG_Chun Ting.webp" },
        { name: "DOO Hoi Kem",    flag: "hk", img: "assets/players/115543_HEADSHOT_R_DOO_Hoi Kem.webp" }
      ]
    },
    {
      bgImage: "assets/articleimages/CHINA-SMASH-2026_0f1ab713-2d10-4949-90a7-44e90f8f2583.png",
      tag: "WTT GRAND SMASH",
      title: "WTT China Smash 2026 — The Biggest Event in Table Tennis",
      excerpt: "The biggest Grand Smash tournament of the year returns to Beijing. All the world's top players will compete for glory at the iconic Capital Indoor Stadium. Don't miss a single point of the action...",
      readMoreLink: "/eventslist",
      players: []
    },
    {
      bgImage: "assets/articleimages/Award-Ceremony_WTT-China-Smash-2025_Day-6_004_42598010-f865-4ab6-bdf6-88640873ae77.png",
      tag: "WTT CHAMPIONS",
      title: "Ma Long Claims WTT Champions Frankfurt 2025 Title",
      excerpt: "In a stunning display of table tennis mastery, Ma Long once again proved why he is the greatest player of all time, defeating Wang Chuqin in the final to claim his latest WTT Champions title and extend his incredible legacy...",
      readMoreLink: "/news",
      players: []
    },
    {
      bgImage: "assets/articleimages/SC-Astana-Presenting-Partner-Announcement_ENG-01_b532cc7e-74cc-42c0-8466-640d2c7bd8d3.png",
      tag: "PARTNER NEWS",
      title: "SC Astana Named As Presenting Partner For Star Contender Astana 2026",
      excerpt: "World Table Tennis is proud to announce SC Astana as the presenting partner of the WTT Star Contender Astana 2026, as the tournament continues to grow in stature and importance on the global table tennis calendar...",
      readMoreLink: "/news",
      players: []
    },
    {
      bgImage: "assets/articleimages/Sachi-AOKI_WTT-Star-Contender-Chennai-2026_Day-2_073A0619_94f47ed0-008f-4d2f-99ba-2d1ff025f409.png",
      tag: "PLAYER SPOTLIGHT",
      title: "Sachi Aoki Shines Bright At WTT Star Contender Chennai 2026",
      excerpt: "Japan's rising star Sachi Aoki put on an impressive display at WTT Star Contender Chennai 2026, defeating several higher-ranked opponents on her way to the semifinals in a tournament that announced her arrival on the world stage...",
      readMoreLink: "/playerslist",
      players: []
    },
  ];
  currentSlide = 0;
  private slideInterval: any;

  // === TOP STORIES ===
  topStories = [
    { category: "Partnerships", categoryColor: "#f06b25",
      title: "Beijing Shijingshan Culture & Tourism Group Returns As Presenting Partner Of China Smash 2026",
      imageUrl: "assets/articleimages/CHINA-SMASH-2026-X-ABC_OFFICIAL-PARTNER_ENG_16x9_5ae33b76-a171-4c85-9baa-012ac189ac24.png" },
    { category: "Ticketing", categoryColor: "#f06b25",
      title: "The Wait Is Almost Over: China Smash 2026 Tickets On Sale Soon",
      imageUrl: "assets/articleimages/China-Smash-2026_Ticket-Announcement_General-Tickets-On-Sale-16x9_96db3bef-b39f-4997-8551-3bda43b3466e.png" },
    { category: "WTT Grand Smash", categoryColor: "#f06b25",
      title: "China Smash 2026 Headliners Revealed",
      imageUrl: "assets/articleimages/CHINA-SMASH-2026_0f1ab713-2d10-4949-90a7-44e90f8f2583.png" },
    { category: "WTT Contender", categoryColor: "#f06b25",
      title: "Sachi Aoki And Andrej Gacina Are Heading To WTT Contender Panagyurishte 2026",
      imageUrl: "assets/articleimages/Sachi-AOKI_WTT-Star-Contender-Chennai-2026_Day-2_073A0619_94f47ed0-008f-4d2f-99ba-2d1ff025f409.png" },
  ];

  // === LATEST VIDEOS ===
  latestVideos = [
    { title: "Top Points Of Day 4 | #WTTTunis 2026", duration: "4:43", daysAgo: "5 months ago",
      thumb: "assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png", featured: true },
    { title: "Top Points Of Day 4 | #WTTYokohama 2026", duration: "5:57", daysAgo: "4 days ago",
      thumb: "assets/videothumbs/Top-Points---Day-4---WTTYokohama-2026_a72734e0-aa6c-4e40-bc7a-387dc3fad8f5.png", featured: false },
    { title: "Top Points Of Day 6 | #WTTYokohama 2026", duration: "7:29", daysAgo: "4 days ago",
      thumb: "assets/videothumbs/Top-Points---Day-6---WTTYokohama-2026_73d2eb17-2bec-4d73-adef-b3af7badc917.png", featured: false },
    { title: "Top Points Of Day 5 | #WTTYokohama 2026", duration: "5:01", daysAgo: "5 months ago",
      thumb: "assets/videothumbs/Top-Points---Day-5---WTTYokohama-2026_bb2dec43-c6fe-4547-9b73-7e2977a7d621.png", featured: false },
    { title: "Top Points Of Day 5 | #WTTYokohama 2026", duration: "8:10", daysAgo: "5 months ago",
      thumb: "assets/videothumbs/maxresdefault_0e784292-f6d6-42f8-8c57-452e3ec7761d.png", featured: false },
  ];

  get featuredVideo() { return this.latestVideos[0]; }
  get sideVideos() { return this.latestVideos.slice(1); }

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  ngOnDestroy() { if (this.slideInterval) { clearInterval(this.slideInterval); } }

  goToSlide(i: number) { this.currentSlide = i; }
  getFlagUrl(code: string) { return "https://flagcdn.com/24x18/" + (code || "xx").toLowerCase() + ".png"; }
}
