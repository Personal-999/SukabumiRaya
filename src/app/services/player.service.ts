import { Injectable } from '@angular/core';

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  country: string;
  countryCode: string;
  gender: 'M' | 'F';
  age: number;
  divisi: 'A' | 'B' | 'C' | 'D';
  ptm: string;
  rank: number;
  playingStyle: string;
  biography: string;
  imgUrl: string;
  winRate: number;
  favourites: number;
}

const DEFAULT_PHOTO = 'https://wttwebcmsprod.blob.core.windows.net/websitefiles/images/general/men_default_left.png';
const STORAGE_KEY = 'stt-players-v2';

const SEED: Player[] = [];

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private players: Player[] = [];
  readonly defaultPhoto = DEFAULT_PHOTO;

  constructor() { this.load(); }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Player[] = JSON.parse(raw);
        // Migrate: add ptm if missing
        this.players = parsed.map(p => ({ ptm: '', ...p }));
      } else {
        this.players = [...SEED];
        this.save();
      }
    } catch { this.players = [...SEED]; this.save(); }
  }

  private save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.players)); }

  getAll(): Player[] { return [...this.players]; }

  getById(id: number): Player | undefined { return this.players.find(p => p.id === id); }

  getByGender(gender: 'M' | 'F'): Player[] { return this.players.filter(p => p.gender === gender); }

  nextId(): number {
    if (this.players.length === 0) { return 121001; }
    return Math.max(...this.players.map(p => p.id)) + 1;
  }

  create(data: Omit<Player, 'id'>): Player {
    const player: Player = { ...data, id: this.nextId() };
    this.players.push(player);
    this.save();
    return player;
  }

  update(id: number, data: Partial<Player>): void {
    const idx = this.players.findIndex(p => p.id === id);
    if (idx >= 0) { this.players[idx] = { ...this.players[idx], ...data }; this.save(); }
  }

  delete(id: number): void {
    this.players = this.players.filter(p => p.id !== id);
    this.save();
  }
}


