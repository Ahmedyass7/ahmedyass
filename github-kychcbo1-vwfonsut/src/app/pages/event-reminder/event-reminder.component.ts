import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { IEvent } from '../../models/ievent';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-event-reminder',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-reminder.component.html',
  styleUrl: './event-reminder.component.css'
})
export class EventReminderComponent implements OnInit, OnDestroy {
  events: IEvent[] = [];
  upcomingEvents: IEvent[] = [];
  newEvent: IEvent = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    reminder_minutes: 30,
    is_completed: false
  };

  showAddForm = false;
  private subscription?: Subscription;
  private reminderSubscription?: Subscription;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
    this.checkReminders();

    this.reminderSubscription = interval(60000).subscribe(() => {
      this.checkReminders();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.reminderSubscription?.unsubscribe();
  }

  loadEvents(): void {
    this.subscription = this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.upcomingEvents = events.filter(e =>
          !e.is_completed && new Date(e.start_date) > new Date()
        );
      },
      error: (err) => console.error('Error loading events:', err)
    });
  }

  checkReminders(): void {
    const now = new Date();

    this.upcomingEvents.forEach(event => {
      const eventDate = new Date(event.start_date);
      const timeDiff = eventDate.getTime() - now.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));

      if (minutesDiff <= event.reminder_minutes && minutesDiff > 0) {
        this.showNotification(event);
      }
    });
  }

  showNotification(event: IEvent): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Event Reminder', {
        body: `${event.title} starts in ${event.reminder_minutes} minutes`,
        icon: '/favicon.ico'
      });
    }
  }

  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addEvent(): void {
    if (this.newEvent.title && this.newEvent.start_date) {
      this.eventService.createEvent(this.newEvent).subscribe({
        next: (event) => {
          if (event) {
            this.loadEvents();
            this.toggleAddForm();
          }
        },
        error: (err) => console.error('Error creating event:', err)
      });
    }
  }

  toggleComplete(event: IEvent): void {
    if (event.id) {
      this.eventService.updateEvent(event.id, {
        is_completed: !event.is_completed
      }).subscribe({
        next: () => this.loadEvents(),
        error: (err) => console.error('Error updating event:', err)
      });
    }
  }

  deleteEvent(id?: string): void {
    if (id && confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => this.loadEvents(),
        error: (err) => console.error('Error deleting event:', err)
      });
    }
  }

  resetForm(): void {
    this.newEvent = {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      reminder_minutes: 30,
      is_completed: false
    };
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
