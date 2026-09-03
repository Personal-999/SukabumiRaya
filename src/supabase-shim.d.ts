// Custom type shim untuk @supabase/supabase-js agar kompatibel dengan TypeScript 3.5
declare module '@supabase/supabase-js' {
  export function createClient(supabaseUrl: string, supabaseKey: string, options?: any): SupabaseClient;
  export class SupabaseClient {
    from(table: string): SupabaseQueryBuilder;
    channel(name: string): RealtimeChannel;
  }
  export interface SupabaseQueryBuilder {
    select(columns?: string): this;
    insert(data: any): this;
    update(data: any): this;
    delete(): this;
    upsert(data: any, opts?: any): this;
    eq(col: string, val: any): this;
    neq(col: string, val: any): this;
    order(col: string, opts?: any): this;
    single(): Promise<{ data: any; error: any }>;
    maybeSingle(): Promise<{ data: any; error: any }>;
    then(onfulfilled?: (value: { data: any; error: any }) => any): Promise<any>;
  }
  export interface RealtimeChannel {
    on(event: string, filter: any, cb: (payload?: any) => void): this;
    subscribe(): this;
    unsubscribe(): void;
  }
}
