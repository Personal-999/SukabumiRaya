import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Match } from '../models/match.model';

@Injectable({ providedIn: 'root' })
export class MatchService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockMatches: Match[] = [
    {
      matchId: 'M001', subEventId: 1, eventCategoryId: 35,
      player1Name: 'Fan Zhendong', player1IttfId: 101579, player1Nationality: 'China', player1NationalityCode: 'cn',
      player2Name: 'Ma Long', player2IttfId: 101581, player2Nationality: 'China', player2NationalityCode: 'cn',
      player1Score: 4, player2Score: 2, isLive: false, round: 'Final',
      gameSets: [
        { setNumber: 1, player1Points: 11, player2Points: 8 },
        { setNumber: 2, player1Points: 11, player2Points: 9 },
        { setNumber: 3, player1Points: 9, player2Points: 11 },
        { setNumber: 4, player1Points: 11, player2Points: 7 },
        { setNumber: 5, player1Points: 8, player2Points: 11 },
        { setNumber: 6, player1Points: 11, player2Points: 6 },
      ]
    },
    {
      matchId: 'M002', subEventId: 1, eventCategoryId: 35,
      player1Name: 'Tomokazu Harimoto', player1IttfId: 101590, player1Nationality: 'Japan', player1NationalityCode: 'jp',
      player2Name: 'Hugo Calderano', player2IttfId: 101600, player2Nationality: 'Brazil', player2NationalityCode: 'br',
      player1Score: 4, player2Score: 1, isLive: false, round: 'Semifinal',
    }
  ];

  // Mengikuti pola endpoint: cms/GetEventDraws
  getEventDraws(subEventId?: number): Observable<Match[]> {
    return of(this.mockMatches);
  }

  // Mengikuti pola endpoint: cms/GetMatchCardDetails
  getMatchCardDetails(matchId: string): Observable<Match> {
    return of(this.mockMatches[0]);
  }

  // Mengikuti pola endpoint: cms/GetLiveResult + Matches/GetLiveMatches
  getLiveMatches(): Observable<Match[]> {
    return of([]);
  }

  // Mengikuti pola endpoint: cms/GetOfficialResult
  getOfficialResult(eventId: string): Observable<Match[]> {
    return of(this.mockMatches);
  }

  // Mengikuti pola endpoint: cms/GetPoolStandings
  getPoolStandings(subEventId: number): Observable<any[]> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of([
      { groupName: 'Group A', position: 1, teamName: 'China', wins: 3, losses: 0, points: 6 },
      { groupName: 'Group A', position: 2, teamName: 'Japan', wins: 2, losses: 1, points: 4 },
      { groupName: 'Group A', position: 3, teamName: 'Germany', wins: 1, losses: 2, points: 2 },
      { groupName: 'Group A', position: 4, teamName: 'Brazil', wins: 0, losses: 3, points: 0 },
    ]);
  }
}
