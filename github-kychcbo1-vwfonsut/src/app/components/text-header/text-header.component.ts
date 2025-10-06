import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-header',
  imports: [],
  templateUrl: './text-header.component.html',
  styleUrl: './text-header.component.css'
})
export class TextHeaderComponent {

  @Input() textContent? :String;
  @Input() textColor :String;


  constructor(){
    this.textColor ="black";
  }
}
