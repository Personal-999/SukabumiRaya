# WTT Feature Extraction
> Diekstrak dari `wtt-reference-main.js` dan `wtt-reference-vendor.js`
> Rekonstruksi berbasis analisis kode — markup HTML asli tidak tersedia.

---

## 1. Selector Komponen Angular (`app-*`) ditemukan di main.js

```
app-root           app-home           app-header         app-navbar (estimasi)
app-ranking        app-rankings       app-rank           app-race
app-player         app-players        app-profile        app-headtoheadcomparison
app-team           app-teams          app-brackets       app-group
app-match          app-results        app-live           app-leaderboard
app-event          app-events         app-featured       app-past
app-news / app-article / app-artcile / app-singlearticledescription
app-video          app-videos         app-videoslist     app-mainvideo
app-ticketing      app-sponsor        app-socialmedia
app-about          app-contactus      app-login          app-signup
app-gallery        app-media          app-document       app-technical
app-slick          app-carousel       app-banner         app-anouncement
app-myprofile      app-user           app-executive      app-board
app-faq            app-terms          app-privacy        app-prospectus
app-calendar       app-stream         app-hls            app-azure
app-wtt            app-wttc           app-globalpremium
```

---

## 2. Endpoint API ditemukan di main.js

### CMS Endpoints (`cms/Get*`)

| Endpoint | Domain |
|----------|--------|
| `cms/GetAllPlayers` | Players |
| `cms/GetAllRankingPlayers` | Rankings |
| `cms/GetRankersListByFilters` | Rankings |
| `cms/GetTop5Rankers` | Rankings |
| `cms/GetTopFavouritePlayers` | Players |
| `cms/GetFeaturedPlayer` | Players |
| `cms/GetPlayersDataByID` | Players |
| `cms/GetPlayersDataByUserId` | Players |
| `cms/GetPlayersListByFilters` | Players |
| `cms/GetPlayersListByLanguage` | Players |
| `cms/GetPlayersListByUserId` | Players |
| `cms/GetPlayersListWithIds` | Players |
| `cms/GetPlayerNames` | Players |
| `cms/GetPlayerListWithName` | Players |
| `cms/GetPlayerProfilePicWithIttfId` | Players |
| `cms/GetAllPlayerProfilePics` | Players |
| `cms/GetPlayersArticles` | Players+News |
| `cms/GetNonFeaturedArticlePlayers` | Players+News |
| `cms/GetPlayerEntriesforEvent` | Players+Events |
| `cms/GetPlayerEntriesforEventBySubEventId` | Players+Events |
| `cms/GetPlayerEntriesforEventBySubEventId_WithParticDetails` | Players+Events |
| `cms/GetPlayersSeedListforEventBySubEventId_WithParticDetails` | Players+Events |
| `cms/GetMatchDetailByPlayers` | Matches |
| `cms/GetMatchResultsById` | Matches |
| `cms/GetMatchCardDetails` | Matches |
| `cms/GetMatchCardDetails_Minimal` | Matches |
| `cms/GetMatchCardDetails_Signalr` | Matches (live) |
| `cms/GetLiveResult` | Matches (live) |
| `cms/GetLiveEvent` | Events (live) |
| `cms/GetLiveEventWithKey` | Events (live) |
| `cms/GetOfficialResult` | Matches |
| `cms/GetOfficialResult_Minimal` | Matches |
| `cms/GetPastResults` | Matches |
| `cms/GetEventDraws` | Matches/Draws |
| `cms/GetBrackets` | Matches/Bracket |
| `cms/GetPoolStandings` | Matches/Group |
| `cms/GetSubEventDrawSize` | Matches/Draws |
| `cms/GetEventSubEventForMatch` | Matches |
| `cms/GetEventSchedule` | Events |
| `cms/GetEventSchedule_TeamMatches` | Events/Teams |
| `cms/GetEventDescription` | Events |
| `cms/GetEventName` | Events |
| `cms/GetEventVenueDetailById` | Events |
| `cms/GetEventTypeList` | Events |
| `cms/GetEventTypeDetailsByCategoryId` | Events |
| `cms/GetEventTitleList` | Events |
| `cms/GetEventMedalists` | Events |
| `cms/GetEventWinners` | Events |
| `cms/GetEventWinnersByEventId` | Events |
| `cms/GetOfficialEventWinnerList` | Events |
| `cms/GetAllEventsOnlyWithEventName` | Events |
| `cms/GetAllEventsWithIds` | Events |
| `cms/GetAllLiveOrActiveEvents` | Events |
| `cms/GetAllLiveOrActiveEventsDetails` | Events |
| `cms/GetAllLiveOrActiveSubEventsDetails` | Events |
| `cms/GetPrizeMoneyForEvent` | Events |
| `cms/GetEventEquipment` | Equipment |
| `cms/GetEventEquipmentwithLogo` | Equipment |
| `cms/GetLatestArticle` | News |
| `cms/GetLatestArticleFilters` | News |
| `cms/GetLatestArticlesIsFeatured` | News |
| `cms/GetNewlyPublishedArticle` | News |
| `cms/GetTopStoriesArticles` | News |
| `cms/GetArticleDetailsBy_categories` | News |
| `cms/GetArticleDetailsByID` | News |
| `cms/GetArticlesWithIds` | News |
| `cms/GetArticleBlobWithContainer` | News |
| `cms/getarticle` | News |
| `cms/GetDetailedFavouriteArticle` | News |
| `cms/GetVideosByCategories` | Videos |
| `cms/GetVideoswithIds` | Videos |
| `cms/GetWttvideocategories` | Videos |
| `cms/GetWTTVideosListByCategory` | Videos |
| `cms/GetWTTVideosListByDefaultCategory` | Videos |
| `cms/GetLatestVideoFilters` | Videos |
| `cms/Get_SponsorDetails` | Sponsors |
| `cms/Get_SponsorDetails_ByPageName` | Sponsors |
| `cms/GetSponsorDetail` | Sponsors |
| `cms/GetSponsorDetails_ForPageFooter` | Sponsors |
| `cms/GetSponsors` | Sponsors |
| `cms/GetAllWTTGalleryList` | Gallery |
| `cms/GetGalleryPhotosListByGalleryID` | Gallery |
| `cms/GetBoardDetails` | About Us |
| `cms/GetMediaDocumentList` | Media/Docs |
| `cms/GetTechnicalDocumentsList` | Technical |
| `cms/GetAppSetting` | Config |
| `cms/GetResults` | Matches |

### Rankings Endpoints

| Endpoint | Domain |
|----------|--------|
| `Rankings/GetRankingHistoryIndividual` | Rankings |
| `Rankings/GetRankingHistoryPairs` | Rankings |
| `Rankings/GetRankingPointsBreakdown_FullList` | Rankings |
| `Events/GetRankingHistoryEventsIndividuals` | Rankings |
| `Events/GetRankingHistoryEventsPairs` | Rankings |
| `Matches/GetRankingHistoryMatchesIndividuals` | Rankings |
| `Matches/GetRankingHistoryMatchesPairs` | Rankings |
| `Matches/GetRankingHistoryMatchesPairsByPairId` | Rankings |

### Players Endpoints

| Endpoint | Domain |
|----------|--------|
| `Players/GetPlayers` | Players |
| `Players/Champions` | Players |
| `Players/GetPlayersHeadToHead` | Players |
| `Players/GetStatsByPlayer` | Players |
| `Players/GetRankingHistoryMatchesStatsIndividuals` | Players |
| `Players/GetRankingHistoryMatchesStatsPairs` | Players |
| `Players/GetRankingHistoryMatchesStatsPairsByPaidId` | Players |

### Live / Misc Endpoints

| Endpoint | Domain |
|----------|--------|
| `Matches/GetLiveMatches` | Live Scores |
| `Teams/List` | Teams |
| `TEAMS/2410` | Teams (event-specific) |

---

## 3. Entity Fields ditemukan di main.js

| Field | Contoh Nilai | Domain |
|-------|-------------|--------|
| `EventCategoryId` | 34, 35, 64, 65, 68, 69, 75, 81, 91, 96, 9999 | Events |
| `ittfid` | 100001, 100032, 100079, 100189, 100439, 100440 | Players |
| `SubEventId` | (ditemukan di endpoint path) | Events/Matches |
| `MatchId` | (ditemukan di endpoint path) | Matches |

---

## 4. Tabel Tingkat Kepercayaan Data Per Halaman (Fase 1c)

| Halaman | Entity Ditemukan | Endpoint Ditemukan | Selector Komponen | Tingkat Kepercayaan |
|---------|-----------------|-------------------|------------------|---------------------|
| **Matches / Draws** | EventCategoryId, SubEventId, MatchId | GetEventDraws, GetBrackets, GetPoolStandings, GetMatchCardDetails, GetLiveResult, GetMatchResultsById | app-match, app-brackets, app-group, app-results, app-live | **TINGGI** |
| **Rankings** | ittfid, EventCategoryId | GetRankingHistoryIndividual, GetRankingHistoryPairs, GetRankingPointsBreakdown, GetTop5Rankers, GetRankersListByFilters | app-ranking, app-rankings, app-rank, app-race | **TINGGI** |
| **Players** | ittfid | GetAllPlayers, GetPlayersDataByID, GetPlayersListByFilters, GetPlayersHeadToHead, GetStatsByPlayer, GetPlayerProfilePicWithIttfId | app-player, app-players, app-profile, app-headtoheadcomparison | **TINGGI** |
| **Teams** | TeamId (estimasi) | Teams/List, GetEventSchedule_TeamMatches, GetBrackets | app-team, app-teams, app-brackets | **TINGGI** |
| **News / Article** | ArticleId (estimasi) | GetLatestArticle, GetArticleDetailsByID, GetTopStoriesArticles, GetArticleDetailsBy_categories | app-news, app-article, app-singlearticledescription | **TINGGI** |
| **Videos** | VideoId (estimasi) | GetWTTVideosListByCategory, GetVideosByCategories, GetWttvideocategories, GetLatestVideoFilters | app-video, app-videos, app-videoslist, app-mainvideo | **TINGGI** |
| **Events** | EventId, EventCategoryId | GetAllEventsOnlyWithEventName, GetEventDescription, GetEventSchedule, GetEventVenueDetailById, GetEventMedalists | app-event, app-events | **TINGGI** |
| **Home** | (mix dari semua) | GetLatestArticle, GetTop5Rankers, GetLiveEvent, GetSponsors | app-home, app-banner, app-carousel, app-featured | **SEDANG** |
| **Tournaments** | EventId | GetOfficialEventWinnerList, GetEventWinners, GetAllEventsWithIds | app-wtt, app-wttc | **SEDANG** |
| **Tickets** | EventId | tickets/SingaporeSmash2023NaN, tickets/wtt | app-ticketing | **SEDANG** |
| **Calendar** | EventId (estimasi) | GetAllEventsOnlyWithEventName | app-calendar | **RENDAH** — hanya 1 selector |
| **Equipment** | EventId | GetEventEquipment, GetEventEquipmentwithLogo | (tidak ada selector spesifik) | **RENDAH** |
| **About Us** | BoardId (estimasi) | GetBoardDetails | app-about, app-executive | **RENDAH** |
| **Contact** | (tidak ada) | (tidak ada) | app-contactus | **RENDAH** — hanya 1 selector |

---

## 5. Modul-Per-Modul Breakdown

### Matches / Draws (TINGGI)
- Selector: `app-brackets`, `app-match`, `app-group`, `app-results`, `app-live`, `app-leaderboard`
- Endpoints: GetEventDraws, GetBrackets, GetPoolStandings, GetMatchCardDetails*, GetOfficialResult*
- CSS classes: `.bracket_span`, `.game_bracket_highlighter`, `.team_country_flag_bracket`

### Rankings (TINGGI)
- Selector: `app-ranking`, `app-rankings`, `app-race`
- Endpoints: GetRankingHistoryIndividual, GetRankingHistoryPairs, GetTop5Rankers
- CSS classes: `.toprank_person_row`, `.rankings_container`, `.ranking_last_updated_text`
- Chart: ApexCharts line chart (dari `ng-apexcharts`)

### Players (TINGGI)
- Selector: `app-player`, `app-players`, `app-headtoheadcomparison`
- Endpoints: GetPlayersDataByID, GetStatsByPlayer, GetPlayersHeadToHead
- CSS classes: `.wtt_player_list`, `.player_name`, `.country_name`

### News (TINGGI)
- Selector: `app-article`, `app-singlearticledescription`
- Endpoints: GetLatestArticle, GetArticleDetailsByID
- CSS classes: `.news_title_holder h1`, `.news_description_holder`

### Videos (TINGGI)
- Selector: `app-video`, `app-videos`, `app-mainvideo`
- Endpoints: GetWTTVideosListByCategory, GetWttvideocategories
- CSS: Slick Carousel (`.slick-slider`, `.slick-dots`)
- Fitur: kategori video, video player (Azure Media Player / HLS)

### Events (TINGGI)
- Selector: `app-event`, `app-events`
- Endpoints: GetEventDescription, GetEventSchedule, GetEventVenueDetailById, GetEventMedalists

### Home (SEDANG)
- Selector: `app-home`, `app-banner`, `app-carousel`, `app-featured`
- Mix dari semua service
- CSS: `.added_live_score_cards`, `.front_carousel_image`

### Calendar (RENDAH — interpretasi/estimasi)
- Selector: `app-calendar`
- Tidak ada endpoint Calendar spesifik ditemukan
- Kemungkinan menggunakan Events endpoints dengan filter tanggal

### Contact (RENDAH — interpretasi/estimasi)
- Selector: `app-contactus`
- Tidak ada endpoint Contact ditemukan
- Estimasi: form statis atau mailto
