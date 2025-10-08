import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
  comments = [
    { name: "Alex K.", text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.", stars: 5 },
    { name: "Sarah M.", text: "I absolutely love the quality of the clothes! Every piece feels premium and the designs are trendy but timeless.", stars: 4 },
    { name: "David P.", text: "Great customer service and fast delivery. I’ve ordered multiple times and never been disappointed.", stars: 5 },
    { name: "Emily R.", text: "The styles are modern and elegant. I always get compliments when I wear these clothes.", stars: 4 },
    { name: "John D.", text: "Good prices for the quality. Definitely my go-to online store now.", stars: 5 }
  ];

  currentIndex = 0;
  itemsPerView = 3;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.comments.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.comments.length) % this.comments.length;
  }

  get visibleComments() {
    let result = [];
    for (let i = 0; i < this.itemsPerView; i++) {
      result.push(this.comments[(this.currentIndex + i) % this.comments.length]);
    }
    return result;
  }
}
