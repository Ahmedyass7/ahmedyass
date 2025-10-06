import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  imports: [NgFor,NgIf,RouterLink,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  product: any;
  youMightLike: any[] = [];
  comments: any[] = [];


  colors: string[] = ['black', 'white', 'navy', 'beige'];
  sizes: string[] = ['S', 'M', 'L', 'XL'];
  selectedColor: string = 'black';
  selectedSize: string = 'M';


  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));


    const allProducts = [
      {
        id: 1,
        title: 'Black Pique Polo Shirt',
        price: 300,
        image: 'https://content.moss.co.uk/images/original/421843de-74b2-44d2-ba0d-bf49225e954e.jpg',
        description: 'High-quality polo shirt for casual wear.',
        comments: [
          { name: 'Ahmed', text: 'التيشيرت خامته ممتازة جدًا 👌', rating: 5 },
          { name: 'Sara', text: 'مريح وأنيق!', rating: 4 },
          { name: 'Ahmed', text: 'التيشيرت خامته ممتازة جدًا 👌', rating: 5 },
          { name: 'Sara', text: 'مريح وأنيق!', rating: 4 }
        ],
        youMightLike: [
          { id: 2, title: 'White Piqué Polo Shirt', price: 200, image: 'https://content.moss.co.uk/images/original/966785401_04.jpg' },
          { id: 3, title: 'Tobacco Merino-Blend Skipper Polo', price: 420, image: 'https://content.moss.co.uk/images/original/966801581_04.jpg' },
          { id: 2, title: 'Taupe Merino-Blend Polo Shirt', price: 200, image: 'https://content.moss.co.uk/images/original/8f4d45a6-dd38-460d-be8c-a5f734ae7724.jpg' },
          { id: 3, title: 'Sage Piqué Polo Shirt', price: 420, image: 'https://content.moss.co.uk/images/original/966785426_04.jpg' }
        ]
      },
      {
        id: 2,
        title: 'Mid Blue Crew-Neck T-Shirt',
        price: 200,
        image: 'https://content.moss.co.uk/images/extraextralarge/966830791_05.jpg',
        description: 'Comfortable cotton T-shirt in mid-blue.',
        comments: [
          { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
          { name: 'Mona', text: 'مقاساته مظبوطة جدًا', rating: 4 },
          { name: 'Omar', text: 'الألوان أجمل من الصور 🔥', rating: 5 },
          { name: 'Mona', text: 'مقاساته مظبوطة جدًا', rating: 4 }
        ],
        youMightLike: [
          { id: 1, title: 'White Crew Neck T-Shirt', price: 300, image: 'https://content.moss.co.uk/images/original/966644701_04.jpg' },
          { id: 4, title: 'Taupe Crew-Neck T-Shirt', price: 350, image: 'https://content.moss.co.uk/images/original/967016332_04.jpg' },
          { id: 1, title: 'Taupe Melange Crew-Neck T-Shirt', price: 300, image: 'https://content.moss.co.uk/images/original/966862969_04.jpg' },
          { id: 4, title: 'Flintstone Blue Crew-Neck T-Shirt', price: 350, image: 'https://content.moss.co.uk/images/original/966862980_04.jpg' }
        ]
      },
      {
        id: 3,
        title: 'Teal Corduroy Overshirt',
        price: 420,
        image: 'https://content.moss.co.uk/images/original/966892937_05.jpg',
        description: 'Overshirt in teal corduroy fabric.',
        comments: [
          { name: 'Ali', text: 'مناسب جدًا لفصل الشتاء ❄️', rating: 5 },
          { name: 'Huda', text: 'قماشته تقيلة وألوانه حلوة', rating: 4 },
          { name: 'Ali', text: 'مناسب جدًا لفصل الشتاء ❄️', rating: 5 },
          { name: 'Huda', text: 'قماشته تقيلة وألوانه حلوة', rating: 4 }
        ],
        youMightLike: [
          { id: 5, title: 'Taupe Corduroy Overshirt', price: 320, image: 'https://content.moss.co.uk/images/original/966806569_05.jpg' },
          { id: 6, title: 'Khaki Moleskin Chore Overshirt', price: 300, image: 'https://content.moss.co.uk/images/original/967029230_05.jpg' },
          { id: 5, title: 'Navy Waffle Texture Overshirt', price: 350, image: 'https://content.moss.co.uk/images/original/967029109_05.jpg' },
          { id: 6, title: 'Italian Neutral Check Overshirt', price: 400, image: 'https://content.moss.co.uk/images/original/967022266_05.jpg' }
        ]
      },
      {
        id: 4,
        title: 'Navy Linen Shirt',
        price: 350,
        image: 'https://content.moss.co.uk/images/original/966855609_05.jpg',
        description: 'Lightweight navy shirt made from linen.',
        comments: [
          { name: 'Mahmoud', text: 'مريح جدًا في الحر 🌞', rating: 5 },
          { name: 'Laila', text: 'ستايله شيك وكاجوال في نفس الوقت', rating: 4 },
          { name: 'Mahmoud', text: 'مريح جدًا في الحر 🌞', rating: 5 },
          { name: 'Laila', text: 'ستايله شيك وكاجوال في نفس الوقت', rating: 4 }
        ],
        youMightLike: [
          { id: 2, title: 'Dark Purple Washed Oxford Shirt', price: 250, image: 'https://content.moss.co.uk/images/original/967016519_05.jpg' },
          { id: 7, title: 'Sky Washed Oxford Shirt', price: 350, image: 'https://content.moss.co.uk/images/original/966816302_05.jpg' },
          { id: 2, title: 'Sage Washed Oxford Shirt', price: 300, image: 'https://content.moss.co.uk/images/original/966816326_07.jpg' },
          { id: 7, title: 'Navy Washed Oxford Shirt', price: 400, image: 'https://content.moss.co.uk/images/original/966816309_05.jpg' }
        ]
      },
      {
        id: 5,
        title: 'Navy Wool Pleated Pants',
        price: 300,
        image: 'https://content.moss.co.uk/images/original/967001509_05.jpg',
        description: 'Elegant navy wool pants with pleats.',
        comments: [
          { name: 'Tamer', text: 'الخامة فخمة جدًا ✨', rating: 5 },
          { name: 'Rana', text: 'شكلها على الجسم رائع', rating: 4 },
          { name: 'Tamer', text: 'الخامة فخمة جدًا ✨', rating: 5 },
          { name: 'Rana', text: 'شكلها على الجسم رائع', rating: 4 }
        ],
        youMightLike: [
          { id: 3, title: 'Teal Corduroy Overshirt', price: 420, image: 'https://content.moss.co.uk/images/original/966892937_05.jpg' },
          { id: 8, title: 'Navy Moleskin Shacket', price: 350, image: 'https://content.moss.co.uk/images/original/967034109_05.jpg' },
          { id: 3, title: 'Teal Corduroy Overshirt', price: 420, image: 'https://content.moss.co.uk/images/original/966892937_05.jpg' },
          { id: 8, title: 'Navy Moleskin Shacket', price: 350, image: 'https://content.moss.co.uk/images/original/967034109_05.jpg' }
        ]
      },
      {
        id: 6,
        title: 'Tailored Fit Black Stretch Suit',
        price: 600,
        image: 'https://content.moss.co.uk/images/original/966954715_08.jpg',
        description: 'Tailored black stretch suit for formal occasions.',
        comments: [
          { name: 'Youssef', text: 'تحفة في المناسبات الرسمية 🎩', rating: 5 },
          { name: 'Mariam', text: 'أنيق جدًا ومريح للحركة', rating: 4 },
          { name: 'Youssef', text: 'تحفة في المناسبات الرسمية 🎩', rating: 5 },
          { name: 'Mariam', text: 'أنيق جدًا ومريح للحركة', rating: 4 }
        ],
        youMightLike: [
          { id: 1, title: 'Black Pique Polo Shirt', price: 300, image: 'https://content.moss.co.uk/images/original/421843de-74b2-44d2-ba0d-bf49225e954e.jpg' },
          { id: 7, title: 'Mid Teal Merino-Blend Skipper Polo', price: 450, image: 'https://content.moss.co.uk/images/original/966930137_04.jpg' },
          { id: 1, title: 'Black Pique Polo Shirt', price: 300, image: 'https://content.moss.co.uk/images/original/421843de-74b2-44d2-ba0d-bf49225e954e.jpg' },
          { id: 7, title: 'Mid Teal Merino-Blend Skipper Polo', price: 450, image: 'https://content.moss.co.uk/images/original/966930137_04.jpg' }
        ]
      },
      {
        id: 7,
        title: 'Mid Teal Merino-Blend Skipper Polo',
        price: 450,
        image: 'https://content.moss.co.uk/images/original/966930137_04.jpg',
        description: 'Premium skipper polo in merino blend.',
        comments: [
          { name: 'Hassan', text: 'مختلف جدًا عن باقي البولو 👕', rating: 5 },
          { name: 'Nour', text: 'ألوانه مبهجة ومميزة', rating: 4 },
          { name: 'Hassan', text: 'مختلف جدًا عن باقي البولو 👕', rating: 5 },
          { name: 'Nour', text: 'ألوانه مبهجة ومميزة', rating: 4 }
        ],
        youMightLike: [
          { id: 2, title: 'Mid Blue Crew-Neck T-Shirt', price: 200, image: 'https://content.moss.co.uk/images/extraextralarge/966830791_05.jpg' },
          { id: 5, title: 'Navy Wool Pleated Pants', price: 300, image: 'https://content.moss.co.uk/images/original/967001509_05.jpg' },
          { id: 2, title: 'Mid Blue Crew-Neck T-Shirt', price: 200, image: 'https://content.moss.co.uk/images/extraextralarge/966830791_05.jpg' },
          { id: 5, title: 'Navy Wool Pleated Pants', price: 300, image: 'https://content.moss.co.uk/images/original/967001509_05.jpg' }
        ]
      },
      {
        id: 8,
        title: 'Navy Moleskin Shacket',
        price: 350,
        image: 'https://content.moss.co.uk/images/original/967034109_05.jpg',
        description: 'Durable navy shacket in moleskin fabric.',
        comments: [
          { name: 'Karim', text: 'ستايلش جدًا ومناسب للخريف 🍂', rating: 5 },
          { name: 'Dina', text: 'خامة ممتازة ومريحة', rating: 4 },
          { name: 'Karim', text: 'ستايلش جدًا ومناسب للخريف 🍂', rating: 5 },
          { name: 'Dina', text: 'خامة ممتازة ومريحة', rating: 4 }
        ],
        youMightLike: [
          { id: 4, title: 'Navy Linen Shirt', price: 350, image: 'https://content.moss.co.uk/images/original/966855609_05.jpg' },
          { id: 6, title: 'Tailored Fit Black Stretch Suit', price: 600, image: 'https://content.moss.co.uk/images/original/966954715_08.jpg' },
          { id: 4, title: 'Navy Linen Shirt', price: 350, image: 'https://content.moss.co.uk/images/original/966855609_05.jpg' },
          { id: 6, title: 'Tailored Fit Black Stretch Suit', price: 600, image: 'https://content.moss.co.uk/images/original/966954715_08.jpg' }
        ]
      }
    ];

    this.product = allProducts.find(p => p.id === productId);
    this.youMightLike = this.product?.youMightLike || [];
    this.comments = this.product?.comments || [];
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  getStars(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }

}
