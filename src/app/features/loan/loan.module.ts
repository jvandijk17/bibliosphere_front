import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanService } from 'src/app/core/application-services/loan.service';

import { LayoutModule } from '@angular/cdk/layout';

import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoanDetailModalComponent } from './loan-detail-modal/loan-detail-modal.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { LoanListComponent } from './loan-list/loan-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoanDetailComponent,
    LoanDetailModalComponent,
    LoanListComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    LoanRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    LoanService
  ]
})
export class LoanModule { }
