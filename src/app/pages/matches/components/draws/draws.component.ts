import { Component, OnInit, OnDestroy } from "@angular/core";
import { SupabaseService } from "../../../../services/supabase.service";

export interface BracketPlayer {
  name: string; flag?: string; seed?: number | string;
  score?: number; isWinner?: boolean; games?: number[];
  isTbd?: boolean; partner?: { name: string; flag?: string; };
}
export interface BracketMatch {
  id: number; round: number; slotIndex: number;
  playerA?: BracketPlayer; playerB?: BracketPlayer;
  date?: string; venue?: string;
  hasByeA?: boolean; hasByeB?: boolean; roundLabel?: string;
}
export interface DrawCategory {
  name: string; rounds: string[]; totalSlots: number[]; matches: BracketMatch[];
}

@Component({
  selector: "app-draws",
  templateUrl: "./draws.component.html",
  styleUrls: ["./draws.component.scss"]
})
export class DrawsComponent implements OnInit, OnDestroy {
  categories: DrawCategory[] = [];
  selectedCategory = 0;
  hoveredMatch: BracketMatch | null = null;
  popupX = 0; popupY = 0;
  hoveredPlayerName: string | null = null;
  hoveredBye = false;
  isLoading = false;

  readonly MATCH_H = 182;
  readonly ROW_H   = 38;

  private realtimeChannel: any;

  private readonly ROUND_LABELS: any = {
    64: ["ROUND OF 64","ROUND OF 32","ROUND OF 16","Quarter Final","Semi Final","Final"],
    32: ["ROUND OF 32","ROUND OF 16","Quarter Final","Semi Final","Final"],
    16: ["ROUND OF 16","Quarter Final","Semi Final","Final"],
    8:  ["Quarter Final","Semi Final","Final"],
  };

  constructor(private supabase: SupabaseService) {}

  ngOnInit() {
    this.buildData();
    this.realtimeChannel = this.supabase.onBracketsChange(() => this.buildData());
    this.supabase.onEventsChange(() => this.buildData());
  }

  ngOnDestroy() { if (this.realtimeChannel) { this.realtimeChannel.unsubscribe(); } }

  get currentCategory(): DrawCategory {
    return this.categories[this.selectedCategory] || { name: "", rounds: [], totalSlots: [], matches: [] };
  }

  isPlayerHighlighted(name: string | undefined): boolean {
    if (!name || !this.hoveredPlayerName) { return false; }
    return name === this.hoveredPlayerName;
  }
  get isByeHighlighted(): boolean { return this.hoveredBye; }
  hoverPlayer(name: string | undefined) { this.hoveredPlayerName = name || null; }
  unhoverPlayer() { this.hoveredPlayerName = null; }
  hoverBye() { this.hoveredBye = true; }
  unhoverBye() { this.hoveredBye = false; }

  getRoundMatches(round: number): BracketMatch[] {
    if (!this.currentCategory) { return []; }
    return this.currentCategory.matches.filter(m => m.round === round).sort((a, b) => a.slotIndex - b.slotIndex);
  }
  getConnectorPairs(ri: number): number[] {
    const count = this.currentCategory.totalSlots[ri] || 0;
    const pairs: number[] = [];
    for (let i = 0; i < count; i += 2) { pairs.push(i); }
    return pairs;
  }
  hasResult(match: BracketMatch): boolean {
    if (!match.playerA || !match.playerB || match.hasByeA || match.hasByeB) { return false; }
    if (match.playerA.isTbd || match.playerB.isTbd) { return false; }
    return match.playerA.score !== undefined && match.playerB.score !== undefined;
  }
  showPopup(match: BracketMatch, event: MouseEvent) {
    if (!this.hasResult(match)) { return; }
    this.hoveredMatch = match;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.popupX = rect.right + 10; this.popupY = rect.top + window.scrollY - 10;
  }
  hidePopup() { this.hoveredMatch = null; }
  isEvenSlot(match: BracketMatch): boolean { return match.slotIndex % 2 === 0; }
  getMatchTop(ri: number, slotIndex: number): number {
    const sectionH = this.MATCH_H * Math.pow(2, ri);
    return slotIndex * sectionH + (sectionH - this.MATCH_H) / 2;
  }
  getConnectorTop(ri: number, evenSlot: number): number { return this.getMatchTop(ri, evenSlot) + this.ROW_H; }
  getConnectorHeight(ri: number): number { return this.MATCH_H * Math.pow(2, ri); }
  getRoundColumnHeight(): number { return (this.currentCategory.totalSlots[0] || 1) * this.MATCH_H; }

  async buildData() {
    this.isLoading = true;
    this.categories = [];
    try {
      // Load events to know which categories (sub_events) are valid
      const { data: evData } = await this.supabase.getEvents();
      const allEvents: any[] = evData || [];

      // Build a map: eventName -> Set of valid categories
      const eventCategories: any = {};
      allEvents.forEach((ev: any) => {
        const cats: string[] = Array.isArray(ev.categories) ? ev.categories : [];
        eventCategories[ev.name] = new Set(cats);
      });

      // Load all brackets
      const { data: bData } = await this.supabase.getAllBrackets();
      const allBrackets: any[] = bData || [];

      // Deduplicate: for same event_name+sub_event, keep only the bracket with LARGEST size
      const bracketMap: any = {};
      allBrackets.forEach((b: any) => {
        const key = (b.event_name || '') + '|||' + (b.sub_event || '');
        if (!bracketMap[key] || (b.size || 0) > (bracketMap[key].size || 0)) {
          bracketMap[key] = b;
        }
      });

      // Filter: only keep brackets whose sub_event is in the event's categories
      const validBrackets = Object.values(bracketMap).filter((b: any) => {
        const validCats = eventCategories[b.event_name];
        // If event has no categories configured, show all brackets for it
        if (!validCats || validCats.size === 0) { return true; }
        // Otherwise only show if sub_event matches
        return b.sub_event ? validCats.has(b.sub_event) : true;
      });

      // Build DrawCategory for each valid bracket
      validBrackets.forEach((bracket: any) => {
        const size = bracket.size || 16;
        const roundLabels: string[] = this.ROUND_LABELS[size] || this.ROUND_LABELS[16];
        const totalSlots: number[] = roundLabels.map((_: string, ri: number) => size / Math.pow(2, ri + 1));
        const slots: any[] = bracket.slots || [];
        const matches: BracketMatch[] = slots.map((slot: any) => {
          const ri = slot.round - 1;
          const si = slot.position - 1;
          const pAName = slot.playerA && slot.playerA.name ? slot.playerA.name : "";
          const pBName = slot.playerB && slot.playerB.name ? slot.playerB.name : "";
          const scoreA = parseInt(slot.scoreA, 10) || 0;
          const scoreB = parseInt(slot.scoreB, 10) || 0;
          const hasScore = slot.winner && (scoreA > 0 || scoreB > 0);
          return {
            id: slot.id, round: ri, slotIndex: si,
            roundLabel: roundLabels[ri] || ("Round " + slot.round),
            date: slot.tanggal || "",
            venue: slot.venue || (slot.table ? "Meja " + slot.table : ""),
            playerA: { name: pAName || "TBD", isTbd: !pAName, isWinner: slot.winner === "A", score: hasScore ? scoreA : undefined },
            playerB: { name: pBName || "TBD", isTbd: !pBName, isWinner: slot.winner === "B", score: hasScore ? scoreB : undefined },
          };
        });
        const catName = bracket.sub_event ? (bracket.event_name + " — " + bracket.sub_event) : bracket.event_name;
        this.categories.push({ name: catName, rounds: roundLabels, totalSlots: totalSlots, matches: matches });
      });

      this.padAllCategories();
    } catch (err) { console.error("buildData error:", err); }
    this.isLoading = false;
  }

  padAllCategories() {
    let tbdId = -1;
    for (const cat of this.categories) {
      for (let ri = 0; ri < cat.rounds.length; ri++) {
        const existing = new Set(cat.matches.filter(m => m.round === ri).map(m => m.slotIndex));
        const expected = cat.totalSlots[ri] || 0;
        for (let si = 0; si < expected; si++) {
          if (!existing.has(si)) {
            cat.matches.push({ id: tbdId--, round: ri, slotIndex: si,
              playerA: { name: "TBD", isTbd: true }, playerB: { name: "TBD", isTbd: true } });
          }
        }
      }
      cat.matches.sort((a, b) => a.round - b.round || a.slotIndex - b.slotIndex);
    }
  }
}
