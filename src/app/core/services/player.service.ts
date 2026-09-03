import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockPlayers: Player[] = [
    { id: '1', ittfId: 101579, playerName: 'Fan Zhendong', firstName: 'Zhendong', lastName: 'Fan', nationality: 'China', nationalityCode: 'cn', rankingPosition: 1, rankingPoints: 13000, gender: 'M' },
    { id: '2', ittfId: 101581, playerName: 'Ma Long', firstName: 'Long', lastName: 'Ma', nationality: 'China', nationalityCode: 'cn', rankingPosition: 2, rankingPoints: 11500, gender: 'M' },
    { id: '3', ittfId: 101590, playerName: 'Tomokazu Harimoto', firstName: 'Tomokazu', lastName: 'Harimoto', nationality: 'Japan', nationalityCode: 'jp', rankingPosition: 3, rankingPoints: 10200, gender: 'M' },
    { id: '4', ittfId: 101600, playerName: 'Hugo Calderano', firstName: 'Hugo', lastName: 'Calderano', nationality: 'Brazil', nationalityCode: 'br', rankingPosition: 4, rankingPoints: 9800, gender: 'M' },
    { id: '5', ittfId: 201001, playerName: 'Chen Meng', firstName: 'Meng', lastName: 'Chen', nationality: 'China', nationalityCode: 'cn', rankingPosition: 1, rankingPoints: 12500, gender: 'F' },
    { id: '6', ittfId: 201002, playerName: 'Sun Yingsha', firstName: 'Yingsha', lastName: 'Sun', nationality: 'China', nationalityCode: 'cn', rankingPosition: 2, rankingPoints: 11800, gender: 'F' },
  ];

  // Mengikuti pola endpoint: cms/GetAllPlayers, Players/GetPlayers
  getAllPlayers(): Observable<Player[]> {
    return of(this.mockPlayers);
  }

  // Mengikuti pola endpoint: cms/GetPlayersDataByID
  getPlayerById(ittfId: number): Observable<Player> {
    return of(this.mockPlayers[0]);
  }

  // Mengikuti pola endpoint: cms/GetPlayersListByFilters
  getPlayersListByFilters(filters?: any): Observable<Player[]> {
    return of(this.mockPlayers);
  }

  // Mengikuti pola endpoint: cms/GetFeaturedPlayer
  getFeaturedPlayer(): Observable<Player> {
    return of(this.mockPlayers[0]);
  }

  // Mengikuti pola endpoint: Players/GetPlayersHeadToHead
  getPlayersHeadToHead(player1Id: number, player2Id: number): Observable<any> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of({ player1Wins: 7, player2Wins: 3, totalMatches: 10 });
  }

  // Mengikuti pola endpoint: Players/GetStatsByPlayer
  getStatsByPlayer(ittfId: number): Observable<any> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of({ wins: 45, losses: 12, winRate: 78.9, tournamentsPlayed: 18 });
  }
}
