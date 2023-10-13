import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/core/services/loan.service';
import { Loan } from 'src/app/core/models/loan.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent {

  @Input() loan: Loan | null = null;

  constructor(private loanService: LoanService, public roleService: RoleService, private notificationService: NotificationService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loanService.getLoan(+id).subscribe(loan => {
        this.loan = loan;
        this.cdr.detectChanges();
      });
    }
  }

  returnBook() {
    if (this.loan && this.roleService.isAdmin) {

      this.loan.return_date = new Date();
      this.notificationService.setLoading(true);

      this.loanService.updateLoan(this.loan.id, this.loan).subscribe({
        next: updatedLoan => {
          this.loan = updatedLoan;
          this.loanService.loanUpdated.emit(updatedLoan);
        },
        error: _error => {
          this.notificationService.setLoading(false);
          this.notificationService.showAlert('Error while returning the book. Please try again.');
        }
      });
    } else {
      this.notificationService.showAlert('You do not have the permission to return the loan.');
    }
  }
}
