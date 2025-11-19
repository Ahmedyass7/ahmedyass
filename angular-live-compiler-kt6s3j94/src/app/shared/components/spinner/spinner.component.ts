// src/app/shared/components/spinner/spinner.component.ts (مثال)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loadingService.loading$ | async" class="spinner-overlay">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>
  `,
  styles: [`
    .spinner-overlay { /* أنماط التغطية الشاملة */ }
    .spinner { /* أنماط أيقونة التحميل */ }
  `]
})
export class SpinnerComponent {
  constructor(public loadingService: LoadingService) {}
}

// يتم تضمين هذا المكون في AppComponent أو في Layouts
// ليظهر فوق المحتوى بالكامل عند تحميل أي بيانات.