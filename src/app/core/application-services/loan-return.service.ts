import { Injectable } from '@angular/core';
import { Loan } from '../domain/models/loan.model';
import { Book } from '../domain/models/book.model';
import { firstValueFrom } from 'rxjs';
import { LoanService } from './loan.service';
import { NotificationService } from './notification.service';
import { LoadingService } from '../infrastructure/services/loading.service';
import { EntityDataService } from './entity-data.service';
import { BookService } from './book.service';

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
        private bookDataService: EntityDataService<Book>
    ) { }

    async returnLoans(loans: Loan[]): Promise<void> {
        this.loadingService.setLoading(true);
        const updatePromises = loans.map(async loan => {
            loan.return_date = new Date();
            try {
                const updatedLoan = await firstValueFrom(this.loanService.updateLoan(loan.id, loan));
                this.loanService.loanUpdated.emit(loan);
                this.loanDataService.updateEntity(loan, 'id');

                if (updatedLoan.bookId) {
                    const book = await firstValueFrom(this.bookService.getBook(updatedLoan.bookId));
                    book.activeLoanId = null;
                    this.bookDataService.updateEntity(book, 'id');
                }
            } catch (error) {
                this.notificationService.showAlert('Error while returning the loan. Please try again.');
            }
        });

        await Promise.all(updatePromises);
        this.loadingService.setLoading(false);
    }
}
