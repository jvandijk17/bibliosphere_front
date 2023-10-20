import { BookCategory } from "./book-category.model";

export interface Category {
    id: number;
    name: string;
    bookCategories?: BookCategory[];
    bookCategoryIds?: number[];
}
