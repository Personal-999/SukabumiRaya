import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    // Kalau sudah login, langsung ke admin
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit() {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Username dan password wajib diisi.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const ok = this.auth.login(this.username, this.password);
      this.loading = false;
      if (ok) {
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Username atau password salah.';
      }
    }, 800);
  }
}
