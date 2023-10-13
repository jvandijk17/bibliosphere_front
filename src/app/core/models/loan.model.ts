export interface Loan {
    id: number;
    loan_date: Date;
    return_date?: Date | null;
    estimated_return_date?: Date | null;
    userId: number;
    bookId: number;
}
