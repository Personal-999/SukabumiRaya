import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockTeams: Team[] = [
    { teamId: 't1', teamName: 'China', nationalityCode: 'cn', nationality: 'China', themeColor: '#DE2726' },
    { teamId: 't2', teamName: 'Japan', nationalityCode: 'jp', nationality: 'Japan', themeColor: '#BC002D' },
    { teamId: 't3', teamName: 'Germany', nationalityCode: 'de', nationality: 'Germany', themeColor: '#000000' },
    { teamId: 't4', teamName: 'Brazil', nationalityCode: 'br', nationality: 'Brazil', themeColor: '#009C3B' },
    { teamId: 't5', teamName: 'Sweden', nationalityCode: 'se', nationality: 'Sweden', themeColor: '#006AA7' },
  ];

  // Mengikuti pola endpoint: Teams/List
  getTeamsList(): Observable<Team[]> {
    return of(this.mockTeams);
  }

  // Mengikuti pola endpoint: cms/GetEventSchedule_TeamMatches
  getTeamMatches(eventId: string): Observable<any[]> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of([]);
  }
}
