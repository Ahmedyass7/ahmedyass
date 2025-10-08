import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  goToBrandCategory() {
    const brandCategoryId = 1;
    this.router.navigate(['/category'], { queryParams: { catId: brandCategoryId } });
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

  get userDisplayName(): string {
    if (!this.currentUser) return '';
    return this.currentUser.user_metadata?.['full_name'] || this.currentUser.email || 'User';
  }
}
