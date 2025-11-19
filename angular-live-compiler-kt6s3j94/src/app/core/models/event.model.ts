// src/app/core/models/event.model.ts

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: Date;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  isPrivate: boolean; // Private & Public Events
  isRecurring: boolean;
  imageUrl: string;
  organizerName: string;
  attendeeCount: number;
}