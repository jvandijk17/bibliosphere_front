import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Loan } from "../../domain/models/loan.model";
import { ILoanRepository } from "../../domain/interfaces/loan-repository.interface";
import { LOAN_ENDPOINTS_TOKEN } from "../config/loan-endpoints.token";

@Injectable({
    providedIn: 'root'
})
export class LoanRepository implements ILoanRepository {

    constructor(
        private http: HttpClient,
        @Inject(LOAN_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllLoans(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    getLoan(apiDomain: string, id: number): Observable<Loan> {
        return this.http.get<Loan>(apiDomain + this.endpoints['specific'].replace(':id', id.toString()));
    }

    createLoan(apiDomain: string, loanData: any): Observable<Loan> {
        return this.http.post<Loan>(apiDomain + this.endpoints['create'], loanData);
    }

    updateLoan(apiDomain: string, id: number, loanData: any): Observable<Loan> {
        return this.http.put<Loan>(apiDomain + this.endpoints['update'].replace(':id', id.toString()), loanData, {
            observe: 'body'
        });
    }

    deleteLoan(apiDomain: string, id: number): Observable<void> {
        return this.http.delete<void>(apiDomain + this.endpoints['delete'].replace(':id', id.toString()));
    }

    getLoansByUserId(apiDomain: string, userId: number): Observable<Loan[]> {
        return this.http.get<Loan[]>(apiDomain + this.endpoints['byUser'].replace(':id', userId.toString()));
    }


}