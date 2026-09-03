import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

// Labels dari wtt-reference-main.js baris 117789-117824
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  active_tab = "";
  mobile_menu_open = false;
  isLive = false;

  // Nav labels — sesuai text dari main.js
  navLabels = {
    news: "LATEST",
    video: "VIDEO",
    players: "PLAYERS",
    events: "EVENTS",
    matches: "MATCHES",
    live: "WATCH LIVE"
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Track active tab dari URL — logic dari main.js
    this.active_tab = this.router.url;
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.active_tab = e.urlAfterRedirects;
      this.mobile_menu_open = false;
    });
  }

  closeMenu() { this.mobile_menu_open = false; }
}
