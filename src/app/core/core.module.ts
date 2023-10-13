import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,    
    AlertModule
  ]
})
export class CoreModule { }
