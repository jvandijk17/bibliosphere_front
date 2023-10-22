import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IBookRepository } from '../domain/interfaces/book-repository.interface';
import { Book } from '../domain/models/book.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private _bookList: Book[] = [];

  constructor(
    @Inject('BookRepositoryToken') private readonly bookRepository: IBookRepository,
    @Inject('API_DOMAIN') private readonly apiDomain: string
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
}
