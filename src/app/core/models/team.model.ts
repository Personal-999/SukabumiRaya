// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Team {
  teamId: string;                // field tambahan wajar
  teamName: string;              // ditemukan: Teams/List, GetEventSchedule_TeamMatches
  nationalityCode: string;       // ditemukan: team_country_flag_bracket
  nationality: string;
  flagUrl?: string;
  players?: import('./player.model').Player[];
  themeColor?: string;           // ditemukan: --c-teams-theme-color, --c-teams-red-theme-gradient
}
