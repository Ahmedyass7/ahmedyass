import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() backgroundColor :string ;
  @Input() textColor :string ;
  @Input() content :string;

  constructor(){
    this.backgroundColor="black";
    this.textColor = "white";
    this.content = "default";
  }

}
