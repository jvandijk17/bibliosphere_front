import { Book } from "./book.model";
import { Category } from "./category.model";

export interface BookCategory {
    id: number;
    book: Book;
    category: Category;
    categoryId?: number;
    bookId?: number;
}

