export interface Loan {
    id: number;
    loan_date: Date;
    estimated_return_date?: Date | null;
    return_date?: Date | null;
    status: string;
    userId: number;
    bookId: number;
    book: number;
}
