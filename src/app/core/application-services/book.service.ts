import { Inject, Injectable } from '@angular/core';
import { IBookRepository } from '../domain/interfaces/book-repository.interface';
import { Book } from '../domain/models/book.model';
import { BookCategoryService } from './book-category.service';
import { Observable, tap, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _bookList: Book[] = [];

  constructor(
    @Inject('BookRepositoryToken') private readonly bookRepository: IBookRepository,
    @Inject('API_DOMAIN') private readonly apiDomain: string,
    private readonly bookCategoryService: BookCategoryService
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
          const index = this._bookList.findIndex(book => book.id === updatedBook.id);
          if (index !== -1) {
            this._bookList[index] = updatedBook;
          }
          observer.next(updatedBook);
          observer.complete();
        },
        error: (error) => {
          console.error('Error updating book:', error);
          observer.error(error);
        }
      });
    });
  }

  private handleBookCategories(book: Book, newCategoryIds: number[] | number | undefined, observer: any) {
    const newCategoryIdsArray = Array.isArray(newCategoryIds) ? newCategoryIds : (newCategoryIds ? [newCategoryIds] : []);

    this.bookCategoryService.fetchBookCategoriesByBookId(book.id).subscribe({
      next: (currentCategoryIds) => {
        const categoriesToAdd = newCategoryIdsArray.filter(id => !currentCategoryIds.includes(id));
        const categoriesToRemove = currentCategoryIds.filter(id => !newCategoryIdsArray.includes(id));

        const addObservable = categoriesToAdd.length > 0
          ? this.bookCategoryService.createBookCategories({ book: book.id, category: categoriesToAdd })
          : of(null);

        const removeObservable = categoriesToRemove.length > 0
          ? this.bookCategoryService.deleteBookCategories(categoriesToRemove)
          : of(null);

        forkJoin([addObservable, removeObservable]).subscribe({
          next: () => {
            observer.next(book);
            observer.complete();
          },
          error: (error) => observer.error(error)
        });
      },
      error: (error) => observer.error(error)
    });
  }


  deleteBook(bookId: number): Observable<any> {
    return this.bookRepository.deleteBook(this.apiDomain, bookId).pipe(
      tap(() => {
        this._bookList = this._bookList.filter(book => book.id !== bookId);
      })
    );
  }

}
