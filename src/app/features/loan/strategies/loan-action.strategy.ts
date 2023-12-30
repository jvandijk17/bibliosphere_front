import { Book } from "src/app/core/domain/models/book.model";
import { Loan } from "src/app/core/domain/models/loan.model";

export interface LoanActionStrategy {

    execute(loan?: Loan | Book | number | null): void;

}