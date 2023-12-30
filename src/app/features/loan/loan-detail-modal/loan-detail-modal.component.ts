import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { ModalStateService } from 'src/app/core/infrastructure/services/modal-state.service';

@Component({
  selector: 'app-loan-detail-modal',
  templateUrl: './loan-detail-modal.component.html',
  styleUrls: ['./loan-detail-modal.component.scss']
})
export class LoanDetailModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { loan: Loan },
    private dialogRef: MatDialogRef<LoanDetailModalComponent>,
    private modalStateService: ModalStateService
  ) {
    this.modalStateService.modalClose$.subscribe(close => {
      if (close) {
        this.dialogRef.close();
        this.modalStateService.resetModalClose();
      }
    });
  }

}
