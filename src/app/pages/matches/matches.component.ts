import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SupabaseService } from "../../services/supabase.service";

export interface MatchPlayer {
  name: string;
  rank?: number;
  flag?: string;
  photo?: string;
  sets: number[];
}

export interface Match {
  id: number;
  round: string;
  event: string;
  subEvent: string;
  venue: string;
  table: string;
  scoreA: number;
  scoreB: number;
  playerA: MatchPlayer[];
  playerB: MatchPlayer[];
  status: "completed" | "scheduled" | "live";
  scheduledTime?: string;
  drawGroup?: string;
}

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.scss"]
})
export class MatchesComponent implements OnInit, OnDestroy {

  selectedTab: "COMPLETED" | "SCHEDULED" | "DRAWS" | "POOL" = "COMPLETED";
  filterEvent = "Semua Event";
  filterSubEvent = "All";
  searchQuery = "";
  showEventDropdown = false;
  showSubEventDropdown = false;
  isLoading = false;

  events: string[] = ["Semua Event"];
  // subEvents is now dynamic — computed from actual match data for selected event
  get subEvents(): string[] {
    const base = ["All"];
    const source = this.filterEvent === 'Semua Event'
      ? this.allMatches
      : this.allMatches.filter(m => m.event === this.filterEvent);
    const found = new Set<string>();
    source.forEach(m => { if (m.subEvent) { found.add(m.subEvent); } });
    return found.size > 0 ? [...base, ...Array.from(found)] : base;
  }

  drawGroups = ["Group A", "Group B", "Group C", "Group D"];
  poolEvents: string[] = [];
  allPools: any[] = [];
  allMatches: Match[] = [];
  filteredMatches: Match[] = [];
  groupedDraws: { group: string; matches: Match[] }[] = [];
  showScheduledModal = false;
  modalMatch: Match | null = null;

  private realtimeChannel: any;

  private readonly ROUND_LABELS: any = {
    64: {1:"R64",2:"R32",3:"R16",4:"Quarter Final",5:"Semi Final",6:"Final"},
    32: {1:"R32",2:"R16",3:"Quarter Final",4:"Semi Final",5:"Final"},
    16: {1:"R16",2:"Quarter Final",3:"Semi Final",4:"Final"},
    8:  {1:"Quarter Final",2:"Semi Final",3:"Final"},
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tab = params["selectedTab"];
      if (tab === "COMPLETED" || tab === "SCHEDULED" || tab === "DRAWS" || tab === "POOL") {
        this.selectedTab = tab as any;
      }
    });
    this.loadAllData();

    // Realtime: reload when matches or brackets change
    this.realtimeChannel = this.supabase.onMatchesChange(() => this.loadAllData());
    this.supabase.onEventsChange(() => this.loadAllData());
  }

  ngOnDestroy() {
    if (this.realtimeChannel) { this.realtimeChannel.unsubscribe(); }
  }

  async loadAllData() {
    this.isLoading = true;
    try {
      // Load events
      const { data: evData } = await this.supabase.getEvents();
      const evNames = (evData || []).map((e: any) => e.name).filter(Boolean);
      this.events = ["Semua Event", ...evNames];
      this.poolEvents = [...evNames];

      // Load manual matches from Supabase
      const { data: mData } = await this.supabase.getMatches();
      const listMatches: Match[] = (mData || []).map((m: any, i: number) => ({
        id: i + 1,
        round: m.round || "",
        event: m.event || "",
        subEvent: m.sub_event || "",
        venue: m.venue || "",
        table: m.table_no || "",
        scoreA: parseInt(m.score_a, 10) || 0,
        scoreB: parseInt(m.score_b, 10) || 0,
        playerA: Array.isArray(m.player_a) ? m.player_a : [{ name: m.player_a || "", sets: [] }],
        playerB: Array.isArray(m.player_b) ? m.player_b : [{ name: m.player_b || "", sets: [] }],
        status: m.status || "scheduled",
        scheduledTime: m.scheduled_time || "",
        drawGroup: m.draw_group || "",
      }));

      // Load brackets from Supabase
      const { data: bData } = await this.supabase.getAllBrackets();
      const bracketMatches: Match[] = [];
      (bData || []).forEach((bracket: any) => {
        const size = bracket.size || 16;
        const rMap = this.ROUND_LABELS[size] || this.ROUND_LABELS[16];
        const slots: any[] = bracket.slots || [];
        slots.forEach((slot: any) => {
          const pAName = slot.playerA && slot.playerA.name ? slot.playerA.name : "";
          const pBName = slot.playerB && slot.playerB.name ? slot.playerB.name : "";
          if (!pAName && !pBName) { return; }
          const roundLabel = rMap[slot.round] || ("Round " + slot.round);
          bracketMatches.push({
            id: 90000 + (slot.id || 0),
            round: roundLabel,
            event: bracket.event_name || "",
            subEvent: bracket.sub_event || "",
            venue: slot.venue || "",
            table: slot.table || "",
            scoreA: parseInt(slot.scoreA, 10) || 0,
            scoreB: parseInt(slot.scoreB, 10) || 0,
            playerA: [{ name: pAName || "TBD", sets: [] }],
            playerB: [{ name: pBName || "TBD", sets: [] }],
            status: slot.status === "completed" ? "completed" : "scheduled",
            scheduledTime: (slot.tanggal && slot.jam) ? (slot.tanggal + "T" + slot.jam) : (slot.tanggal || ""),
            drawGroup: roundLabel,
          });
        });
      });

      this.allMatches = listMatches.concat(bracketMatches);

      // Load pools from Supabase
      const { data: pData } = await this.supabase.getPools();
      this.allPools = (pData || []).map((p: any) => ({
        id: p.id,
        event: p.event_name,
        name: p.name,
        cabang: p.cabang || '',
        teams: p.teams || [],
        schedule: p.schedule || []
      }));
      // Auto-select first event for pool tab if not set
      if (!this.selectedPoolEvent && this.poolEvents.length) {
        this.selectedPoolEvent = this.poolEvents[0];
      }

      this.recomputeFiltered();
    } catch (err) {
      console.error("loadAllData error:", err);
    }
    this.isLoading = false;
  }

  selectTab(tab: "COMPLETED" | "SCHEDULED" | "DRAWS" | "POOL") {
    this.selectedTab = tab as any;
    this.recomputeFiltered();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { selectedTab: tab },
      queryParamsHandling: "merge"
    });
  }

  get filteredPools() {
    let pools = this.allPools;
    // Filter by selected event
    if (this.filterEvent && this.filterEvent !== 'Semua Event') {
      pools = pools.filter(p => p.event === this.filterEvent);
    }
    // Filter by search query — matches pool name or player names
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      pools = pools.filter(p => {
        if (p.name && p.name.toLowerCase().includes(q)) { return true; }
        if (p.cabang && p.cabang.toLowerCase().includes(q)) { return true; }
        if (p.teams && p.teams.some((t: any) =>
          (t.player || '').toLowerCase().includes(q) ||
          (t.ptm || '').toLowerCase().includes(q)
        )) { return true; }
        return false;
      });
    }
    return pools;
  }

  goToMatchCentre(matchId: number) { this.router.navigate(["/matches", matchId]); }

  getWinner(m: Match): "A" | "B" | null {
    if (m.status !== "completed") { return null; }
    return m.scoreA > m.scoreB ? "A" : m.scoreB > m.scoreA ? "B" : null;
  }

  selectEvent(val: string) { this.filterEvent = val; this.showEventDropdown = false; this.recomputeFiltered(); }
  selectSubEvent(val: string) { this.filterSubEvent = val; this.showSubEventDropdown = false; this.recomputeFiltered(); }

  selectedPoolEvent: string = "";

  recomputeFiltered() {
    const tab = this.selectedTab;
    const filtered = this.allMatches.filter(m => {
      if (tab === "COMPLETED" && m.status !== "completed") { return false; }
      if (tab === "SCHEDULED" && m.status !== "scheduled") { return false; }
      if (tab === "DRAWS" && !m.drawGroup) { return false; }
      if (this.filterEvent !== "Semua Event" && m.event !== this.filterEvent) { return false; }
      if (this.filterSubEvent !== "All" && m.subEvent !== this.filterSubEvent) { return false; }
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        const inPlayer = m.playerA.some(p => p.name.toLowerCase().includes(q)) ||
                         m.playerB.some(p => p.name.toLowerCase().includes(q));
        const inRound = m.round.toLowerCase().includes(q);
        const inTable = m.table.toLowerCase().includes(q);
        if (!inPlayer && !inRound && !inTable) { return false; }
      }
      return true;
    });
    this.filteredMatches = filtered;
    const groups: { group: string; matches: Match[] }[] = [];
    filtered.forEach(m => {
      if (!m.drawGroup) { return; }
      const g = groups.find(x => x.group === m.drawGroup);
      if (g) { g.matches.push(m); } else { groups.push({ group: m.drawGroup, matches: [m] }); }
    });
    this.groupedDraws = groups;
  }

  openScheduledModal(m: Match) { this.modalMatch = m; this.showScheduledModal = true; document.body.style.overflow = "hidden"; }
  closeScheduledModal() { this.showScheduledModal = false; this.modalMatch = null; document.body.style.overflow = ""; }
  onMatchCentreClick(m: Match) {
    if (m.status === "completed") { this.goToMatchCentre(m.id); } else { this.openScheduledModal(m); }
  }
}
