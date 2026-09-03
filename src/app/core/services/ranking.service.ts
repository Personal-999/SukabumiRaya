import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ranking, RankingHistoryEntry } from '../models/ranking.model';

@Injectable({ providedIn: 'root' })
export class RankingService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockRankings: Ranking[] = [
    { rank: 1, previousRank: 1, rankingDifference: 0, ittfId: 101579, playerName: 'Fan Zhendong', nationality: 'China', nationalityCode: 'cn', points: 13000, category: 'individual' },
    { rank: 2, previousRank: 2, rankingDifference: 0, ittfId: 101581, playerName: 'Ma Long', nationality: 'China', nationalityCode: 'cn', points: 11500, category: 'individual' },
    { rank: 3, previousRank: 4, rankingDifference: 1, ittfId: 101590, playerName: 'Tomokazu Harimoto', nationality: 'Japan', nationalityCode: 'jp', points: 10200, category: 'individual' },
    { rank: 4, previousRank: 3, rankingDifference: -1, ittfId: 101600, playerName: 'Hugo Calderano', nationality: 'Brazil', nationalityCode: 'br', points: 9800, category: 'individual' },
    { rank: 5, previousRank: 5, rankingDifference: 0, ittfId: 101612, playerName: 'Truls Moregard', nationality: 'Sweden', nationalityCode: 'se', points: 9100, category: 'individual' },
  ];

  // Mengikuti pola endpoint: Rankings/GetRankingHistoryIndividual
  getRankingHistoryIndividual(): Observable<Ranking[]> {
    return of(this.mockRankings.filter(r => r.category === 'individual'));
  }

  // Mengikuti pola endpoint: Rankings/GetRankingHistoryPairs
  getRankingHistoryPairs(): Observable<Ranking[]> {
    return of([]);
  }

  // Mengikuti pola endpoint: cms/GetTop5Rankers
  getTop5Rankers(): Observable<Ranking[]> {
    return of(this.mockRankings.slice(0, 5));
  }

  // Mengikuti pola endpoint: cms/GetRankersListByFilters
  getRankersListByFilters(filters?: any): Observable<Ranking[]> {
    return of(this.mockRankings);
  }

  // Mengikuti pola endpoint: Rankings/GetRankingPointsBreakdown_FullList
  getRankingPointsBreakdown(ittfId: number): Observable<RankingHistoryEntry[]> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of([
      { eventId: 'ev001', eventName: 'WTT Grand Smash Singapore', date: '2023-03-01', points: 3200, rank: 1 },
      { eventId: 'ev002', eventName: 'WTT Contender Bangkok', date: '2023-05-15', points: 1500, rank: 2 },
      { eventId: 'ev003', eventName: 'WTT Champions Frankfurt', date: '2023-07-20', points: 2200, rank: 1 },
    ]);
  }
}
