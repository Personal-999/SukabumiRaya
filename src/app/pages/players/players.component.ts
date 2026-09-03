import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({ selector: 'app-players', templateUrl: './players.component.html', styleUrls: ['./players.component.scss'] })
export class PlayersComponent implements OnInit {

  // ===== VIEW MODE =====
  viewMode: 'list' | 'description' = 'list';
  activePlayer: any = null;

  // ===== LIST STATE =====
  searchQuery = '';
  selectedGender: 'Men' | 'Women' = 'Men';
  selectedDivisi: string = 'All';
  allPlayers: any[] = [];
  isLoading = false;

  readonly ALL_DIVISI = ['All', 'A', 'B', 'C', 'D', 'PELAJAR SD', '16', '17', '18', '19'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.loadPlayers();
    const url = this.router.url;
    if (url.includes('playerDescription')) {
      this.viewMode = 'description';
      this.route.queryParams.subscribe(params => {
        const id = params['playerId'];
        this.activePlayer = this.allPlayers.find((p: any) => String(p.id) === String(id)) || null;
      });
    }
  }

  loadPlayers() {
    this.isLoading = true;
    this.supabase.getPlayers().then(({ data, error }: any) => {
      this.isLoading = false;
      if (error) { console.error('loadPlayers error', error); return; }
      this.allPlayers = (data || []).map((p: any) => ({
        id: p.id,
        fullName: p.name || '',
        ptm: p.ptm || '',
        gender: p.gender || 'M',
        age: p.age || 0,
        divisi: p.division || 'A',
        playingStyle: p.playing_style || 'Shakehand',
        biography: p.bio || '',
        imgUrl: p.photo_url || '',
        country: p.country || 'Indonesia',
        countryCode: p.country_code || 'id',
      }));
      // If playerDescription route, find active player
      this.route.queryParams.subscribe(params => {
        const id = params['playerId'];
        if (id) { this.activePlayer = this.allPlayers.find((p: any) => String(p.id) === String(id)) || null; }
      });
    });
  }

  // ===== LIST HELPERS =====
  get filteredPlayers(): any[] {
    let list = [...this.allPlayers];
    // Only filter by gender if player has gender set; null/empty = show in Men (default)
    if (this.selectedGender === 'Men') {
      list = list.filter(p => p.gender !== 'F');
    } else {
      list = list.filter(p => p.gender === 'F');
    }
    if (this.selectedDivisi !== 'All') { list = list.filter(p => p.divisi === this.selectedDivisi); }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => (p.fullName || '').toLowerCase().includes(q) || (p.ptm || '').toLowerCase().includes(q));
    }
    return list;
  }

  get availableDivisi() { return this.ALL_DIVISI; }

  selectGender(g: 'Men' | 'Women') { this.selectedGender = g; this.selectedDivisi = 'All'; }

  getFlagUrl(code: string): string {
    return 'https://flagcdn.com/24x18/' + (code || 'xx').toLowerCase() + '.png';
  }
  getFlagUrlLg(code: string): string {
    return 'https://flagcdn.com/48x36/' + (code || 'xx').toLowerCase() + '.png';
  }
  getPlayerUrl(id: any): string { return '/playerDescription?playerId=' + id; }

  getPhoto(p: any): string {
    if (p.imgUrl) return p.imgUrl;
    if (p.gender === 'F') return 'https://wttwebcmsprod.blob.core.windows.net/websitefiles/images/general/women_default_left.png';
    return 'https://wttwebcmsprod.blob.core.windows.net/websitefiles/images/general/men_default_left.png';
  }

  getDivisiLabel(divisi: string): string {
    const map: Record<string, string> = {
      'A': 'Men Senior', 'B': 'Men Junior', 'C': 'Women Senior', 'D': 'Women Junior',
      'PELAJAR SD': 'Pelajar SD', '16': 'U-16', '17': 'U-17', '18': 'U-18', '19': 'U-19'
    };
    return map[divisi] || divisi;
  }
  getGenderLabel(g: string): string { return g === 'M' ? 'Men' : 'Women'; }
}
