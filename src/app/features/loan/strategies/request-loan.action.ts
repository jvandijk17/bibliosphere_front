import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoanRequestService } from "src/app/core/application-services/loan-request.service";
import { Book } from "src/app/core/domain/models/book.model";

@Injectable({
    providedIn: 'root'
})
export class RequestLoanAction implements LoanActionStrategy {
    constructor(
        private loanRequestService: LoanRequestService
    ) { }

    execute(book?: Book): void {
        if (book !== undefined) {
            this.loanRequestService.requestLoan(book);
        } else {
            console.error('Invalid arguments for loan request.');
        }
    }
}

