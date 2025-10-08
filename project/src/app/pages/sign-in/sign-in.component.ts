import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  returnUrl = '/events';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/events';
  }

  async signIn() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { data, error } = await this.authService.signIn(this.email, this.password);

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
    } else {
      this.router.navigate([this.returnUrl]);
    }
  }

  async signInWithGoogle() {
    this.loading = true;
    this.errorMessage = '';

    const { error } = await this.authService.signInWithGoogle();

    if (error) {
      this.loading = false;
      this.errorMessage = error.message;
    }
  }
}
