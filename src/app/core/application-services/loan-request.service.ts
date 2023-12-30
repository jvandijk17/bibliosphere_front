import { Injectable } from '@angular/core';
import { Loan } from '../domain/models/loan.model';
import { catchError, finalize, of, switchMap, tap, throwError } from 'rxjs';
import { LoanService } from './loan.service';
import { NotificationService } from './notification.service';
import { LoadingService } from '../infrastructure/services/loading.service';
import { Book } from '../domain/models/book.model';
import { EntityDataService } from './entity-data.service';

@Injectable({
    providedIn: 'root',
})
export class LoanRequestService {

    constructor(
        private notificationService: NotificationService,
        private loadingService: LoadingService,
        private loanService: LoanService,
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

    approveLoan(loanId: number) {

        if (!loanId) {
            this.notificationService.showAlert('Loan ID is required.');
            return throwError(() => new Error('Loan ID is required'));
        }

        if (!loanId) {
            this.notificationService.showAlert('Loan ID is required.');
            return throwError(() => new Error('Loan ID is required'));
        }

        this.loadingService.setLoading(true);

        return this.loanService.getLoan(loanId).pipe(
            switchMap(loan => {
                if (!loan) {
                    this.notificationService.showAlert('Loan not found.');
                    return throwError(() => new Error('Loan not found'));
                }

                if (loan.status !== 'pending') {
                    this.notificationService.showAlert('Loan is not in a pending state.');
                    return throwError(() => new Error('Loan is not in a pending state'));
                }

                const updatedLoan = { ...loan, status: 'accepted' };
                return this.loanService.updateLoan(loanId, updatedLoan);
            }),
            tap(() => {
                this.notificationService.showAlert('Loan request approved.');
            }),
            catchError(error => {
                this.notificationService.showAlert('Failed to approve loan.');
                return throwError(() => error);
            }),
            finalize(() => {
                this.loadingService.setLoading(false);
            })
        );
    }

    private prepareNewLoan(bookId: number): Loan {

        const currentDate = new Date();
        const twoMonthsLater = new Date(currentDate.setMonth(currentDate.getMonth() + 2));

        return {
            loan_date: currentDate,
            estimated_return_date: twoMonthsLater,
            book: bookId,
            status: 'pending'
        } as Loan;
    }


}
