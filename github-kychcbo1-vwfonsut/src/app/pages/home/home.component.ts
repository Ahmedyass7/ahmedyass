import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Iproduct } from '../../models/iproduct';
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FooterBannerComponent } from "../../components/footer-banner/footer-banner.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { HeroBanerComponent } from "../../components/hero-baner/hero-baner.component";
import { TextHeaderComponent } from "../../components/text-header/text-header.component";
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CommentBoxComponent } from "../../components/comment-box/comment-box.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    FooterBannerComponent,
    HeroSectionComponent,
    HeroBanerComponent,
    TextHeaderComponent,
    CustomButtonComponent,
    ProductCardComponent,
    CommentBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topSellingProducts!: Iproduct[];
  newArrivalProducts!: Iproduct[];
  boxs: number[] = [1, 2, 3, 4, 5];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.topSellingProducts = this.productService.topSellingArrivals();
    this.newArrivalProducts = this.productService.getNewArrivals();
  }

  handleAddToCart(productId: number) {
    console.log('Product added:', productId);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  trackById(index: number, item: Iproduct) {
    return item.id;
  }
}
