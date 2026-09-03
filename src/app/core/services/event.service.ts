import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockEvents: Tournament[] = [
    { tournamentId: 'ev001', name: 'WTT Grand Smash Singapore 2023', eventCategoryId: 35, location: 'Singapore', country: 'Singapore', startDate: '2023-03-12', endDate: '2023-03-19', prize: 2000000, tier: 'Grand Smash' },
    { tournamentId: 'ev002', name: 'WTT Champions Frankfurt 2023', eventCategoryId: 34, location: 'Frankfurt', country: 'Germany', startDate: '2023-07-19', endDate: '2023-07-23', prize: 500000, tier: 'Champions' },
    { tournamentId: 'ev003', name: 'WTT Contender Bangkok 2023', eventCategoryId: 64, location: 'Bangkok', country: 'Thailand', startDate: '2023-05-10', endDate: '2023-05-14', prize: 150000, tier: 'Contender' },
  ];

  // Mengikuti pola endpoint: cms/GetAllEventsOnlyWithEventName
  getAllEvents(): Observable<Tournament[]> {
    return of(this.mockEvents);
  }

  // Mengikuti pola endpoint: cms/GetAllLiveOrActiveEvents
  getLiveOrActiveEvents(): Observable<Tournament[]> {
    return of([]);
  }

  // Mengikuti pola endpoint: cms/GetEventDescription
  getEventById(eventId: string): Observable<Tournament> {
    return of(this.mockEvents[0]);
  }

  // Mengikuti pola endpoint: cms/GetEventSchedule
  getEventSchedule(eventId: string): Observable<any[]> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of([
      { date: '2023-03-12', session: 'Morning', matchCount: 8 },
      { date: '2023-03-13', session: 'Morning', matchCount: 8 },
    ]);
  }

  // Mengikuti pola endpoint: cms/GetEventWinners
  getEventWinners(eventId: string): Observable<any[]> {
    return of([]);
  }

  // Mengikuti pola endpoint: cms/GetPrizeMoneyForEvent
  getPrizeMoney(eventId: string): Observable<any> {
    return of({ totalPrize: 2000000, currency: 'USD' });
  }

  // Mengikuti pola endpoint: cms/GetSponsors
  getSponsors(pageName?: string): Observable<any[]> {
    // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
    return of([
      { sponsorId: 's1', name: 'DHS', logoUrl: 'https://via.placeholder.com/120x60', tier: 'Main' },
      { sponsorId: 's2', name: 'Seamaster', logoUrl: 'https://via.placeholder.com/120x60', tier: 'Partner' },
    ]);
  }
}
