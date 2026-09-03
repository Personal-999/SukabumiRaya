import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Match } from "../../matches.component";

export interface Commentary {
  time: string;
  type: "completed" | "point" | "game" | "serve" | "timeout";
  title: string;
  detail: string;
}

@Component({
  selector: "app-match-center",
  templateUrl: "./match-center.component.html",
  styleUrls: ["./match-center.component.scss"]
})
export class MatchCenterComponent implements OnInit {

  matchId: number;
  match: Match | null = null;

  // Full match data store (shared with parent - ideally via service, here inline)
  private allMatches: Match[] = [
    {
      id: 1, round: "Men's Singles - Final", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Men's Singles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 1, scoreB: 3,
      playerA: [{ name: "BUDI Santoso", rank: 3, flag: "id", sets: [9, 11, 5, 6] }],
      playerB: [{ name: "RIZKY Pratama", rank: 1, flag: "id", sets: [11, 8, 11, 11] }],
      status: "completed"
    },
    {
      id: 2, round: "Women's Singles - Final", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Women's Singles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 3, scoreB: 0,
      playerA: [{ name: "SARI Dewi", rank: 1, flag: "id", sets: [11, 11, 11] }],
      playerB: [{ name: "PUTRI Rahayu", rank: 2, flag: "id", sets: [7, 8, 5] }],
      status: "completed"
    },
    {
      id: 3, round: "Men's Doubles - Final", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Men's Doubles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 3, scoreB: 1,
      playerA: [{ name: "RIZKY / BUDI", rank: null, flag: "id", sets: [11, 8, 11, 11] }],
      playerB: [{ name: "ANDI / HENDRA", rank: null, flag: "id", sets: [7, 11, 9, 8] }],
      status: "completed"
    },
    {
      id: 4, round: "Women's Doubles - Final", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Women's Doubles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 1, scoreB: 3,
      playerA: [{ name: "SARI / NIA", rank: null, flag: "id", sets: [7, 11, 5, 5] }],
      playerB: [{ name: "PUTRI / YULI", rank: null, flag: "id", sets: [11, 7, 11, 11] }],
      status: "completed"
    },
    {
      id: 5, round: "Mixed Doubles - Final", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Mixed Doubles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 3, scoreB: 2,
      playerA: [{ name: "RIZKY / SARI", rank: null, flag: "id", sets: [11, 8, 7, 11, 11] }],
      playerB: [{ name: "ANDI / PUTRI", rank: null, flag: "id", sets: [7, 11, 11, 9, 7] }],
      status: "completed"
    },
    {
      id: 6, round: "Men's Singles - Semifinal", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Men's Singles", venue: "GOR Pemuda Sukabumi", table: "Table 1",
      scoreA: 1, scoreB: 3,
      playerA: [{ name: "DENI Kurniawan", rank: 5, flag: "id", sets: [8, 11, 9, 7] }],
      playerB: [{ name: "RIZKY Pratama", rank: 1, flag: "id", sets: [11, 7, 11, 11] }],
      status: "completed"
    },
    {
      id: 7, round: "Men's Singles - Semifinal", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Men's Singles", venue: "GOR Pemuda Sukabumi", table: "Table 2",
      scoreA: 3, scoreB: 2,
      playerA: [{ name: "BUDI Santoso", rank: 3, flag: "id", sets: [11, 8, 7, 11, 11] }],
      playerB: [{ name: "YANTO Setiawan", rank: 4, flag: "id", sets: [7, 11, 11, 9, 8] }],
      status: "completed"
    },
    {
      id: 8, round: "Women's Singles - Semifinal", event: "Turnamen Terbuka Sukabumi 2026",
      subEvent: "Women's Singles", venue: "GOR Pemuda Sukabumi", table: "Table 2",
      scoreA: 3, scoreB: 0,
      playerA: [{ name: "SARI Dewi", rank: 1, flag: "id", sets: [11, 11, 11] }],
      playerB: [{ name: "ANI Susanti", rank: 5, flag: "id", sets: [6, 7, 4] }],
      status: "completed"
    }
  ];

  commentary: Commentary[] = [];

  getWinner(): "A" | "B" | null {
    if (!this.match || this.match.status !== "completed") { return null; }
    return this.match.scoreA > this.match.scoreB ? "A" : this.match.scoreB > this.match.scoreA ? "B" : null;
  }

  isWinnerSet(sets: number[], idx: number): boolean {
    if (!this.match) { return false; }
    const opponentSets = this.match.playerA[0].sets === sets ? this.match.playerB[0].sets : this.match.playerA[0].sets;
    return sets[idx] > (opponentSets[idx] || 0);
  }

  goBack() { this.router.navigate(["/matches"]); }

  ngOnInit() {
    this.matchId = +this.route.snapshot.paramMap.get("id");
    this.match = this.allMatches.find(m => m.id === this.matchId) || null;
    if (this.match) { this.buildCommentary(); }
  }

  buildCommentary() {
    if (!this.match) { return; }
    const m = this.match;
    const winner = this.getWinner();
    const winnerName = winner === "A" ? m.playerA[0].name : m.playerB[0].name;
    const finalScore = `${m.scoreA}-${m.scoreB}`;

    this.commentary = [
      {
        time: "07:01 PM", type: "completed",
        title: `Match Completed (${finalScore})`,
        detail: `Match ${m.round} - Match 1 won by ${winnerName}. Match Score ${finalScore}`
      },
      {
        time: "07:00 PM", type: "point",
        title: `Point (${finalScore})`,
        detail: `Point won by ${winnerName}. Game Score 6-11, Match Score ${m.scoreA}-${m.scoreB - 1 < 0 ? 0 : m.scoreB - 1}`
      },
      {
        time: "06:58 PM", type: "game",
        title: "Game Score",
        detail: `${m.playerA[0].name} ${m.playerA[0].sets.join("-")} | ${m.playerB[0].name} ${m.playerB[0].sets.join("-")}`
      },
      {
        time: "06:45 PM", type: "serve",
        title: "Serve",
        detail: `${m.playerA[0].name} serves in Game ${m.playerA[0].sets.length}`
      },
      {
        time: "06:30 PM", type: "game",
        title: "Game Started",
        detail: `Game ${m.playerA[0].sets.length} started`
      },
      {
        time: "06:00 PM", type: "serve",
        title: "Match Started",
        detail: `${m.round} — ${m.venue}, ${m.table}`
      }
    ];
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
