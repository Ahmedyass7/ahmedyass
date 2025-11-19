// src/app/features/event-details/event-details-page/event-details-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../core/event.service';
import { Event } from '../../../core/models/event.model';
import { Observable } from 'rxjs';
import { RsvpSystemComponent } from '../rsvp-system/rsvp-system.component';
import { DiscussionBoardComponent } from '../discussion-board/discussion-board.component';
import { VotingPollsComponent } from '../voting-polls/voting-polls.component';

@Component({
  selector: 'app-event-details-page',
  standalone: true,
  imports: [CommonModule, RsvpSystemComponent, DiscussionBoardComponent, VotingPollsComponent],
  template: `
    <div class="event-detail-view" *ngIf="event$ | async as event">
      <header class="event-header">
        <h1>{{ event.title }}</h1>
        <div class="event-meta">
          <span>🗓️ {{ event.date | date: 'fullDate' }}</span>
          <span>📍 {{ event.location.name }}</span>
          <span *ngIf="event.isPrivate" class="badge-private">🔒 فعالية خاصة</span>
        </div>
      </header>
      
      <section class="rsvp-and-tickets">
        <app-rsvp-system [eventId]="event.id" [currentAttendees]="event.attendeeCount"></app-rsvp-system>
        </section>

      <section class="event-description">
        <h3>عن الفعالية</h3>
        <p>{{ event.description }}</p>
      </section>

      <section class="event-interaction">
        <h3>التفاعل والاستطلاعات</h3>
        <app-voting-polls [eventId]="event.id"></app-voting-polls>
      </section>

      <section class="event-discussion">
        <h3>لوحة المناقشة والأسئلة</h3>
        <app-discussion-board [eventId]="event.id"></app-discussion-board>
      </section>

      <section class="event-media">
        <h3>صور وذكريات من الفعالية</h3>
        </section>
      
    </div>
  `,
  styles: [`
    .event-detail-view { max-width: 1000px; margin: 30px auto; padding: 20px; }
    .event-header { border-bottom: 2px solid #eee; padding-bottom: 15px; margin-bottom: 20px; }
    .event-meta span { margin-left: 15px; color: #555; }
    section { margin-top: 40px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
  `]
})
export class EventDetailsPageComponent implements OnInit {
  event$!: Observable<Event>;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    // جلب الـ ID من المسار
    const eventId = this.route.snapshot.paramMap.get('id');
    
    if (eventId) {
      // يجب إضافة دالة getEventById في EventService
      // هذا مجرد مثال
      this.event$ = this.eventService.getEvents().pipe(
        // منطق بسيط لجلب فعالية واحدة من البيانات الوهمية
        // يجب أن يكون جلب مباشر من API: this.eventService.getEventById(+eventId)
        map(events => events.find(e => e.id === +eventId) as Event) 
      );
    }
  }
}