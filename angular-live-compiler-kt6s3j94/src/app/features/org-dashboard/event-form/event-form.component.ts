// src/app/features/org-dashboard/event-form/event-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EventService } from '../../../core/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>إنشاء فعالية جديدة</h2>
      <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
        
        <section>
          <h3>المعلومات الأساسية</h3>
          <input type="text" formControlName="title" placeholder="عنوان الفعالية" required>
          <textarea formControlName="description" placeholder="الوصف"></textarea>
          <select formControlName="category">
            <option value="">اختر الفئة</option>
            <option value="Tech">تقنية</option>
            <option value="Art">فنون</option>
            </select>
        </section>

        <section class="grid-2">
          <h3>التوقيت والموقع</h3>
          <input type="datetime-local" formControlName="date" required>
          <input type="text" formControlName="locationName" placeholder="اسم الموقع (مثال: قاعة النور)">
          <input type="number" formControlName="latitude" placeholder="خط العرض (Latitude)">
          <input type="number" formControlName="longitude" placeholder="خط الطول (Longitude)">
        </section>

        <section>
          <h3>الفعالية المتكررة</h3>
          <label>
            <input type="checkbox" formControlName="isRecurring"> 
            فعالية متكررة (يومي، أسبوعي، شهري)
          </label>
          
          <div *ngIf="eventForm.get('isRecurring')?.value" class="recurring-options">
            <select formControlName="recurrenceType">
              <option value="weekly">أسبوعي</option>
              <option value="monthly">شهري</option>
              </select>
            <input type="number" formControlName="recurrenceLimit" placeholder="عدد التكرارات">
          </div>
        </section>

        <section>
          <h3>الخصوصية</h3>
          <label>
            <input type="radio" formControlName="privacyType" value="public"> 
            عامة (Public)
          </label>
          <label>
            <input type="radio" formControlName="privacyType" value="private"> 
            خاصة (Private - تتطلب موافقة)
          </label>
        </section>
        
        <section formArrayName="tickets">
          <h3>نظام التذاكر</h3>
          <div *ngFor="let ticketGroup of tickets.controls; let i = index" [formGroupName]="i" class="ticket-group">
            <input type="text" formControlName="name" placeholder="اسم التذكرة (مثال: دخول VIP)">
            <input type="number" formControlName="price" placeholder="السعر (0 للمجانية)">
            <input type="number" formControlName="capacity" placeholder="السعة/الكمية">
            <button type="button" (click)="removeTicket(i)">حذف</button>
          </div>
          <button type="button" (click)="addTicket()">+ إضافة نوع تذكرة</button>
        </section>
        
        <button type="submit" [disabled]="eventForm.invalid">حفظ الفعالية</button>
      </form>
    </div>
  `,
  styles: [`
    /* تصميم بسيط للنموذج */
    .form-container { max-width: 800px; margin: 30px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    input[type="text"], input[type="number"], textarea, select { width: 100%; padding: 10px; margin: 8px 0; box-sizing: border-box; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  `]
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      date: ['', Validators.required],
      locationName: [''],
      latitude: [null],
      longitude: [null],
      // Recurring Events
      isRecurring: [false],
      recurrenceType: ['weekly'],
      recurrenceLimit: [10],
      // Privacy
      privacyType: ['public', Validators.required], // 'public' or 'private'
      // Ticketing System
      tickets: this.fb.array([this.createTicketGroup()])
    });
  }

  // Getter للوصول السهل إلى FormArray
  get tickets(): FormArray {
    return this.eventForm.get('tickets') as FormArray;
  }

  // دالة لإنشاء مجموعة تحكم للتذاكر
  createTicketGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.min(0)],
      capacity: [null, Validators.min(1)],
    });
  }

  addTicket(): void {
    this.tickets.push(this.createTicketGroup());
  }

  removeTicket(index: number): void {
    this.tickets.removeAt(index);
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('بيانات الفعالية جاهزة للإرسال:', this.eventForm.value);
      // هنا يتم استدعاء خدمة الـ EventService لإرسال البيانات إلى الخادم
      // this.eventService.createEvent(this.eventForm.value).subscribe(...);
    }
  }
}