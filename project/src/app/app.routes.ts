import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { EventReminderComponent } from './pages/event-reminder/event-reminder.component';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'events', component: EventReminderComponent, canActivate: [authGuard] },
  { path: 'calendar', component: CalendarViewComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
