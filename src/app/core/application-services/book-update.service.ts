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

}
