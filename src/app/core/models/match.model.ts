// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Match {
  matchId: string;               // ditemukan: GetMatchCardDetails, GetMatchResultsById
  subEventId: number;            // ditemukan: GetEventSubEventForMatch
  eventCategoryId: number;       // ditemukan: EventCategoryId 34,35,64,65,68,69,75,81,91,96
  player1Name: string;
  player1IttfId: number;
  player1Nationality: string;
  player1NationalityCode: string;
  player2Name: string;
  player2IttfId: number;
  player2Nationality: string;
  player2NationalityCode: string;
  player1Score?: number;
  player2Score?: number;
  gameSets?: GameSet[];          // field tambahan wajar
  isLive?: boolean;              // ditemukan: GetLiveResult, GetMatchCardDetails_Signalr
  matchDate?: string;
  round?: string;
  winnerId?: number;             // field tambahan wajar
}

export interface GameSet {
  setNumber: number;             // field tambahan wajar
  player1Points: number;
  player2Points: number;
}
