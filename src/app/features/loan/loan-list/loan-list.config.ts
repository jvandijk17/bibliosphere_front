import { Loan } from "src/app/core/domain/models/loan.model";
import { ITableColumn } from "src/app/shared/models/table-column-config.model";

export const DISPLAYED_COLUMNS: ITableColumn<Loan>[] = [
    { key: 'id', title: 'ID' },
    {
        key: 'loan_date',
        title: 'Loan Date',
        render: (loan) => loan.loan_date ? new Date(loan.loan_date).toLocaleDateString() : ''
    },
    {
        key: 'estimated_return_date',
        title: 'Estimated Return Date',
        render: (loan) => loan.estimated_return_date ? new Date(loan.estimated_return_date).toLocaleDateString() : ''
    },
    {
        key: 'return_date',
        title: 'Return Date',
        render: (loan) => loan.return_date ? new Date(loan.return_date).toLocaleDateString() : ''
    }

]