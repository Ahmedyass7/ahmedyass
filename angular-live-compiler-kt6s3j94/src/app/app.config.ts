// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // استيراد الوحدة والـ Interceptors
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 1. تسجيل وحدة HttpClient
    provideHttpClient(
      // 2. إضافة الـ Interceptors (الترتيب مهم!)
      withInterceptors([
        authInterceptor,   // أولاً: إضافة الـ Token (إذا كان موجوداً)
        loadingInterceptor // ثانياً: إدارة حالة التحميل
      ])
    )
  ]
};