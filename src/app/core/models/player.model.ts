// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Player {
  id: string;                    // field tambahan wajar, tidak ditemukan eksplisit di referensi
  ittfId: number;                // ditemukan: ittfid 100001, 100032, dll
  playerName: string;            // ditemukan: endpoint GetPlayerListWithName, GetAllPlayers
  firstName?: string;
  lastName?: string;
  nationality: string;           // ditemukan: country_name di wtt_player_list
  nationalityCode: string;       // ditemukan: team_country_flag_bracket
  rankingPosition?: number;      // ditemukan: toprank_person_row .rank_holder
  rankingPoints?: number;        // ditemukan: toprank_person_row .points_holder
  profileImageUrl?: string;      // ditemukan: GetPlayerProfilePicWithIttfId, GetAllPlayerProfilePics
  sponsorLogoUrl?: string;       // ditemukan: .wtt_player_list .player_sponsor img
  gender?: 'M' | 'F';           // field tambahan wajar
  dateOfBirth?: string;          // field tambahan wajar
}
