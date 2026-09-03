// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Tournament {
  tournamentId: string;          // field tambahan wajar
  name: string;                  // ditemukan: GetAllEventsOnlyWithEventName, GetEventName
  eventCategoryId: number;       // ditemukan: EventCategoryId field
  location?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
  prize?: number;                // ditemukan: GetPrizeMoneyForEvent
  tier?: string;                 // ditemukan: --c-tier-theme-color
  winners?: TournamentWinner[];  // ditemukan: GetEventWinners, GetOfficialEventWinnerList
  medalists?: any[];             // ditemukan: GetEventMedalists
  imageUrl?: string;
}

export interface TournamentWinner {
  eventId: string;               // field tambahan wajar
  categoryName: string;
  playerName: string;
  nationality: string;
  year?: number;
}
