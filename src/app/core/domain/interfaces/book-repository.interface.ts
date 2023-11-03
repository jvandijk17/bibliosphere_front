import { Observable } from "rxjs";
import { Book } from "../models/book.model";

export interface IBookRepository {

    getAllBooks(apiDomain: string): Observable<any>;
    createBook(apiDomain: string, bookData: any): Observable<Book>;

}