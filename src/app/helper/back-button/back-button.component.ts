import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',

  styles: [``]
})
export class BackButtonComponent {
  @Input() label: string = 'Back'; // Default label is 'Back'
  @Input() formTitle?: string  ; // Default label is 'Back'


  

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
