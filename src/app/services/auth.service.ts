import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'wtt_admin_token';
  // Credentials (hardcoded for demo — ganti dengan backend nanti)
  private readonly VALID_USER = 'admin';
  private readonly VALID_PASS = 'sukabumi2024';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.VALID_USER && password === this.VALID_PASS) {
      localStorage.setItem(this.KEY, btoa(`${username}:${Date.now()}`));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.KEY);
  }
}
