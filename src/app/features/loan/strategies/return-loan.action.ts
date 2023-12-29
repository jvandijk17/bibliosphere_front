import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoanReturnService } from "src/app/core/application-services/loan-return.service";
import { RoleService } from "src/app/core/application-services/role.service";
import { Loan } from "src/app/core/domain/models/loan.model";

@Injectable({
    providedIn: 'root'
})
export class ReturnLoanAction implements LoanActionStrategy {

    constructor(
        private returnService: LoanReturnService,
        public roleService: RoleService,
    ) { }

    execute(loan?: Loan | null): void {
        if (loan) {
            this.returnService.returnLoan(loan);
        }
    }

}