import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeToggleComponent } from './themetoggle.component';




@NgModule({
  declarations: [ThemeToggleComponent],
  imports: [
    MatSlideToggleModule
  ],
  exports: [
    ThemeToggleComponent
  ],
})
export class ThemetoggleModule { }
