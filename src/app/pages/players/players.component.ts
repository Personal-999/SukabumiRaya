import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from '../../services/player.service';

@Component({ selector: 'app-players', templateUrl: './players.component.html', styleUrls: ['./players.component.scss'] })
export class PlayersComponent implements OnInit {

  // ===== VIEW MODE =====
  viewMode: 'list' | 'description' = 'list';
  activePlayer: Player | null = null;

  // ===== LIST STATE =====
  searchQuery = '';
  selectedGender: 'Men' | 'Women' = 'Men';
  selectedDivisi: 'All' | 'A' | 'B' | 'C' | 'D' = 'All';
  allPlayers: Player[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.allPlayers = this.playerService.getAll();
    const url = this.router.url;
    if (url.includes('playerDescription')) {
      this.viewMode = 'description';
      this.route.queryParams.subscribe(params => {
        const id = parseInt(params['playerId'], 10);
        this.activePlayer = this.playerService.getById(id) || null;
      });
    }
  }

  // ===== LIST HELPERS =====
  get divisiLabel(): Record<string, string> {
    return { 'All': 'Semua Divisi', 'A': 'Divisi A — Men Senior (≥21)', 'B': 'Divisi B — Men Junior (<21)', 'C': 'Divisi C — Women Senior (≥21)', 'D': 'Divisi D — Women Junior (<21)' };
  }

  get filteredPlayers(): Player[] {
    let list = this.allPlayers.filter(p => p.gender === (this.selectedGender === 'Men' ? 'M' : 'F'));
    if (this.selectedDivisi !== 'All') { list = list.filter(p => p.divisi === this.selectedDivisi); }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.fullName.toLowerCase().includes(q) || p.country.toLowerCase().includes(q));
    }
    return list;
  }

  get availableDivisi() { return ['All', 'A', 'B', 'C', 'D']; }

  selectGender(g: 'Men' | 'Women') { this.selectedGender = g; this.selectedDivisi = 'All'; }

  getFlagUrl(code: string): string {
    return 'https://flagcdn.com/24x18/' + (code || 'xx').toLowerCase() + '.png';
  }

  getFlagUrlLg(code: string): string {
    return 'https://flagcdn.com/48x36/' + (code || 'xx').toLowerCase() + '.png';
  }

  getPlayerUrl(id: number): string { return '/playerDescription?playerId=' + id; }

  getPhoto(p: Player): string {
    return p.imgUrl || this.playerService.defaultPhoto;
  }

  getDivisiLabel(divisi: string): string {
    const map: Record<string, string> = { 'A': 'Men Senior', 'B': 'Men Junior', 'C': 'Women Senior', 'D': 'Women Junior' };
    return map[divisi] || divisi;
  }

  getGenderLabel(g: string): string { return g === 'M' ? 'Men' : 'Women'; }
}
