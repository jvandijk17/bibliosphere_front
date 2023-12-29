import { Injectable } from "@angular/core";
import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Loan } from "src/app/core/domain/models/loan.model";
import { DatePipe } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class LoanListConfig {

    constructor(
        private datePipe: DatePipe
    ) { }

    getColumns(isLoanedFn: Function, returnLoanFn: Function): ITableColumn<Loan>[] {
        return [
            { key: 'id', title: 'ID' },
            {
                key: 'loan_date',
                type: 'date',
                title: 'Loan Date',
                render: (loan) => {
                    const formattedDate = this.datePipe.transform(loan.loan_date, 'mediumDate');
                    return formattedDate ? formattedDate : '';
                }
            },
            {
                key: 'estimated_return_date',
                type: 'date',
                title: 'Estimated Return Date',
                render: (loan) => {
                    const formattedDate = this.datePipe.transform(loan.estimated_return_date, 'mediumDate');
                    return formattedDate ? formattedDate : '';
                }
            },
            {
                key: 'return_date',
                type: 'date',
                title: 'Return Date',
                render: (loan) => {
                    const formattedDate = this.datePipe.transform(loan.return_date, 'mediumDate');
                    return formattedDate ? formattedDate : 'Currently Loaned';
                }
            },
            {
                key: 'return_loan',
                type: 'action',
                title: 'Return Loan',
                render: (loan) => loan,
                canDisplay: (loan) => () => isLoanedFn(loan),
                actions: {
                    modal: (loan) => returnLoanFn(loan)
                },
                displayText: 'Return Book',
                fallbackDisplayText: 'Available'
            },
            {
                key: 'dropdown',
                title: 'Actions',
                exclude: ['details'],
            }
        ];
    }

}