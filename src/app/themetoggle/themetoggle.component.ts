import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <mat-slide-toggle (change)="toggleDarkMode()" [checked]="themeService.isDarkThemeEnabled">
      Dark Mode
    </mat-slide-toggle>
  `,
  styles: []
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
