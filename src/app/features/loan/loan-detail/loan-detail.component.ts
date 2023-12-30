import { Component, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/core/application-services/loan.service';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { RoleService } from 'src/app/core/application-services/role.service';
import { ReturnLoanAction } from '../strategies/return-loan.action';
import { ApproveLoanAction } from '../strategies/approve-loan.action';
import { DeclineLoanAction } from '../strategies/decline-loan.action';
import { ModalStateService } from 'src/app/core/infrastructure/services/modal-state.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent {

  @Input() loan: Loan | null = null;

  constructor
    (
      private loanService: LoanService,
      public roleService: RoleService,
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private returnLoanAction: ReturnLoanAction,
      private approveLoanAction: ApproveLoanAction,
      private declineLoanAction: DeclineLoanAction,
      private modalStateService: ModalStateService
    ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loanService.getLoan(+id).subscribe(loan => {
        this.loan = loan;
        this.cdr.detectChanges();
      });
    }
  }

  returnLoan() {
    if (this.loan) {
      this.returnLoanAction.execute(this.loan);
    }
  }

  approveLoan() {
    if (this.loan) {
      this.approveLoanAction.execute(this.loan);
      this.modalStateService.closeModal();
    }
  }

  declineLoan() {
    if (this.loan) {
      this.declineLoanAction.execute(this.loan);
      this.modalStateService.closeModal();
    }
  }

}
