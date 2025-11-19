// src/app/core/services/loading.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject لتتبع حالة التحميل (true = قيد التحميل)
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Observable للمكونات للاشتراك فيه (لتحديث واجهة المستخدم)
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  setLoading(isLoading: boolean): void {
    // تحديث الحالة
    this.loadingSubject.next(isLoading);
  }
}