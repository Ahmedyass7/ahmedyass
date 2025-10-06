
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule ]
})
export class ProductCardComponent {
  @Input() product!: Iproduct;

  
  @Output() buyAction = new EventEmitter<number>();

  addToCart() {
    this.buyAction.emit(this.product.id);
  }
  toggleFavorite() {
    console.log('Added to favorites:', this.product.name);
  }
}
