// src/app/features/event-details/rsvp-system/rsvp-system.component.ts
// ...
@Component({
  selector: 'app-rsvp-system',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rsvp-widget">
      <h4>هل ستحضر؟</h4>
      <div class="rsvp-options">
        <button [class.active]="status === 'Going'" (click)="updateRsvp('Going')">✅ سأحضر</button>
        <button [class.active]="status === 'Maybe'" (click)="updateRsvp('Maybe')">❓ ربما</button>
        <button [class.active]="status === 'NotGoing'" (click)="updateRsvp('NotGoing')">❌ لن أحضر</button>
      </div>
      <p>عدد الحاضرين المؤكد: <strong>{{ currentAttendees }}</strong></p>
    </div>
  `,
  styles: [`
    /* تصميم أزرار RSVP */
    .rsvp-options button { padding: 10px 15px; margin-left: 10px; border: 1px solid #ccc; cursor: pointer; }
    .rsvp-options .active { background-color: #007bff; color: white; border-color: #007bff; }
  `]
})
export class RsvpSystemComponent {
  @Input() eventId!: number;
  @Input() currentAttendees!: number;
  status: 'Going' | 'NotGoing' | 'Maybe' | null = null;

  // يجب جلب الحالة الحالية للمستخدم عند التحميل (OnInit)

  updateRsvp(newStatus: 'Going' | 'NotGoing' | 'Maybe'): void {
    if (this.status === newStatus) {
        this.status = null; // إلغاء الاختيار
    } else {
        this.status = newStatus;
    }
    // إرسال التحديث إلى الـ Backend
    console.log(`تم تحديث حالة RSVP للفعالية ${this.eventId} إلى: ${this.status}`);
  }
}