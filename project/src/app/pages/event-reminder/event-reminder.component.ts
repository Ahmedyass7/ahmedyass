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
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (minutesDiff <= event.reminder_minutes && minutesDiff > 0) {
        this.showNotification(event, minutesDiff, hoursDiff, daysDiff);
      }

      if (minutesDiff === 0) {
        this.showNotification(event, 0, 0, 0, true);
      }
    });
  }

  showNotification(event: IEvent, minutesLeft: number, hoursLeft: number, daysLeft: number, isNow: boolean = false): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      let timeMessage = '';

      if (isNow) {
        timeMessage = 'is starting now!';
      } else if (daysLeft > 0) {
        timeMessage = `starts in ${daysLeft} day${daysLeft > 1 ? 's' : ''} and ${hoursLeft % 24} hour${hoursLeft % 24 > 1 ? 's' : ''}`;
      } else if (hoursLeft > 0) {
        timeMessage = `starts in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} and ${minutesLeft % 60} minute${minutesLeft % 60 > 1 ? 's' : ''}`;
      } else {
        timeMessage = `starts in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`;
      }

      const notification = new Notification('Event Reminder', {
        body: `${event.title} ${timeMessage}${event.location ? '\nLocation: ' + event.location : ''}`,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: event.id || 'event',
        requireInteraction: isNow
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
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

  async addEvent(): Promise<void> {
    if (this.newEvent.title && this.newEvent.start_date) {
      const eventToCreate = {
        ...this.newEvent,
        start_date: new Date(this.newEvent.start_date).toISOString(),
        end_date: this.newEvent.end_date ? new Date(this.newEvent.end_date).toISOString() : undefined
      };

      const event = await this.eventService.createEvent(eventToCreate);

      if (event) {
        console.log('Event created successfully:', event);
        this.loadEvents();
        this.toggleAddForm();
      } else {
        alert('Failed to create event. Please try again.');
      }
    } else {
      alert('Please fill in the title and start date.');
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
