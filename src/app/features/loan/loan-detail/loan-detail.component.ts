import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/core/application-services/loan.service';
import { LoanReturnService } from 'src/app/core/application-services/loan-return.service';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { Book } from 'src/app/core/domain/models/book.model';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { BookService } from 'src/app/core/application-services/book.service';
import { EntityDataService } from 'src/app/core/application-services/entity-data.service';

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
      private loanReturnService: LoanReturnService,
      public roleService: RoleService,
      private notificationService: NotificationService,
      private bookService: BookService,
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef,
      private entityBookService: EntityDataService<Book>
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
    if (this.loan && this.roleService.isAdmin) {
      this.loanReturnService.returnLoans([this.loan]).then(() => {
        if (this.loan) {
          this.bookService.getBook(this.loan.bookId).subscribe(book => {
            if (book) {
              this.entityBookService.updateEntity(book, 'id');
            }
          });
        }
      });
    } else {
      this.notificationService.showAlert('You do not have the permission to return the loan.');
    }
  }

}
