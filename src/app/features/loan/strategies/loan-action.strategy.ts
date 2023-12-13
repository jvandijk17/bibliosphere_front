import { Loan } from "src/app/core/domain/models/loan.model";

export interface LoanActionStrategy {

    execute(loan?: Loan | number | null): void;

}