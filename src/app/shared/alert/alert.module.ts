import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { CommonUiModule } from '../common-ui.module';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule    
  ],
  exports: [
    AlertComponent    
  ]
})
export class AlertModule { }
