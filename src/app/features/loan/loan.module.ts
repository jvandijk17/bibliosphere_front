import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';


@NgModule({
  declarations: [
    LoanComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
