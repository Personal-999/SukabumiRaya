// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Ticket {
  ticketId: string;              // field tambahan wajar
  eventName: string;             // ditemukan: tickets/SingaporeSmash2023, tickets/wtt
  eventSlug: string;
  eventDate: string;
  venue?: string;
  price?: number;
  currency?: string;
  availability?: 'available' | 'sold_out' | 'limited'; // field tambahan wajar
  purchaseUrl?: string;
}
