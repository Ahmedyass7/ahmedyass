// src/app/features/event-discovery/event-list/event-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../core/event.service';
import { Event } from '../../../core/models/event.model';
import { EventCardComponent } from '../event-card/event-card.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent, SearchFilterComponent],
  template: `
    <div class="event-discovery-container">
      <h2>اكتشف فعاليات جديدة</h2>
      
      <app-search-filter (searchParams)="onSearch($event)"></app-search-filter>

      <section class="recommendations">
        <h3>توصيات لك</h3>
        </section>

      <div class="events-grid">
        <ng-container *ngIf="events$ | async as events">
          <app-event-card *ngFor="let event of events" [event]="event"></app-event-card>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
  `]
})
export class EventListComponent implements OnInit {
  events$!: Observable<Event[]>;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    // جلب الفعاليات المجمّعة عند تحميل الصفحة
    this.events$ = this.eventService.getEvents();
    // جلب التوصيات الشخصية (ستحتاج إلى معرف المستخدم)
    this.eventService.getPersonalRecommendations(1).subscribe(recs => {
      console.log('التوصيات:', recs);
    });
  }

  onSearch(params: { query: string, category: string }) {
    console.log('معلمات البحث:', params);
    // تحديث قائمة الفعاليات بناءً على البحث
    this.events$ = this.eventService.searchEvents(params.query, params.category);
  }
}