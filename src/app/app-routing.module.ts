import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Paths asli WTT dari wtt-reference-main.js baris 118360-118543
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule) },
  { path: "news", loadChildren: () => import("./pages/news/news.module").then(m => m.NewsModule) },
  { path: "headervideo", loadChildren: () => import("./pages/videos/videos.module").then(m => m.VideosModule) },
  { path: "videosbycategory/:categoryId", loadChildren: () => import("./pages/videos/videos.module").then(m => m.VideosModule) },
  { path: "playerslist", loadChildren: () => import("./pages/players/players.module").then(m => m.PlayersModule) },
  { path: "playerDescription", loadChildren: () => import("./pages/players/players.module").then(m => m.PlayersModule) },
  { path: "eventslist", loadChildren: () => import("./pages/events/events.module").then(m => m.EventsModule) },
  { path: "events_calendar", loadChildren: () => import("./pages/calendar/calendar.module").then(m => m.CalendarModule) },
  { path: "tickets", loadChildren: () => import("./pages/tickets/tickets.module").then(m => m.TicketsModule) },
  { path: "eventInfo", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "matches", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "results", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "headtoheadcomparison", loadChildren: () => import("./pages/players/players.module").then(m => m.PlayersModule) },
  { path: "bracktes", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "livevideo", loadChildren: () => import("./pages/videos/videos.module").then(m => m.VideosModule) },
  { path: "matchdetails", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "MatchCenter", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "PostMatchCenter", loadChildren: () => import("./pages/matches/matches.module").then(m => m.MatchesModule) },
  { path: "team", loadChildren: () => import("./pages/teams/teams.module").then(m => m.TeamsModule) },
  { path: "teamseventInfo", loadChildren: () => import("./pages/teams/teams.module").then(m => m.TeamsModule) },
  { path: "aboutus", loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsModule) },
  { path: "contact-us", loadChildren: () => import("./pages/contact/contact.module").then(m => m.ContactModule) },
  { path: "terms", loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsModule) },
  { path: "privacy", loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsModule) },
  { path: "login", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  { path: "admin", loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule) },
  { path: 'description', loadChildren: () => import('./pages/description/description.module').then(m => m.DescriptionModule) },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
