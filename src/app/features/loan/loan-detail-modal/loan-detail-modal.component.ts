import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from 'src/app/core/domain/models/loan.model';

@Component({
  selector: 'app-loan-detail-modal',
  templateUrl: './loan-detail-modal.component.html',
  styleUrls: ['./loan-detail-modal.component.scss']
})
export class LoanDetailModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { loan: Loan }) { }

}
