import { Injectable } from '@angular/core';
import { Loan } from '../domain/models/loan.model';
import { catchError, finalize, of, switchMap, tap, throwError } from 'rxjs';
import { LoanService } from './loan.service';
import { NotificationService } from './notification.service';
import { LoadingService } from '../infrastructure/services/loading.service';
import { Book } from '../domain/models/book.model';
import { EntityDataService } from './entity-data.service';
import { BookService } from './book.service';

@Injectable({
    providedIn: 'root',
})
export class LoanRequestService {

    constructor(
        private notificationService: NotificationService,
        private loadingService: LoadingService,
        private loanService: LoanService,
        private bookService: BookService,
        private bookDataService: EntityDataService<Book>,
    ) { }

    requestLoan(book: Book): void {

        if (!book) {
            this.notificationService.showAlert('Book data are required.');
            return;
        }

        const newLoan = this.prepareNewLoan(book.id);

        this.loadingService.setLoading(true);

        this.loanService.createLoan(newLoan).pipe(
            tap((loan: Loan) => {
                this.notificationService.showAlert('Loan request successful. Wait for an admin to approve your request and deliver the book.');
                book.activeLoanId = loan.id;
                this.bookDataService.updateEntity(book, 'id');
            }),
            catchError(error => {
                this.notificationService.showAlert('Failed to create loan.');
                return throwError(() => error);
            }),
            finalize(() => {
                this.loadingService.setLoading(false);
            })
        ).subscribe();
    }

    approveLoan(loan: Loan): void {
        if (!loan) {
            this.notificationService.showAlert('Loan not found.');
            return;
        }

        if (!loan.id) {
            this.notificationService.showAlert('Loan ID is required.');
            return;
        }

        if (loan.status !== 'pending') {
            this.notificationService.showAlert('Loan is not in a pending state.');
            return;
        }


        const { currentDate, twoMonthsLater } = this.calculateLoanDates();

        const updatedLoan = {
            ...loan,
            status: 'accepted',
            loan_date: currentDate,
            estimated_return_date: twoMonthsLater
        };

        this.loanService.updateLoan(loan.id, updatedLoan).pipe(
            switchMap(() => {
                return this.bookService.getBook(loan.bookId).pipe(
                    tap(book => {
                        book.activeLoanId = loan.id;
                        this.bookDataService.updateEntity(book, 'id');
                    })
                );
            }),
            tap(() => this.notificationService.showAlert('Loan request approved.')),
            catchError(error => {
                this.notificationService.showAlert('Failed to approve loan.');
                return throwError(() => error);
            }),
            finalize(() => this.loadingService.setLoading(false))
        ).subscribe();
    }

    declineLoan(loan: Loan): void {
        if (!loan) {
            this.notificationService.showAlert('Loan ID is required.');
            return;
        }

        this.loadingService.setLoading(true);

        this.loanService.deleteLoan(loan.id).pipe(
            switchMap(() => {
                return this.bookService.getBook(loan.bookId).pipe(
                    tap(book => {
                        book.activeLoanId = null;
                        this.bookDataService.updateEntity(book, 'id');
                    })
                );
            }),
            tap(() => {
                this.notificationService.showAlert('Loan request declined.');
            }),
            catchError(error => {
                this.notificationService.showAlert('Failed to decline loan.');
                return throwError(() => error);
            }),
            finalize(() => {
                this.loadingService.setLoading(false);
            })
        ).subscribe();
    }

    private prepareNewLoan(bookId: number): Loan {

        const { currentDate, twoMonthsLater } = this.calculateLoanDates();

        return {
            loan_date: currentDate,
            estimated_return_date: twoMonthsLater,
            book: bookId,
            status: 'pending'
        } as Loan;
    }

    private calculateLoanDates() {
        const currentDate = new Date();
        const twoMonthsLater = new Date(currentDate.getTime());
        twoMonthsLater.setMonth(currentDate.getMonth() + 2);

        return { currentDate, twoMonthsLater };
    }

}
