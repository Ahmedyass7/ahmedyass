import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Iproduct, enSize } from '../../models/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductDetailsComponent implements OnInit {
  product?: Iproduct;
  comments: { name: string; text: string; rating: number }[] = [];
  youMightLike: Iproduct[] = [];

  selectedColor: string = '';
  selectedSize: enSize | '' = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(productId)) {
      const prod = this.productService.getProductById(productId);
      if (prod) {
        this.product = prod;

        
        const extraColors = ['Red','Blue','Green','Yellow','Purple','Pink','Orange','Gray'];
        this.product.avaliableColor = Array.from(new Set([...this.product.avaliableColor, ...extraColors]));

        
        const extraSizes: enSize[] = Object.keys(enSize)
          .filter(k => isNaN(Number(k)))
          .map(k => enSize[k as keyof typeof enSize]);
        this.product.availableSizes = Array.from(new Set([...this.product.availableSizes, ...extraSizes]));

      
        this.selectedColor = this.product.avaliableColor[0] || '';
        this.selectedSize = this.product.availableSizes[0] || '';

        
        this.comments = this.productService.getCommentsByProductId(productId) || [];
        this.youMightLike = this.productService.getYouMightLike(productId) || [];
      }
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectSize(size: enSize) {
    this.selectedSize = size;
  }

  addToCart(): void {
    if (this.product) {
      console.log(`Added ${this.product.name} (Color: ${this.selectedColor}, Size: ${this.selectedSize}) to cart`);
      
    }
  }
    toggleFavorite(): void {
      if (this.product) {
        console.log('Added to favorites:', this.product.name);
        
      }
    }
    
  
  getStarsArray(rating: number): ('full' | 'empty')[] {
    const stars: ('full' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'full' : 'empty');
    }
    return stars;
  }
}
