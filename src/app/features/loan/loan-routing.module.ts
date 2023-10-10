import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanComponent } from './loan.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';

const routes: Routes = [
  { path: '', component: LoanComponent },
  { path: '', component: LoanDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
