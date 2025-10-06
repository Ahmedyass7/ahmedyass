import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { enSize, Iproduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  enSize = enSize;
  cartIds: number[] = [];
  productsCart: Iproduct[] = [];
  subTotal = 0;
  discount = 0;
  deliveryFee = 0;
  total = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cartIds = JSON.parse(localStorage.getItem('cart') || '[]');

    for (let id of this.cartIds) {
      const product = this.productService.getProductById(id);
      if (product) {
        this.productsCart.push(product);
        this.subTotal += product.price * product.payNumber;
      }
    }

    this.calculateTotals();
  }

  
  trackById(index: number, item: Iproduct): number {
    return item.id;
  }

  
  minusProductCount(product: Iproduct) {
    if (product.payNumber > 1) {
      product.payNumber -= 1;
      this.subTotal -= product.price;
      this.calculateTotals();
    }
  }

  plusProductCount(product: Iproduct) {
    if (product.payNumber < 10) {
      product.payNumber += 1;
      this.subTotal += product.price;
      this.calculateTotals();
    } else {
      alert('Cannot add more than 10');
    }
  }

  removeProduct(product: Iproduct) {
    const index = this.productsCart.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.subTotal -= product.price * product.payNumber;
      this.productsCart.splice(index, 1);

      
      this.cartIds = this.productsCart.map(p => p.id);
      localStorage.setItem('cart', JSON.stringify(this.cartIds));

      this.calculateTotals();
    }
  }

  applayDiscount(val: any) {
    if (!this.validateInput(+val)) return;

    this.discount = +val;
    this.calculateTotals();
    this.clearInput();
  }

  private calculateTotals() {
    this.deliveryFee = this.subTotal * (this.discount / 100);
    this.total = this.subTotal - this.deliveryFee;
  }

  private validateInput(val: number): boolean {
    if (val < 0 || val > 100) {
      this.clearInput();
      alert('❌ Please enter a valid discount between 0 and 100');
      return false;
    }
    return true;
  }

  private clearInput() {
    const textVal = document.getElementById('discountInput') as HTMLInputElement;
    if (textVal) textVal.value = '';
  }
}
