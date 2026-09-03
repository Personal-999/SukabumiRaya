import { Component, OnInit } from "@angular/core";

@Component({ selector: "app-rankings", templateUrl: "./rankings.component.html", styleUrls: ["./rankings.component.scss"] })
export class RankingsComponent implements OnInit {
  activeCategory: "individual" | "pairs" = "individual";
  activeGender: "men" | "women" = "men";
  today = new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" });

  menRankings = [
    { rank:1,  rankDiff:0,  playerName:"FAN Zhendong",      nationalityCode:"cn", points:13460, playerImg:"assets/players/102891_Headshot_R_GACINA_Andrej.png" },
    { rank:2,  rankDiff:1,  playerName:"WANG Chuqin",        nationalityCode:"cn", points:11870, playerImg:"" },
    { rank:3,  rankDiff:-1, playerName:"MA Long",            nationalityCode:"cn", points:11340, playerImg:"" },
    { rank:4,  rankDiff:0,  playerName:"CALDERANO Hugo",     nationalityCode:"br", points:7980,  playerImg:"" },
    { rank:5,  rankDiff:2,  playerName:"HARIMOTO Tomokazu",  nationalityCode:"jp", points:7650,  playerImg:"" },
    { rank:6,  rankDiff:-1, playerName:"OVTCHAROV Dimitrij", nationalityCode:"de", points:7120,  playerImg:"" },
    { rank:7,  rankDiff:0,  playerName:"LEBRUN Felix",       nationalityCode:"fr", points:6890,  playerImg:"" },
    { rank:8,  rankDiff:1,  playerName:"BOLL Timo",          nationalityCode:"de", points:6430,  playerImg:"" },
    { rank:9,  rankDiff:-1, playerName:"LIANG Jingkun",      nationalityCode:"cn", points:6210,  playerImg:"" },
    { rank:10, rankDiff:0,  playerName:"LIN Yun-Ju",         nationalityCode:"tw", points:5980,  playerImg:"" },
    { rank:11, rankDiff:3,  playerName:"SACRE Tristan",      nationalityCode:"fr", points:5760,  playerImg:"" },
    { rank:12, rankDiff:-1, playerName:"DUDA Patrick",       nationalityCode:"de", points:5540,  playerImg:"" },
    { rank:13, rankDiff:0,  playerName:"WONG Chun Ting",     nationalityCode:"hk", points:5320,  playerImg:"assets/players/112620_HEADSHOT_R_WONG_Chun Ting.webp" },
    { rank:14, rankDiff:2,  playerName:"FILUS Ruwen",        nationalityCode:"de", points:5110,  playerImg:"" },
    { rank:15, rankDiff:-2, playerName:"CHUANG Chih-Yuan",   nationalityCode:"tw", points:4890,  playerImg:"" },
  ];

  womenRankings = [
    { rank:1,  rankDiff:0,  playerName:"SUN Yingsha",   nationalityCode:"cn", points:12540, playerImg:"" },
    { rank:2,  rankDiff:0,  playerName:"CHEN Meng",      nationalityCode:"cn", points:11830, playerImg:"" },
    { rank:3,  rankDiff:1,  playerName:"WANG Manyu",     nationalityCode:"cn", points:10980, playerImg:"" },
    { rank:4,  rankDiff:-1, playerName:"MIMA Ito",       nationalityCode:"jp", points:8760,  playerImg:"" },
    { rank:5,  rankDiff:0,  playerName:"HAYATA Hina",    nationalityCode:"jp", points:7430,  playerImg:"" },
    { rank:6,  rankDiff:1,  playerName:"MIYUU Kihara",   nationalityCode:"jp", points:7120,  playerImg:"assets/players/131036_Headshot_R_Miyuu KIHARA.png" },
    { rank:7,  rankDiff:-1, playerName:"DOO Hoi Kem",    nationalityCode:"hk", points:6890,  playerImg:"assets/players/115543_HEADSHOT_R_DOO_Hoi Kem.webp" },
    { rank:8,  rankDiff:0,  playerName:"SACHI Aoki",     nationalityCode:"jp", points:6540,  playerImg:"" },
    { rank:9,  rankDiff:2,  playerName:"QU Tianyi",      nationalityCode:"cn", points:6210,  playerImg:"" },
    { rank:10, rankDiff:-1, playerName:"BERNADETTE Szocs",nationalityCode:"ro", points:5980, playerImg:"" },
  ];

  pairsRankings = [
    { rank:1,  rankDiff:0,  playerName:"WANG Chuqin / LIN Gaoyuan",   nationalityCode:"cn", points:8760 },
    { rank:2,  rankDiff:0,  playerName:"FAN Zhendong / MA Long",        nationalityCode:"cn", points:8240 },
    { rank:3,  rankDiff:1,  playerName:"HARIMOTO T. / YUKIYA K.",       nationalityCode:"jp", points:6430 },
    { rank:4,  rankDiff:-1, playerName:"LEBRUN Felix / LEBRUN Alexis",  nationalityCode:"fr", points:6120 },
    { rank:5,  rankDiff:0,  playerName:"CALDERANO H. / MONTEIRO T.",    nationalityCode:"br", points:5890 },
  ];

  get rankings() {
    if (this.activeCategory === "pairs") { return this.pairsRankings; }
    return this.activeGender === "men" ? this.menRankings : this.womenRankings;
  }

  ngOnInit() {}
  setCategory(cat: "individual" | "pairs") { this.activeCategory = cat; }
  setGender(g: "men" | "women") { this.activeGender = g; }
  getFlagUrl(code: string) { return "https://flagcdn.com/24x18/" + (code || "xx").toLowerCase() + ".png"; }
}
