import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var require: any;
const SupabaseLib = require('@supabase/supabase-js');

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private sb: any;

  constructor() {
    this.sb = SupabaseLib.createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // EVENTS
  getEvents()                      { return this.sb.from('events').select('*').order('created_at'); }
  insertEvent(d: any)              { return this.sb.from('events').insert([d]).single(); }
  updateEvent(id: string, d: any)  { return this.sb.from('events').update(d).eq('id', id); }
  deleteEvent(id: string)          { return this.sb.from('events').delete().eq('id', id); }

  // PLAYERS
  getPlayers()                     { return this.sb.from('players').select('*').order('full_name'); }
  insertPlayer(d: any)             { return this.sb.from('players').insert(d); }
  updatePlayer(id: string, d: any) { return this.sb.from('players').update(d).eq('id', id); }
  deletePlayer(id: string)         { return this.sb.from('players').delete().eq('id', id); }

  // BRACKETS
  getAllBrackets() { return this.sb.from('brackets').select('*'); }
  getBracket(eventName: string, subEvent: string, size: number) {
    return this.sb.from('brackets').select('*')
      .eq('event_name', eventName).eq('sub_event', subEvent).eq('size', size)
      .single();
  }
  /** Find bracket by event+cabang only — to auto-detect stored size on load */
  getBracketByEventCabang(eventName: string, subEvent: string) {
    return this.sb.from('brackets').select('*')
      .eq('event_name', eventName).eq('sub_event', subEvent)
      .order('updated_at', { ascending: false })
      .limit(1);
  }
  async upsertBracket(eventName: string, subEvent: string, size: number, slots: any[]) {
    // Check if exists first (v1 upsert needs manual handling)
    const { data } = await this.sb.from('brackets').select('id')
      .eq('event_name', eventName).eq('sub_event', subEvent).eq('size', size).single();
    if (data && data.id) {
      return this.sb.from('brackets').update({ slots: slots, updated_at: new Date().toISOString() })
        .eq('id', data.id);
    } else {
      return this.sb.from('brackets').insert([{
        event_name: eventName, sub_event: subEvent, size: size, slots: slots,
        updated_at: new Date().toISOString()
      }]);
    }
  }
  deleteBracket(eventName: string, subEvent: string, size: number) {
    return this.sb.from('brackets').delete()
      .eq('event_name', eventName).eq('sub_event', subEvent).eq('size', size);
  }
  deleteBracketsByEvent(eventName: string) {
    return this.sb.from('brackets').delete().eq('event_name', eventName);
  }

  // MATCHES
  getMatches()                     { return this.sb.from('matches').select('*').order('created_at'); }
  insertMatch(d: any)              { return this.sb.from('matches').insert([d]); }
  updateMatch(id: string, d: any)  { return this.sb.from('matches').update(d).eq('id', id); }
  deleteMatch(id: string)          { return this.sb.from('matches').delete().eq('id', id); }
  deleteMatchesByEvent(eventName: string) { return this.sb.from('matches').delete().eq('event', eventName); }

  // NEWS
  getNews()                        { return this.sb.from('news').select('*').order('created_at', { ascending: false }); }
  insertNews(d: any)               { return this.sb.from('news').insert([d]); }
  updateNews(id: string, d: any)   { return this.sb.from('news').update(d).eq('id', id); }
  deleteNews(id: string)           { return this.sb.from('news').delete().eq('id', id); }

  // VIDEOS
  getVideos()                      { return this.sb.from('videos').select('*').order('created_at', { ascending: false }); }
  insertVideo(d: any)              { return this.sb.from('videos').insert([d]); }
  updateVideo(id: string, d: any)  { return this.sb.from('videos').update(d).eq('id', id); }
  deleteVideo(id: string)          { return this.sb.from('videos').delete().eq('id', id); }

  // POOLS
  getPools(eventName?: string) {
    let q = this.sb.from('pools').select('*').order('created_at');
    if (eventName) { q = q.eq('event_name', eventName); }
    return q;
  }
  insertPool(d: any)               { return this.sb.from('pools').insert([d]); }
  updatePool(id: string, d: any)   { return this.sb.from('pools').update(d).eq('id', id); }
  deletePool(id: string)           { return this.sb.from('pools').delete().eq('id', id); }
  deleteAllPlayers()               { return this.sb.from('players').delete().neq('id', '00000000-0000-0000-0000-000000000000'); }
  onPoolsChange(cb: () => void) { return this.sb.from('pools').on('*', cb).subscribe(); }

  // REALTIME (v1 syntax)
  onEventsChange(cb: () => void) {
    return this.sb.from('events').on('*', cb).subscribe();
  }
  onBracketsChange(cb: () => void) {
    return this.sb.from('brackets').on('*', cb).subscribe();
  }
  onMatchesChange(cb: () => void) {
    return this.sb.from('matches').on('*', cb).subscribe();
  }
}
