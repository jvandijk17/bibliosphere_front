import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BookCategory } from "../../domain/models/book-category.model";
import { IBookCategoryRepository } from "../../domain/interfaces/book-category-repository.interface";
import { BOOK_CATEGORY_ENDPOINTS_TOKEN } from "../config/book-category-endpoints.token";

@Injectable({
    providedIn: 'root'
})
export class BookCategoryRepository implements IBookCategoryRepository {

    constructor(
        private http: HttpClient,
        @Inject(BOOK_CATEGORY_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllBookCategories(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    createBookCategory(apiDomain: string, bookCategoryData: any): Observable<BookCategory> {
        return this.http.post<BookCategory>(apiDomain + this.endpoints['create'], bookCategoryData);
    }

    deleteBookCategory(apiDomain: string, bookCategoryId: number): Observable<any> {
        return this.http.delete(apiDomain + this.endpoints['delete'].replace(':id', bookCategoryId.toString()));
    }    

}