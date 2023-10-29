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
            const bookToUpdate = books.data.find(book => book.activeLoanIds && book.activeLoanIds.includes(updatedLoan.id));
            if (bookToUpdate && bookToUpdate.activeLoanIds) {
                bookToUpdate.activeLoanIds = bookToUpdate.activeLoanIds.filter(id => id !== updatedLoan.id);
                books._updateChangeSubscription();
                callback('Loan returned successfully.');
            }
        });
    }
}
