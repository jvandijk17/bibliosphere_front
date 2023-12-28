import { Inject, Injectable } from '@angular/core';
import { IBookRepository } from '../domain/interfaces/book-repository.interface';
import { Book } from '../domain/models/book.model';
import { Category } from '../domain/models/category.model';
import { BookCategoryService } from './book-category.service';
import { CategoryService } from './category.service';
import { EntityDataService } from './entity-data.service';
import { Observable, tap, forkJoin, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _bookList: Book[] = [];

  constructor(
    @Inject('BookRepositoryToken') private readonly bookRepository: IBookRepository,
    @Inject('API_DOMAIN') private readonly apiDomain: string,
    private readonly bookCategoryService: BookCategoryService,
    private readonly categoryService: CategoryService,
    private bookDataService: EntityDataService<Book>
  ) { }

  get books(): Book[] {
    return this._bookList;
  }

  fetchAllBooks(): Observable<Book[]> {
    return this.bookRepository.getAllBooks(this.apiDomain).pipe(
      tap(books => {
        this._bookList = books;
      })
    );
  }

  getBook(id: number) {
    return this.bookRepository.getBook(this.apiDomain, +id);
  }

  createBook(bookData: Book): Observable<Book> {
    return new Observable((observer) => {
      this.bookRepository.createBook(this.apiDomain, bookData).subscribe({
        next: (book) => {
          this._bookList.push(book);
          this.handleBookCategories(book, bookData.bookCategoryIds || [], observer);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          observer.error(error);
        }
      });
    });
  }

  updateBook(bookId: number, bookData: Book): Observable<Book> {
    return new Observable((observer) => {
      this.bookRepository.updateBook(this.apiDomain, bookId, bookData).subscribe({
        next: (updatedBook) => {
          this.handleBookCategories(updatedBook, bookData.bookCategoryIds || [], observer);
          this.bookDataService.updateEntity(updatedBook, 'id');
        },
        error: (error) => {
          console.error('Error updating book:', error);
          observer.error(error);
        }
      });
    });
  }

  deleteBook(bookId: number): Observable<any> {
    return this.bookRepository.deleteBook(this.apiDomain, bookId).pipe(
      tap(() => {
        this._bookList = this._bookList.filter(book => book.id !== bookId);
      })
    );
  }

  private handleBookCategories(book: Book, newCategoryIds: number[] | number | undefined, observer: any) {
    const newCategoryIdsArray = Array.isArray(newCategoryIds) ? newCategoryIds : (newCategoryIds ? [newCategoryIds] : []);

    this.bookCategoryService.fetchBookCategoriesByBookId(book.id).subscribe({
      next: (currentCategories) => {
        const categoriesToAdd = newCategoryIdsArray.filter(id => !currentCategories.map(c => c.categoryId).includes(id));
        const categoriesToRemove = currentCategories.filter(c => !newCategoryIdsArray.includes(c.categoryId));

        const addObservable = categoriesToAdd.length > 0
          ? this.bookCategoryService.createBookCategories({ book: book.id, category: categoriesToAdd })
          : of(null);

        const removeObservable = categoriesToRemove.length > 0
          ? forkJoin(categoriesToRemove.map(category => this.bookCategoryService.deleteBookCategory(category.bookCategoryId)))
          : of(null);

        forkJoin([addObservable, removeObservable]).subscribe({
          next: () => {
            this.fetchCategoryNames(newCategoryIdsArray).subscribe(categoryNames => {
              book.bookCategoryIds = newCategoryIdsArray;
              book.bookCategoryNames = categoryNames;
              observer.next(book);
              observer.complete();
            });
          },
          error: (error) => observer.error(error)
        });
      },
      error: (error) => observer.error(error)
    });
  }

  private fetchCategoryNames(categoryIds: number[]): Observable<string[]> {
    return this.categoryService.fetchAllCategories().pipe(
      map((categories: Category[]) => categories
        .filter((category: Category) => categoryIds.includes(category.id))
        .map((category: Category) => category.name)
      )
    );
  }

}
