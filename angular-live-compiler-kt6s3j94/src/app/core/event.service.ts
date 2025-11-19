// src/app/core/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from './models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'API_ENDPOINT_FOR_EVENTS'; // يجب استبدالها بمسار الـ Backend

  constructor(private http: HttpClient) { }

  /**
   * جلب جميع الفعاليات (يستخدم لـ Event Aggregation)
   */
  getEvents(): Observable<Event[]> {
    // في بيئة الإنتاج، استخدم http.get<Event[]>(this.apiUrl)
    
    // مثال لبيانات وهمية
    const dummyEvents: Event[] = [
      { id: 1, title: 'مؤتمر التقنية 2025', description: 'نقاش حول الذكاء الاصطناعي', category: 'Tech', tags: ['AI', 'Future'], date: new Date('2025-12-10T10:00:00'), location: { name: 'قاعة المدينة', latitude: 30.033333, longitude: 31.233334 }, isPrivate: false, isRecurring: false, imageUrl: 'tech.jpg', organizerName: 'TechHub', attendeeCount: 150 },
      { id: 2, title: 'ورشة عمل الرسم', description: 'تعلم أساسيات الألوان المائية', category: 'Art', tags: ['Painting', 'Workshop'], date: new Date('2025-12-15T14:30:00'), location: { name: 'مركز الفنون', latitude: 30.08, longitude: 31.35 }, isPrivate: true, isRecurring: true, imageUrl: 'art.jpg', organizerName: 'Creative Minds', attendeeCount: 30 }
    ];
    return of(dummyEvents);
  }

  /**
   * جلب الفعاليات بناءً على كلمات البحث والتصفية
   */
  searchEvents(query: string, category: string): Observable<Event[]> {
    // هنا يتم بناء منطق التصفية أو إرسال طلب HTTP إلى API
    return this.getEvents().pipe(
      // مثال بسيط للتصفية
      // map(events => events.filter(e => e.title.includes(query) && e.category === category))
    );
  }

  /**
   * جلب التوصيات الشخصية (يعتمد على خدمة خلفية ذكية)
   */
  getPersonalRecommendations(userId: number): Observable<Event[]> {
    // يجب تنفيذ منطق معقد على الـ Backend
    return of([]);
  }
}