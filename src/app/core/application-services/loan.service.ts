import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter, Inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Loan } from "../domain/models/loan.model";
import { LOAN_ENDPOINTS } from "../infrastructure/config/loan-endpoints.config";

@Injectable({
    providedIn: 'root'
})

export class LoanService {

    public loanUpdated = new EventEmitter<Loan>();

    constructor(private http: HttpClient, @Inject('API_DOMAIN') private apiDomain: string) { }

    getAllLoans(): Observable<Loan[]> {
        return this.http.get<Loan[]>(this.apiDomain + LOAN_ENDPOINTS.getAll);
    }

    getLoan(id: number): Observable<Loan> {
        return this.http.get<Loan>(`${this.apiDomain}${LOAN_ENDPOINTS.specific.replace(':id', id.toString())}`);
    }

    createLoan(loan: Loan): Observable<Loan> {
        return this.http.post<Loan>(this.apiDomain + LOAN_ENDPOINTS.create, loan);
    }

    updateLoan(id: number, loan: Loan): Observable<Loan> {
        return this.http.put<Loan>(this.apiDomain + LOAN_ENDPOINTS.update.replace(':id', id.toString()), loan).pipe(
            tap(() => this.loanUpdated.emit())
        );
    }

    deleteLoan(id: number): Observable<void> {
        return this.http.delete<void>(this.apiDomain + LOAN_ENDPOINTS.delete.replace(':id', id.toString()));
    }

    getLoansByUserId(userId: number): Observable<Loan[]> {
        return this.http.get<Loan[]>(this.apiDomain + LOAN_ENDPOINTS.byUser);
    }

}
