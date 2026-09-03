import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockTickets: Ticket[] = [
    { ticketId: 'tkt1', eventName: 'WTT Grand Smash Singapore 2023', eventSlug: 'SingaporeSmash2023', eventDate: '2023-03-12', venue: 'Singapore Indoor Stadium', price: 50, currency: 'SGD', availability: 'sold_out' },
    { ticketId: 'tkt2', eventName: 'WTT Champions Frankfurt 2023', eventSlug: 'wtt', eventDate: '2023-07-19', venue: 'Porsche Arena Frankfurt', price: 40, currency: 'EUR', availability: 'available' },
  ];

  getTickets(): Observable<Ticket[]> {
    return of(this.mockTickets);
  }
}
