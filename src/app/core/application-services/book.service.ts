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

  private handleBookCategories(book: Book, categoryIds: number[] | number | undefined, observer: any) {
    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : (categoryIds ? [categoryIds] : []);

    if (categoryIdsArray.length > 0 && book.id) {
      const data = {
        book: book.id,
        category: categoryIdsArray
      };
      this.bookCategoryService.createBookCategories(data).subscribe({
        next: (bookCategoryResponse) => {
          console.log('Book category created/updated successfully:', bookCategoryResponse);
          observer.next(book);
          observer.complete();
        },
        error: (error) => {
          console.error('Error creating/updating book category:', error);
          observer.error(error);
        }
      });
    } else {
      observer.next(book);
      observer.complete();
    }
  }

  deleteBook(bookId: number): Observable<any> {
    return this.bookRepository.deleteBook(this.apiDomain, bookId).pipe(
      tap(() => {
        this._bookList = this._bookList.filter(book => book.id !== bookId);
      })
    );
  }

}
