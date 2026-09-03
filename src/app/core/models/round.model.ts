// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Round {
  roundId: string;               // field tambahan wajar
  roundName: string;
  roundOrder: number;
  matches: import('./match.model').Match[];
}
