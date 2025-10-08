import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Icategory } from '../../models/icategory';
import { Iproduct, enDressStyle, enSize } from '../../models/iproduct';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  ourCategories: Icategory[] = [];
  allProducts: Iproduct[] = [];
  products: Iproduct[] = [];
  numberOfTotalProducts: number = 0;

  
  pageSize: number = 10;
  currentPage: number = 1;

  
  selectedCategoryId: number = 0;
  selectedStyleId: number = 0;
  selectedSize: enSize | null = null;
  selectedPrice: number = 0;
  selectedColor: string = '';

  
  lowPrice: number = 0;
  highPrice: number = 1000;
  colors = [
    { name: 'Red', value: '#dc3545' },
    { name: 'Blue', value: '#0d6efd' },
    { name: 'Green', value: '#198754' },
    { name: 'Purple', value: '#e207ff' },
    { name: 'Gray', value: '#6c757d' },
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
  ];

  enSize = enSize;
  sizes = Object.keys(enSize)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      key: k,
      value: enSize[k as keyof typeof enSize]
    }));

  enstyle = enDressStyle;
  styles = Object.keys(enDressStyle)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      key: k,
      value: enDressStyle[k as keyof typeof enDressStyle]
    }));

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.ourCategories = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    const lowHighPrice = this.productService.lowHighPrice();
    this.lowPrice = lowHighPrice.lowestPrice;
    this.highPrice = lowHighPrice.heightestPrice;
    this.selectedPrice = this.lowPrice;

    
    this.route.queryParams.subscribe(params => {
      const catId = +params['catId'] || 0;
      if (catId) this.selectedCategoryId = catId;

  
      this.allProducts = this.productService.applyFilter(0, 0, null, this.highPrice, '');
      this.numberOfTotalProducts = this.allProducts.length;
      this.currentPage = 1;
      this.paginateProducts();
    });
  }

  
  applyFilter() {
    let styleFilter: 0 | enDressStyle = 0;
    if (this.selectedStyleId in enDressStyle) {
      styleFilter = this.selectedStyleId as unknown as enDressStyle;
    }

    this.allProducts = this.productService.applyFilter(
      this.selectedCategoryId,
      styleFilter,
      this.selectedSize,
      this.selectedPrice,
      this.selectedColor
    );

    this.numberOfTotalProducts = this.allProducts.length;
    this.currentPage = 1;
    this.paginateProducts();
  }

  
  paginateProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.products = this.allProducts.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  selectSize(size: enSize) {
    this.selectedSize = size;
  }

  sortByLowPrice() {
    this.allProducts.sort((a, b) => a.price - b.price);
    this.paginateProducts();
  }

  sortByHighPrice() {
    this.allProducts.sort((a, b) => b.price - a.price);
    this.paginateProducts();
  }

  sortByLowDiscount() {
    this.allProducts.sort((a, b) => (a.discount || 0) - (b.discount || 0));
    this.paginateProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.numberOfTotalProducts / this.pageSize);
  }
}
