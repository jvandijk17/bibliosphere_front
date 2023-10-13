import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, tap } from "rxjs";
import { Loan } from "../models/loan.model";

@Injectable({
    providedIn: 'root'
})

export class LoanService {

    public loanUpdated = new EventEmitter<Loan>();

    constructor(private http: HttpClient) { }

    getAllLoans() {
        return this.http.get<Loan[]>(environment.apiDomain + '/loan');
    }

    getLoan(id: number) {
        return this.http.get<Loan>(`${environment.apiDomain}/loan/${id}`);
    }

    createLoan(loan: Loan) {
        return this.http.post(environment.apiDomain + '/loan/', loan);
    }

    updateLoan(id: number, loan: Loan): Observable<Loan> {
        return this.http.put<Loan>(`${environment.apiDomain}/loan/${id}`, loan).pipe(
            tap(() => this.loanUpdated.emit())
        );
    }

    deleteLoan(id: number) {
        return this.http.delete(`${environment.apiDomain}/loan/${id}`);
    }

}