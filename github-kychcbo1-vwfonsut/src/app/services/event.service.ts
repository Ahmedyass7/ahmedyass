import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from, map } from 'rxjs';
import { IEvent } from '../models/ievent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://jushwbjhewoafvszshnh.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1c2h3YmpoZXdvYWZ2c3pzaG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjI0NjMsImV4cCI6MjA3NTMzODQ2M30.Te4VAcMoKs1S0va2HXce5ylu6ELGOxTNQgBi9_N296s';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getAllEvents(): Observable<IEvent[]> {
    return from(
      this.supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: true })
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching events:', response.error);
          return [];
        }
        return response.data as IEvent[];
      })
    );
  }

  getUpcomingEvents(): Observable<IEvent[]> {
    const now = new Date().toISOString();
    return from(
      this.supabase
        .from('events')
        .select('*')
        .gte('start_date', now)
        .eq('is_completed', false)
        .order('start_date', { ascending: true })
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching upcoming events:', response.error);
          return [];
        }
        return response.data as IEvent[];
      })
    );
  }

  getEventById(id: string): Observable<IEvent | null> {
    return from(
      this.supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching event:', response.error);
          return null;
        }
        return response.data as IEvent;
      })
    );
  }

  createEvent(event: IEvent): Observable<IEvent | null> {
    return from(
      this.supabase
        .from('events')
        .insert([event])
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error creating event:', response.error);
          return null;
        }
        return response.data as IEvent;
      })
    );
  }

  updateEvent(id: string, event: Partial<IEvent>): Observable<IEvent | null> {
    return from(
      this.supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .maybeSingle()
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error updating event:', response.error);
          return null;
        }
        return response.data as IEvent;
      })
    );
  }

  deleteEvent(id: string): Observable<boolean> {
    return from(
      this.supabase
        .from('events')
        .delete()
        .eq('id', id)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error deleting event:', response.error);
          return false;
        }
        return true;
      })
    );
  }

  getEventsByDateRange(startDate: string, endDate: string): Observable<IEvent[]> {
    return from(
      this.supabase
        .from('events')
        .select('*')
        .gte('start_date', startDate)
        .lte('start_date', endDate)
        .order('start_date', { ascending: true })
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching events by date range:', response.error);
          return [];
        }
        return response.data as IEvent[];
      })
    );
  }
}
