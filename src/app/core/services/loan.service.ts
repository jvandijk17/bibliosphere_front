import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Loan } from "../models/loan.model";

@Injectable({
    providedIn: 'root'
})

export class LoanService {

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
        return this.http.put<Loan>(`${environment.apiDomain}/loan/${id}`, loan);
    }

    deleteLoan(id: number) {
        return this.http.delete(`${environment.apiDomain}/loan/${id}`);
    }

}