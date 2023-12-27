import { Inject, Injectable } from '@angular/core';
import { IBookCategoryRepository } from '../domain/interfaces/book-category-repository.interface';
import { Observable, forkJoin, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory } from '../domain/models/book-category.model';
import { BookCategoriesData } from '../domain/interfaces/book-categories.interface';

@Injectable({
    providedIn: 'root'
})
export class BookCategoryService {
    private _bookCategoryList: BookCategory[] = [];

    constructor(
        @Inject('BookCategoryRepositoryToken') private readonly bookCategoryRepository: IBookCategoryRepository,
        @Inject('API_DOMAIN') private readonly apiDomain: string
    ) { }

    get categories(): BookCategory[] {
        return [...this._bookCategoryList];
    }

    fetchAllCategories(): Observable<BookCategory[]> {
        return this.bookCategoryRepository.getAllBookCategories(this.apiDomain).pipe(
            tap(bookCategories => {
                this._bookCategoryList = [...bookCategories];
            })
        );
    }

    fetchBookCategoriesByBookId(bookId: number): Observable<{ categoryId: number, bookCategoryId: number }[]> {
        return this.fetchAllCategories().pipe(
            map(bookCategories => bookCategories
                .filter(bc => bc.bookId === bookId && bc.categoryId !== undefined)
                .map(bc => { return { categoryId: bc.categoryId as number, bookCategoryId: bc.id }; })
            )
        );
    }

    createBookCategories(bookCategoriesData: BookCategoriesData): Observable<BookCategory[]> {
        return Array.isArray(bookCategoriesData.category)
            ? this.createMultipleBookCategories(bookCategoriesData)
            : this.createSingleBookCategory(bookCategoriesData);
    }

    public deleteBookCategory(bookCategoryId: number): Observable<any> {
        return this.bookCategoryRepository.deleteBookCategory(this.apiDomain, bookCategoryId).pipe(
            tap(() => {
                this._bookCategoryList = this._bookCategoryList.filter(bc => bc.id !== bookCategoryId);
            })
        );
    }

    private createMultipleBookCategories(bookCategoriesData: BookCategoriesData): Observable<BookCategory[]> {
        const observables = (bookCategoriesData.category as number[]).map(categoryId =>
            this.createBookCategoryRequest(bookCategoriesData.book, categoryId)
        );

        return forkJoin(observables).pipe(
            tap(responses => this.updateBookCategoryList(responses))
        );
    }

    private createSingleBookCategory(bookCategoriesData: BookCategoriesData): Observable<BookCategory[]> {
        if (typeof bookCategoriesData.category === 'number') {
            return this.createBookCategoryRequest(bookCategoriesData.book, bookCategoriesData.category).pipe(
                tap(bookCategory => this.updateBookCategoryList([bookCategory])),
                map(bookCategory => [bookCategory])
            );
        } else {
            throw new Error('Category must be a single number when creating a single book category.');
        }
    }

    private createBookCategoryRequest(bookId: number, categoryId: number): Observable<BookCategory> {
        const data = { book: bookId, category: categoryId };
        return this.bookCategoryRepository.createBookCategory(this.apiDomain, data);
    }

    private updateBookCategoryList(newCategories: BookCategory[]): void {
        this._bookCategoryList = [...this._bookCategoryList, ...newCategories];
    }
}
