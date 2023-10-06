import { BookCategory } from "./book-category.model";
import { Loan } from "./loan.model";

export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    publication_year: Date;
    page_count: number;
    loans?: Loan[];
    bookCategories?: BookCategory[];
    bookCategoryIds?: number[];
    bookCategoryNames?: string[];
    loanIds?: number[];
    libraryId?: number;
    libraryName?: string;
}
