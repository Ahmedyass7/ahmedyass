import { Component } from '@angular/core';
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { CommentBoxComponent } from "./components/comment-box/comment-box.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HeroSectionComponent } from "./components/hero-section/hero-section.component";
import { HeroBanerComponent } from "./components/hero-baner/hero-baner.component";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HomeComponent, CartComponent, RouterOutlet, NavbarComponent, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:'<app-navbar></app-navbar>, <router-outlet></router-outlet>'
})
export class AppComponent {

}
