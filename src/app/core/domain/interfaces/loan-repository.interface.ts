import { Observable } from "rxjs";
import { Loan } from "../models/loan.model";

export interface ILoanRepository {

    getAllLoans(apiDomain: string): Observable<any>;
    getLoan(apiDomain: string, id: number): Observable<Loan>;
    createLoan(apiDomain: string, loanData: any): Observable<Loan>;
    updateLoan(apiDomain: string, id: number, loanData: any): Observable<Loan>;
    deleteLoan(apiDomain: string, id: number): Observable<void>;
    getLoansByUserId(apiDomain: string, userId: number): Observable<Loan[]>;

}