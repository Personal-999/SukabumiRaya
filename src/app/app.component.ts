import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


const FUN_FACTS = [
  'Tahukah Anda? Rally tenis meja terlama berlangsung selama 3 menit 20 detik!',
  'Tahukah Anda? Bola tenis meja bisa melaju lebih dari 100 km/jam!',
  'Tahukah Anda? Tenis meja dimainkan oleh lebih dari 300 juta orang di seluruh dunia!',
  'Tahukah Anda? Bet tenis meja bisa memutar bola hingga 150 kali per detik!',
  'Tahukah Anda? Tenis meja menjadi cabang Olimpiade sejak tahun 1988!',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wtt-rebuild';
  isLoading = true;
  showShell = true;
  funFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
  private noShellRoutes = ['/login', '/admin'];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // ── Seed localStorage from bundled /assets/seed.json ──────────────────
    // Only writes keys that don't already exist in localStorage.
    // Allows incognito / new browsers to see published tournament data.
    this.http.get<any>('/assets/seed.json').subscribe({
      next: (seed) => {
        const SEED_VERSION_KEY = '_seed_version';
        const bundledVersion = seed._version || 1;
        const loadedVersion = parseInt(localStorage.getItem(SEED_VERSION_KEY) || '0', 10);
        if (bundledVersion > loadedVersion) {
          // Apply seed: overwrite only the data keys (not bracket keys)
          const DATA_KEYS = ['wtt_events_v2', 'wtt_matches_v1', 'wtt_draws_cache'];
          DATA_KEYS.forEach(k => {
            if (seed[k] && seed[k].length > 0) {
              localStorage.setItem(k, JSON.stringify(seed[k]));
            }
          });
          // Restore bracket keys listed in seed
          const bracketKeys: string[] = seed.wtt_bracket_keys || [];
          bracketKeys.forEach((bk: string) => {
            if (seed[bk] && seed[bk].length > 0) {
              localStorage.setItem(bk, JSON.stringify(seed[bk]));
            }
          });
          localStorage.setItem(SEED_VERSION_KEY, String(bundledVersion));
        }
      },
      error: () => { /* seed.json not present or empty — skip silently */ }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        this.funFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isLoading = false;
        }, 400);
        if (event instanceof NavigationEnd) {
          const url = event.urlAfterRedirects;
          this.showShell = !this.noShellRoutes.some(r => url.startsWith(r));
        }
      }
    });
  }
}
