// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { EventListComponent } from './features/event-discovery/event-list/event-list.component';
import { OrgDashboardLayoutComponent } from './features/org-dashboard/org-dashboard-layout/org-dashboard-layout.component';
import { EventFormComponent } from './features/org-dashboard/event-form/event-form.component';
import { AnalyticsComponent } from './features/org-dashboard/analytics/analytics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'discover', pathMatch: 'full' },
  { path: 'discover', component: EventListComponent },
  // مسار تفاصيل الفعالية (يتم تنفيذه لاحقًا)
  // { path: 'event/:id', component: EventDetailsComponent }, 
  // مسارات لوحة التحكم للمنظمات والمستخدمين (يتم تنفيذها لاحقًا)
  // { path: 'org-dashboard', loadComponent: () => import('./features/org-dashboard/org-dashboard.component').then(m => m.OrgDashboardComponent) },
  { path: '**', redirectTo: 'discover' }, // مسار لصفحة 404
];