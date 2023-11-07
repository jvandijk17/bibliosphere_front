import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter, Inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Loan } from "../domain/models/loan.model";
import { LOAN_ENDPOINTS } from "../infrastructure/config/loan-endpoints.config";
import { ILoanRepository } from "../domain/interfaces/loan-repository.interface";

@Injectable({
    providedIn: 'root'
})
export class LoanService {
    private _loanList: Loan[] = [];
    public loanUpdated = new EventEmitter<Loan>();

    constructor(
        @Inject('LoanRepositoryToken') private readonly loanRepository: ILoanRepository,
        @Inject('API_DOMAIN') private readonly apiDomain: string
    ) { }

    get loans(): Loan[] {
        return this._loanList;
    }

    fetchAllLoans(): Observable<Loan[]> {
        return this.loanRepository.getAllLoans(this.apiDomain).pipe(
            tap(loans => {
                this._loanList = loans;
            })
        );
    }

    getLoan(id: number): Observable<Loan> {
        return this.loanRepository.getLoan(this.apiDomain, id);
    }

    createLoan(loan: Loan): Observable<Loan> {
        return this.loanRepository.createLoan(this.apiDomain, loan);
    }

    updateLoan(id: number, loan: Loan): Observable<Loan> {
        return this.loanRepository.updateLoan(this.apiDomain, id, loan).pipe(
            tap(() => this.loanUpdated.emit())
        );
    }

    deleteLoan(id: number): Observable<void> {
        return this.loanRepository.deleteLoan(this.apiDomain, id);
    }

    getLoansByUserId(userId: number): Observable<Loan[]> {
        return this.loanRepository.getLoansByUserId(this.apiDomain, userId);
    }

}
