import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoanRequestService } from "src/app/core/application-services/loan-request.service";
import { Loan } from "src/app/core/domain/models/loan.model";

@Injectable({
    providedIn: 'root'
})
export class DeclineLoanAction implements LoanActionStrategy {
    constructor(
        private loanRequestService: LoanRequestService
    ) { }

    execute(loan: Loan): void {
        if (loan !== undefined) {
            this.loanRequestService.declineLoan(loan);
        } else {
            console.error('Invalid arguments for loan action.');
        }
    }
}

