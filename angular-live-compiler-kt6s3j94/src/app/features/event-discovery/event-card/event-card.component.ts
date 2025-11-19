// src/app/features/event-discovery/event-card/event-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../core/models/event.model';
import { RouterLink } from '@angular/router'; // لاستخدامه في الروابط

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="event-card">
      <img [src]="event.imageUrl" [alt]="event.title" class="event-image">
      <div class="card-content">
        <span class="category-tag">{{ event.category }}</span>
        <h3 class="event-title" [routerLink]="['/event', event.id]">{{ event.title }}</h3>
        <p class="event-date">{{ event.date | date: 'medium' }}</p>
        <p class="event-location">📍 {{ event.location.name }}</p>
        <div class="card-footer">
          <span *ngIf="event.isPrivate" class="private-badge">🔒 خاص</span>
          <button class="details-button">تفاصيل</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .event-card {
      /* تصميم بطاقة الفعالية هنا */
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }
    .event-card:hover {
      transform: translateY(-5px);
    }
    .event-image { height: 180px; width: 100%; object-fit: cover; }
    .card-content { padding: 15px; }
    /* ... بقية تنسيقات CSS */
  `]
})
export class EventCardComponent {
  @Input() event!: Event;
}