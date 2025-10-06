import { Injectable } from '@angular/core';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Icategory[] ;

  constructor() {
      this.categories=[
        { id: 1, name: 'T-Shirts' },
        { id: 2, name: 'Shorts' },
        { id: 3, name: 'Hoodie' },
        { id: 4, name: 'Jeans' }
      ];
   }


   getCategories():Icategory[]{
    return this.categories;
   }

   
}
