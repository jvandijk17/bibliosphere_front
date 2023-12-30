import { Injectable } from '@angular/core';
import { Loan } from '../domain/models/loan.model';
import { Book } from '../domain/models/book.model';
import { firstValueFrom } from 'rxjs';
import { LoanService } from './loan.service';
import { NotificationService } from './notification.service';
import { LoadingService } from '../infrastructure/services/loading.service';
import { EntityDataService } from './entity-data.service';
import { BookService } from './book.service';
import { RoleService } from './role.service';

@Injectable({
    providedIn: 'root',
})
export class LoanReturnService {

    constructor(
        private loanService: LoanService,
        private bookService: BookService,
        private notificationService: NotificationService,
        private loadingService: LoadingService,
        private loanDataService: EntityDataService<Loan>,
        private bookDataService: EntityDataService<Book>,
        private roleService: RoleService
    ) { }

    returnLoan(loan: Loan) {
        if (loan && this.roleService.isAdmin) {
            this.returnLoans([loan]).then(() => {
                if (loan) {
                    this.bookService.getBook(loan.bookId).subscribe(book => {
                        if (book) {
                            this.bookDataService.updateEntity(book, 'id');
                        }
                    });
                }
            });
        } else {
            this.notificationService.showAlert('You do not have the permission to return the loan.');
        }
    }

    async returnLoans(loans: Loan[]): Promise<void> {
        this.loadingService.setLoading(true);
        const updatePromises = loans.map(async loan => {
            loan.return_date = new Date();
            loan.status = 'returned';
            try {
                const updatedLoan = await firstValueFrom(this.loanService.updateLoan(loan.id, loan));
                if (updatedLoan.bookId) {
                    const book = await firstValueFrom(this.bookService.getBook(updatedLoan.bookId));
                    book.activeLoanId = null;
                    this.bookDataService.updateEntity(book, 'id');
                    this.loanDataService.updateEntity(loan, 'id');
                    this.loanService.loanUpdated.emit(loan);
                    this.notificationService.showAlert('Loan successfully returned!');
                }
            } catch (error) {
                this.notificationService.showAlert('Error while returning the loan. Please try again.');
            }
        });

        await Promise.all(updatePromises);
        this.loadingService.setLoading(false);
    }
}
