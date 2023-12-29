import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/core/application-services/loan.service';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { RoleService } from 'src/app/core/application-services/role.service';
import { ReturnLoanAction } from '../strategies/return-loan.action';

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
      private returnLoanAction: ReturnLoanAction
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

}
