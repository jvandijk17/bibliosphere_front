import { Inject, Injectable } from '@angular/core';
import { IBookRepository } from '../domain/interfaces/book-repository.interface';
import { Book } from '../domain/models/book.model';
import { BookCategoryService } from './book-category.service';
import { Observable, tap } from 'rxjs';

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

          if (bookData.bookCategoryId && book.id) {
            const data = {
              book: book.id,
              category: bookData.bookCategoryId
            };
            this.bookCategoryService.createBookCategories(data).subscribe({
              next: (bookCategoryResponse) => {
                console.log('Book category created successfully:', bookCategoryResponse);
                observer.next(book);
                observer.complete();
              },
              error: (error) => {
                console.error('Error creating book category:', error);
                observer.error(error);
              }
            });
          } else {
            observer.next(book);
            observer.complete();
          }
        },
        error: (error) => {
          console.error('Error creating book:', error);
          observer.error(error);
        }
      });
    });
  }

  updateBook(bookId: number, bookData: Book): Observable<Book> {
    return this.bookRepository.updateBook(this.apiDomain, bookId, bookData).pipe(
      tap(updatedBook => {
        const index = this._bookList.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
          this._bookList[index] = updatedBook;
        }
      })
    );
  }

  deleteBook(bookId: number): Observable<any> {
    return this.bookRepository.deleteBook(this.apiDomain, bookId).pipe(
      tap(() => {
        this._bookList = this._bookList.filter(book => book.id !== bookId);
      })
    );
  }



}
