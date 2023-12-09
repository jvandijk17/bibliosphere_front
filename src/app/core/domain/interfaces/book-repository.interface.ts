import { Observable } from "rxjs";
import { Book } from "../models/book.model";

export interface IBookRepository {

    getAllBooks(apiDomain: string): Observable<any>;
    getBook(apiDomain: string, bookId: number): Observable<Book>;
    createBook(apiDomain: string, bookData: any): Observable<Book>;
    deleteBook(apiDomain: string, bookId: number): Observable<any>;    

}