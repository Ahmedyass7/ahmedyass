import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async signUp() {
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { data, error } = await this.authService.signUp(
      this.email,
      this.password,
      this.fullName
    );

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.successMessage = 'Account created successfully! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/events']);
      }, 1500);
    }
  }

  async signUpWithGoogle() {
    this.loading = true;
    this.errorMessage = '';

    const { error } = await this.authService.signInWithGoogle();

    if (error) {
      this.loading = false;
      this.errorMessage = error.message;
    }
  }
}
