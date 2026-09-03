import { Component, OnInit } from "@angular/core";
import { TeamService } from "../../core/services/team.service";
import { Team } from "../../core/models/team.model";
@Component({ selector: "app-teams", templateUrl: "./teams.component.html", styleUrls: ["./teams.component.scss"] })
export class TeamsComponent implements OnInit {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  teams: Team[] = []; loading = true;
  constructor(private teamService: TeamService) {}
  ngOnInit() { this.teamService.getTeamsList().subscribe(d => { this.teams = d; this.loading = false; }); }
}
