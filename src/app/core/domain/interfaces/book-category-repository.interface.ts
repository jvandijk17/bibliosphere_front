import { Observable } from "rxjs";
import { BookCategory } from "../models/book-category.model";

export interface IBookCategoryRepository {

    getAllBookCategories(apiDomain: string): Observable<any>;
    createBookCategory(apiDomain: string, bookCategoryData: any): Observable<BookCategory>;

}