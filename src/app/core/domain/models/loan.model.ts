export interface Loan {
    id: number;
    loan_date: Date;
    estimated_return_date?: Date | null;
    return_date?: Date | null;
    userId: number;
    bookId: number;
}
