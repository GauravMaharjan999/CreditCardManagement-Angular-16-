import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  template: `<button (click)="goBack()" class="warn">Back</button>`,
  styles: [`button { font-size: 16px; padding: 10px 20px; cursor: pointer; }`]
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
