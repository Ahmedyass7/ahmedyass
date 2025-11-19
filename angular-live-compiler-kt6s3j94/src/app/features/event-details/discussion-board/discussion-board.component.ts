// src/app/features/event-details/discussion-board/discussion-board.component.ts
// ... (النموذج والمنطق)
@Component({
  selector: 'app-discussion-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="discussion-container">
      <div class="messages">
        <div *ngFor="let message of messages" class="message-item">
          <strong>{{ message.user }}:</strong> {{ message.text }}
          <span class="timestamp">{{ message.time | date: 'shortTime' }}</span>
        </div>
      </div>
      <form [formGroup]="messageForm" (ngSubmit)="sendMessage()">
        <input type="text" formControlName="text" placeholder="اكتب سؤالك أو تعليقك هنا..." required>
        <button type="submit" [disabled]="messageForm.invalid">إرسال</button>
      </form>
    </div>
  `,
  // ... (الأنماط والمنطق)
})
export class DiscussionBoardComponent {
  @Input() eventId!: number;
  messages: any[] = [];
  messageForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required)
  });
  
  // يجب حقن خدمة WebSockets هنا (مثل SocketService)
  constructor(private fb: FormBuilder) {} 

  sendMessage() {
    if (this.messageForm.valid) {
      const message = { 
        eventId: this.eventId,
        text: this.messageForm.value.text,
        user: 'Current User'
      };
      // إرسال الرسالة عبر WebSockets إلى الخادم
      // this.socketService.send(message); 
      this.messages.push({ ...message, time: new Date() });
      this.messageForm.reset();
    }
  }
}