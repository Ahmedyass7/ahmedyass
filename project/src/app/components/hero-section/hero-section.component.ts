import { Component } from '@angular/core';
import { CustomButtonComponent } from "../custom-button/custom-button.component";


@Component({
  selector: 'app-hero-section',
  imports: [CustomButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

}
