import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { EventReminderComponent } from './pages/event-reminder/event-reminder.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'events', component: EventReminderComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: '**', redirectTo: '' }
];
