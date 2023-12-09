import { Injectable } from "@angular/core";
import { LoanService } from "./loan.service";
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "../domain/models/book.model";
import { Loan } from "../domain/models/loan.model";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookUpdateService {

    constructor(
        private loanService: LoanService
    ) { }

    updateBookOnLoanChange(books: MatTableDataSource<Book>, callback: (message: string) => void): Subscription {
        return this.loanService.loanUpdated.subscribe((updatedLoan: Loan) => {
            const bookToUpdate = books.data.find(book => book.activeLoanId && book.activeLoanId === updatedLoan.id);
            if (bookToUpdate && bookToUpdate.activeLoanId) {
                bookToUpdate.activeLoanId = undefined;
                books._updateChangeSubscription();
                callback('Loan returned successfully.');
            }
        });
    }

    updateBookOnDeletion(books: MatTableDataSource<Book>, deletedBookId: number, callback: (message: string) => void): void {
        const index = books.data.findIndex(book => book.id === deletedBookId);
        if (index > -1) {
            books.data.splice(index, 1);
            books._updateChangeSubscription();
            callback('Book deleted successfully.');
        }
    }

}
