import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "../../domain/models/book.model";
import { IBookRepository } from "../../domain/interfaces/book-repository.interface";
import { BOOK_ENDPOINTS_TOKEN } from "../config/book-endpoints.token";

@Injectable({
    providedIn: 'root'
})
export class BookRepository implements IBookRepository {

    constructor(
        private http: HttpClient,
        @Inject(BOOK_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllBooks(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    getBook(apiDomain: string, bookId: number): Observable<Book> {
        return this.http.get<Book>(apiDomain + this.endpoints['specific'].replace(':id', bookId.toString()));
    }

    createBook(apiDomain: string, bookData: any): Observable<Book> {
        return this.http.post<Book>(apiDomain + this.endpoints['create'], bookData);
    }

    updateBook(apiDomain: string, bookId: number, bookData: any): Observable<Book> {
        return this.http.put<Book>(`${apiDomain}${this.endpoints['update'].replace(':id', bookId.toString())}`, bookData);
    }

    deleteBook(apiDomain: string, bookId: number): Observable<any> {
        return this.http.delete(apiDomain + this.endpoints['delete'].replace(':id', bookId.toString()));
    }

}