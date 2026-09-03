import { Component, OnInit, OnDestroy } from "@angular/core";
import { SupabaseService } from "../../services/supabase.service";

export interface SttEvent {
  id: number;
  name: string;
  tier: string;
  tierColor: string;
  tierLabel: string;
  dateStart: Date;
  dateEnd: Date;
  dateLabel: string;
  venue: string;
  location: string;
  prizeMoney: string;
  imageUrl: string;
  categories: string[];
  completed: boolean;
  championsMs?: string;
  championsWs?: string;
  deskripsi?: string;
}

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit, OnDestroy {

  viewMode: "list" | "calendar" = "list";
  searchQuery = "";
  filterCategory = "Semua";
  filterYear = new Date().getFullYear().toString();
  now = new Date();
  isLoading = true;
  private timer: any;

  categories = ["Semua", "Open A", "Open B", "Taruna", "Junior", "Veteran"];
  years = ["2024", "2025", "2026", "2027"];

  allEvents: SttEvent[] = [];

  constructor(private supabase: SupabaseService) {}

  private mapEvent(e: any): SttEvent {
    return {
      id: e.id,
      name: e.name || '',
      tier: e.tier || '',
      tierColor: e.tier_color || e.tierColor || '#f06b25',
      tierLabel: e.tier_label || e.tierLabel || '',
      dateStart: new Date(e.date_start || e.dateStart),
      dateEnd: new Date(e.date_end || e.dateEnd),
      dateLabel: e.date_label || e.dateLabel || '',
      venue: e.venue || '',
      location: e.location || '',
      prizeMoney: e.prize_money || e.prizeMoney || '',
      imageUrl: e.image_url || e.imageUrl || '',
      categories: e.categories || [],
      completed: !!e.completed,
      championsMs: e.champions_ms || e.championsMs || '',
      championsWs: e.champions_ws || e.championsWs || '',
      deskripsi: e.deskripsi || '',
    };
  }

  async loadEvents() {
    this.isLoading = true;
    try {
      const { data, error } = await this.supabase.getEvents();
      if (!error && data && data.length) {
        this.allEvents = data.map((e: any) => this.mapEvent(e));
        const years = [...new Set(this.allEvents.map(e => e.dateStart.getFullYear().toString()))].sort();
        if (years.length) {
          this.years = years;
          if (!this.allEvents.find(e => e.dateStart.getFullYear().toString() === this.filterYear)) {
            this.filterYear = years[years.length - 1];
          }
        }
      } else {
        this.allEvents = [];
      }
    } catch { this.allEvents = []; }
    this.isLoading = false;
  }

  get filteredEvents(): SttEvent[] {
    return this.allEvents.filter(e => {
      const matchSearch = !this.searchQuery.trim() ||
        e.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCategory === "Semua" ||
        e.tierLabel === this.filterCategory;
      const matchYear = !e.dateStart || isNaN(e.dateStart.getTime()) ||
        e.dateStart.getFullYear().toString() === this.filterYear;
      return matchSearch && matchCat && matchYear;
    });
  }

  get calendarGroups(): { month: string; events: SttEvent[] }[] {
    const evts = this.filteredEvents.sort((a, b) => +a.dateStart - +b.dateStart);
    const groups: { month: string; events: SttEvent[] }[] = [];
    evts.forEach(e => {
      const key = e.dateStart.toLocaleString("id-ID", { month: "long", year: "numeric" }).toUpperCase();
      const g = groups.find(g => g.month === key);
      if (g) { g.events.push(e); } else { groups.push({ month: key, events: [e] }); }
    });
    return groups;
  }

  getCountdown(evt: SttEvent): { days: number; hours: number; minutes: number; seconds: number } | null {
    if (evt.completed) { return null; }
    const diff = evt.dateStart.getTime() - this.now.getTime();
    if (diff <= 0) { return null; }
    const s = Math.floor(diff / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60
    };
  }

  pad(n: number): string { return n.toString().padStart(2, "0"); }

  ngOnInit() {
    this.timer = setInterval(() => { this.now = new Date(); }, 1000);
    this.loadEvents();
  }

  ngOnDestroy() { if (this.timer) { clearInterval(this.timer); } }
}
