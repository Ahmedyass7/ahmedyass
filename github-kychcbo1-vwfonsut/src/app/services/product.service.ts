import { Injectable } from '@angular/core';
import { Iproduct, enDressStyle, enSize } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Iproduct[] = [];
  private comments: { [key: number]: { name: string; text: string; rating: number }[] } = {};
  private youMightLike: { [key: number]: Iproduct[] } = {};

  constructor() {
    this.products = [
      { id: 1, catId: 1, name: 'Classic White T-Shirt', description: 'Soft cotton T-shirt for daily wear.', discount: 10, avaliableColor: ['White', 'Black'], availableSizes: [enSize.small, enSize.medium, enSize.large], imagePath: ['assets/images/products/p01.png'], rate: 4.5, price: 25, payNumber: 1, dressStyle: enDressStyle.casual },
      { id: 2, catId: 1, name: 'Graphic Tee', description: 'Trendy printed T-shirt with vibrant colors.', discount: 15, avaliableColor: ['Red', 'Blue'], availableSizes: [enSize.medium, enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p02.png'], rate: 4.2, price: 30, payNumber: 1, dressStyle: enDressStyle.casual },
      { id: 3, catId: 1, name: 'V-Neck T-Shirt', description: 'Lightweight V-neck T-shirt.', discount: 5, avaliableColor: ['Black','Gray'], availableSizes: [enSize.small, enSize.medium], imagePath: ['assets/images/products/p03.png'], rate: 4.0, price: 22, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 4, catId: 1, name: 'Sporty Dry-Fit Tee', description: 'Moisture-wicking T-shirt.', discount: 20, avaliableColor: ['Green','Gray'], availableSizes: [enSize.medium, enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p04.png'], rate: 4.7, price: 35, payNumber:1, dressStyle: enDressStyle.gym },
      { id: 5, catId: 1, name: 'Oversized Streetwear Tee', description: 'Trendy oversized T-shirt.', discount: 0, avaliableColor: ['Black','Beige'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p05.png'], rate: 4.3, price: 40, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 6, catId: 2, name: 'Denim Shorts', description: 'Classic blue denim shorts.', discount: 10, avaliableColor: ['Blue','Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p06.png'], rate: 4.4, price: 28, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 7, catId: 2, name: 'Running Shorts', description: 'Lightweight shorts for running.', discount: 15, avaliableColor: ['Gray','Navy'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p07.png'], rate: 4.6, price: 32, payNumber:1, dressStyle: enDressStyle.gym },
      { id: 8, catId: 2, name: 'Cargo Shorts', description: 'Multi-pocket cargo shorts.', discount: 5, avaliableColor: ['Khaki','Olive'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p08.png'], rate: 4.1, price: 35, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 9, catId: 2, name: 'Beach Shorts', description: 'Colorful beach shorts.', discount: 20, avaliableColor: ['Red','Yellow','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/P09-1.png'], rate: 4.3, price: 27, payNumber:1, dressStyle: enDressStyle.party },
      { id: 10, catId: 2, name: 'Formal Chino Shorts', description: 'Smart chino shorts.', discount: 0, avaliableColor: ['Black','White'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p13.png'], rate: 4.0, price: 45, payNumber:1, dressStyle: enDressStyle.formal },
      { id: 11, catId: 3, name: 'Pullover Hoodie', description: 'Warm fleece hoodie.', discount: 10, avaliableColor: ['Gray','Navy'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p15.png'], rate: 4.8, price: 55, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 12, catId: 3, name: 'Zip-Up Hoodie', description: 'Lightweight zip hoodie.', discount: 5, avaliableColor: ['Black','White'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p17.png'], rate: 4.5, price: 50, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 13, catId: 3, name: 'Sport Hoodie', description: 'Stretch-fit training hoodie.', discount: 20, avaliableColor: ['Blue','Green'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p13.png'], rate: 4.6, price: 65, payNumber:1, dressStyle: enDressStyle.gym },
      { id: 14, catId: 3, name: 'Oversized Hoodie', description: 'Relaxed-fit oversized hoodie.', discount: 0, avaliableColor: ['Beige','Brown'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p14.png'], rate: 4.2, price: 60, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 15, catId: 3, name: 'Party Hoodie', description: 'Stylish hoodie with prints.', discount: 15, avaliableColor: ['Red','Purple'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p15.png'], rate: 4.3, price: 70, payNumber:1, dressStyle: enDressStyle.party },
      { id: 16, catId: 4, name: 'Slim Fit Jeans', description: 'Classic slim fit jeans.', discount: 5, avaliableColor: ['Blue','Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p16.png'], rate: 4.4, price: 60, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 17, catId: 4, name: 'Regular Fit Jeans', description: 'Comfortable regular fit jeans.', discount: 0, avaliableColor: ['Dark Blue','Gray'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p17.png'], rate: 4.2, price: 55, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 18, catId: 4, name: 'Ripped Jeans', description: 'Trendy ripped jeans.', discount: 10, avaliableColor: ['Light Blue','Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p18.png'], rate: 4.5, price: 65, payNumber:1, dressStyle: enDressStyle.party },
      { id: 19, catId: 4, name: 'Bootcut Jeans', description: 'Classic bootcut jeans.', discount: 20, avaliableColor: ['Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p19.png'], rate: 4.1, price: 70, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 20, catId: 4, name: 'Formal Black Jeans', description: 'Sleek black jeans.', discount: 0, avaliableColor: ['Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p14.png'], rate: 4.0, price: 80, payNumber:1, dressStyle: enDressStyle.formal },
      { id: 21, catId: 1, name: 'Summer Graphic Tee', description: 'Bright summer T-shirt.', discount: 10, avaliableColor: ['Yellow','Red'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p15.png'], rate: 4.3, price: 27, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 22, catId: 1, name: 'Eco Cotton Tee', description: 'Eco-friendly cotton.', discount: 5, avaliableColor: ['Green','White'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p16.png'], rate: 4.1, price: 32, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 23, catId: 1, name: 'Retro Print Tee', description: 'Vintage style.', discount: 15, avaliableColor: ['Blue','Purple'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p17.png'], rate: 4.4, price: 35, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 24, catId: 2, name: 'Beach Party Shorts', description: 'Bright and comfy.', discount: 20, avaliableColor: ['Red','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p18.png'], rate: 4.5, price: 30, payNumber:1, dressStyle: enDressStyle.party },
      { id: 25, catId: 2, name: 'Khaki Cargo Shorts', description: 'Casual cargo style.', discount: 5, avaliableColor: ['Khaki','Olive'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p19.png'], rate: 4.2, price: 33, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 26, catId: 2, name: 'Sport Shorts', description: 'Breathable for workouts.', discount: 10, avaliableColor: ['Gray','Navy'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p01.png'], rate: 4.3, price: 28, payNumber:1, dressStyle: enDressStyle.gym },
      { id: 27, catId: 3, name: 'Hoodie with Zipper', description: 'Stylish zip hoodie.', discount: 15, avaliableColor: ['Black','Gray'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p02.png'], rate: 4.4, price: 55, payNumber:1, dressStyle: enDressStyle.casual },
      { id: 28, catId: 3, name: 'Training Hoodie', description: 'Gym hoodie.', discount: 20, avaliableColor: ['Blue','Green'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p03.png'], rate: 4.6, price: 60, payNumber:1, dressStyle: enDressStyle.gym },
  { id: 29, catId: 3, name: 'Party Oversized Hoodie', description: 'Trendy party hoodie.', discount: 0, avaliableColor: ['Red','Purple'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p04.png'], rate: 4.5, price: 70, payNumber:1, dressStyle: enDressStyle.party },
  { id: 30, catId: 4, name: 'Classic Blue Jeans', description: 'Comfortable blue jeans.', discount: 5, avaliableColor: ['Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p05.png'], rate: 4.2, price: 60, payNumber:1, dressStyle: enDressStyle.casual },

  { id: 31, catId: 4, name: 'Dark Denim Jeans', description: 'Dark wash jeans.', discount: 10, avaliableColor: ['Dark Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p06.png'], rate: 4.3, price: 65, payNumber:1, dressStyle: enDressStyle.formal },
  { id: 32, catId: 1, name: 'Lightweight Summer Tee', description: 'Cool cotton tee.', discount: 0, avaliableColor: ['White','Yellow'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p07.png'], rate: 4.1, price: 25, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 33, catId: 1, name: 'Gym Workout Tee', description: 'Performance T-shirt.', discount: 15, avaliableColor: ['Green','Blue'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p08.png'], rate: 4.5, price: 30, payNumber:1, dressStyle: enDressStyle.gym },
  { id: 34, catId: 2, name: 'Formal Shorts', description: 'Chino style shorts.', discount: 0, avaliableColor: ['Black','Beige'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/P09-2.png'], rate: 4.2, price: 45, payNumber:1, dressStyle: enDressStyle.formal },
  { id: 35, catId: 2, name: 'Summer Running Shorts', description: 'Light and comfy.', discount: 10, avaliableColor: ['Gray','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p01.png'], rate: 4.3, price: 28, payNumber:1, dressStyle: enDressStyle.gym },
  { id: 36, catId: 3, name: 'Light Hoodie', description: 'Lightweight hoodie.', discount: 5, avaliableColor: ['Beige','White'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p01.png'], rate: 4.4, price: 50, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 37, catId: 3, name: 'Street Party Hoodie', description: 'Streetwear party hoodie.', discount: 15, avaliableColor: ['Red','Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p02.png'], rate: 4.6, price: 65, payNumber:1, dressStyle: enDressStyle.party },
  { id: 38, catId: 4, name: 'Ripped Skinny Jeans', description: 'Fashionable ripped jeans.', discount: 20, avaliableColor: ['Blue','Black'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p07.png'], rate: 4.3, price: 68, payNumber:1, dressStyle: enDressStyle.party },
  { id: 39, catId: 4, name: 'Bootcut Dark Jeans', description: 'Classic bootcut.', discount: 0, avaliableColor: ['Dark Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p07.png'], rate: 4.1, price: 70, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 40, catId: 1, name: 'Retro Casual Tee', description: 'Vintage casual tee.', discount: 5, avaliableColor: ['Red','Yellow'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p06.png'], rate: 4.2, price: 30, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 41, catId: 1, name: 'Long Sleeve Tee', description: 'Comfortable long sleeve.', discount: 10, avaliableColor: ['White','Gray'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p05.png'], rate: 4.3, price: 32, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 42, catId: 2, name: 'Cargo Casual Shorts', description: 'Casual cargo shorts.', discount: 0, avaliableColor: ['Khaki','Green'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p03.png'], rate: 4.2, price: 35, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 43, catId: 2, name: 'Gym Shorts', description: 'Workout shorts.', discount: 15, avaliableColor: ['Gray','Black'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p19.png'], rate: 4.4, price: 32, payNumber:1, dressStyle: enDressStyle.gym },
  { id: 44, catId: 3, name: 'Oversized Gym Hoodie', description: 'Oversized gym hoodie.', discount: 20, avaliableColor: ['Blue','Gray'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p19.png'], rate: 4.5, price: 70, payNumber:1, dressStyle: enDressStyle.gym },
  { id: 45, catId: 3, name: 'Light Party Hoodie', description: 'Party hoodie.', discount: 5, avaliableColor: ['Red','Purple'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p18.png'], rate: 4.3, price: 60, payNumber:1, dressStyle: enDressStyle.party },
  { id: 46, catId: 4, name: 'Classic Dark Jeans', description: 'Dark classic jeans.', discount: 0, avaliableColor: ['Black','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p17.png'], rate: 4.2, price: 75, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 47, catId: 4, name: 'Light Blue Jeans', description: 'Comfortable light jeans.', discount: 10, avaliableColor: ['Light Blue'],availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p16.png'], rate: 4.3, price: 65, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 48, catId: 1, name: 'Eco Summer Tee', description: 'Eco cotton summer tee.', discount: 5, avaliableColor: ['Green','White'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p15.png'], rate: 4.2, price: 28, payNumber:1, dressStyle: enDressStyle.casual },
  { id: 49, catId: 2, name: 'Beach Casual Shorts', description: 'Summer beach shorts.', discount: 15, avaliableColor: ['Yellow','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p14.png'], rate: 4.4, price: 38, payNumber:1, dressStyle: enDressStyle.party },
  { id: 50, catId: 3, name: 'Gym Lightweight Hoodie', description: 'Light hoodie for workouts.', discount: 20, avaliableColor: ['Gray','Blue'], availableSizes: [enSize.large, enSize.xLarge], imagePath: ['assets/images/products/p13.png'], rate: 4.5, price: 55, payNumber:1, dressStyle: enDressStyle.gym }
  ];




    this.comments = {
      1: [
        { name: 'Ahmed', text: 'الخامة رائعة 👌', rating: 5 },
        { name: 'Sara', text: 'مريح وأنيق', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      2: [
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      3: [
        { name: 'Ahmed', text: 'الخامة رائعة 👌', rating: 5 },
        { name: 'Sara', text: 'مريح وأنيق', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      4: [
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      5: [
        { name: 'Ahmed', text: 'الخامة رائعة 👌', rating: 5 },
        { name: 'Sara', text: 'مريح وأنيق', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      10: [
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      11: [
        { name: 'Ahmed', text: 'الخامة رائعة 👌', rating: 5 },
        { name: 'Sara', text: 'مريح وأنيق', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      12: [
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      13: [
        { name: 'Ahmed', text: 'الخامة رائعة 👌', rating: 5 },
        { name: 'Sara', text: 'مريح وأنيق', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ],
      14: [
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 },
        { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
        { name: 'Mona', text: 'مقاسات ممتازة', rating: 4 }
      ]
    };

    this.youMightLike = {
      1: [this.products[40],this.products[31],this.products[16],this.products[7]],
      2: [this.products[41],this.products[25],this.products[17],this.products[22]],
      3: [this.products[42],this.products[32],this.products[18],this.products[24]],
      4: [this.products[43],this.products[33],this.products[19],this.products[27]],
      5: [this.products[44],this.products[34],this.products[15],this.products[26]],
      10:[this.products[45],this.products[35],this.products[6],this.products[28]],
      11:[this.products[46],this.products[36],this.products[8],this.products[29]],
      12:[this.products[47],this.products[37],this.products[9],this.products[30]],
      13:[this.products[48],this.products[38],this.products[5],this.products[21]],
      14:[this.products[49],this.products[39],this.products[30],this.products[20]],

    };
  }

  getAllProducts(): Iproduct[] {
    return this.products;
  }

  getProductById(id: number): Iproduct | undefined {
    return this.products.find(p => p.id === id);
  }

  getCommentsByProductId(id: number) {
    return this.comments[id] || [];
  }

  getYouMightLike(id: number) {
    return this.youMightLike[id] || [];
  }


  getNewArrivals(): Iproduct[] {
  
    return this.products.slice(0, 5);
  }

  topSellingArrivals(): Iproduct[] {
    return this.products.slice(10, 15);
  }

  lowHighPrice() {
    if (!this.products || this.products.length === 0) return { lowestPrice: 0, heightestPrice: 0 };
    const lowestPrice = Math.min(...this.products.map(p => p.price));
    const heightestPrice = Math.max(...this.products.map(p => p.price));
    return { lowestPrice, heightestPrice };
  }

  getPaginated(pageNumber: number, pageSize: number = 5) {
    const numberOfProducts = this.products.length;
    const numberOfTotalPages = Math.ceil(numberOfProducts / pageSize);
    if (pageNumber <= numberOfTotalPages) {
      const start = (pageNumber - 1) * pageSize;
      let end = start + pageSize;
      if (end > numberOfProducts) end = numberOfProducts;
      return {
        products: this.products.slice(start, end),
        totalPages: numberOfTotalPages,
        numberOfProducts,
        pageNumber
      };
    }
    return { products: [], totalPages: 0, numberOfProducts: 0, pageNumber: 0 };
  }

  applyFilter(
    categoryId: number,
    styleId: 0 | enDressStyle,
    size: enSize | null,
    price: number,
    color: string
  ): Iproduct[] {
    return this.products.filter(p => {
      const categoryMatch = categoryId === 0 || p.catId === categoryId;
      const styleMatch = styleId === 0 || p.dressStyle === styleId;
      const sizeMatch = size === null || (p.availableSizes && p.availableSizes.includes(size));
      const priceMatch = !price || p.price <= price;
      const colorMatch = !color || p.avaliableColor.includes(color);
      return categoryMatch && styleMatch && sizeMatch && priceMatch && colorMatch;
    });
  }
}
