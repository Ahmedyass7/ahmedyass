// src/app/features/user-dashboard/smart-calendar/smart-calendar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // افتراض استخدام FullCalendar
import { EventInput } from '@fullcalendar/core'; // لتحديد نوع بيانات الأحداث
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../../core/event.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-smart-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  template: `
    <div class="calendar-container">
      <h3>🗓️ تقويمي الذكي</h3>
      <p>يتم مزامنة فعالياتك المنضمة والمتابعة تلقائيًا.</p>

      <full-calendar 
        [options]="calendarOptions"
        (eventClick)="handleEventClick($event)">
      </full-calendar>

      <div class="sync-options">
        <h4>خيارات المزامنة والتنبيه</h4>
        <button (click)="exportIcs()">📥 تصدير كـ ICS (Outlook/Apple)</button>
        <button (click)="syncGoogle()">🔗 ربط بـ Google Calendar</button>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container { padding: 20px; }
    .sync-options { margin-top: 20px; display: flex; gap: 10px; }
    .sync-options button { padding: 10px 15px; border-radius: 4px; border: 1px solid #ccc; cursor: pointer; }
  `]
})
export class SmartCalendarComponent implements OnInit {
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'ar', // دعم اللغة العربية
    events: [] as EventInput[] // سيتم ملؤها ببيانات الفعاليات
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    // 1. جلب الفعاليات المنضمة للمستخدم (افتراضياً ID=1)
    // في الواقع، يجب أن يكون هناك API لجلب الفعاليات الخاصة بالمستخدم.
    this.eventService.getEvents().pipe(
      // تحويل نموذج Event إلى نموذج EventInput الخاص بمكتبة التقويم
      map(events => events.map(event => ({
        id: event.id.toString(),
        title: event.title,
        start: event.date,
        color: event.isPrivate ? '#dc3545' : '#007bff' // تلوين حسب الخصوصية
      })))
    ).subscribe(calendarEvents => {
      this.calendarOptions = { ...this.calendarOptions, events: calendarEvents };
    });
  }

  handleEventClick(info: any) {
    alert(`تفاصيل الفعالية: ${info.event.title}`);
    // هنا يتم التوجيه إلى صفحة تفاصيل الفعالية
    // this.router.navigate(['/event', info.event.id]);
  }

  exportIcs() {
    // منطق إنشاء ملف .ics وتنزيله (يتطلب منطق Backend)
    console.log('تصدير فعاليات المستخدم إلى ملف ICS');
    alert('جارٍ تصدير ملف التقويم...');
  }

  syncGoogle() {
    // منطق البدء بعملية OAuth2 للمزامنة مع Google Calendar API
    console.log('بدء عملية ربط Google Calendar');
    alert('توجيه للمصادقة مع Google...');
  }
}