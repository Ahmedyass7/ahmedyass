// src/app/core/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. جلب رمز المصادقة (Token) من التخزين المحلي (Local Storage)
  const authToken = localStorage.getItem('auth_token');

  if (authToken) {
    // 2. نسخ الطلب وإضافة الـ Token إلى Header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    
    // 3. إرسال الطلب المعدّل
    return next(authReq);
  }

  // إذا لم يكن هناك Token، تابع بالطلب الأصلي
  return next(req);
};

// ملاحظة: في تطبيقات Angular القديمة، كان يتم استخدام Class Interceptors
// لكن في Standalone Components، نستخدم HttpInterceptorFn