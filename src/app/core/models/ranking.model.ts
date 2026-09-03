// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Ranking {
  rank: number;                  // ditemukan: .toprank_person_row .rank_holder
  previousRank?: number;         // ditemukan: RankingDifference concept
  rankingDifference?: number;    // ditemukan: endpoint context GetRankingHistoryIndividual
  ittfId: number;                // ditemukan: ittfid field
  playerName: string;            // ditemukan: .name_holder
  nationality: string;
  nationalityCode: string;
  points: number;                // ditemukan: .points_holder
  lastUpdated?: string;          // ditemukan: .ranking_last_updated_text
  category?: 'individual' | 'pairs'; // ditemukan: GetRankingHistoryIndividual vs GetRankingHistoryPairs
}

export interface RankingHistoryEntry {
  eventId: string;               // field tambahan wajar
  eventName: string;
  date: string;
  points: number;
  rank: number;
}
