import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LayoutModule { }
