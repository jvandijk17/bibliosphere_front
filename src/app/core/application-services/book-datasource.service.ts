import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { Book } from "../domain/models/book.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookDataSourceService {
    private booksDataSource = new BehaviorSubject<MatTableDataSource<Book>>(new MatTableDataSource<Book>([]));

    get booksDataSource$(): Observable<MatTableDataSource<Book>> {
        return this.booksDataSource.asObservable();
    }

    getCurrentDataSource(): MatTableDataSource<Book> {
        return this.booksDataSource.getValue();
    }

    setBooksDataSource(books: Book[]) {
        this.booksDataSource.next(new MatTableDataSource(books));
    }

    removeBook(bookId: number) {
        const currentDataSource = this.booksDataSource.getValue();
        const filteredBooks = currentDataSource.data.filter(book => book.id !== bookId);
        this.booksDataSource.next(new MatTableDataSource(filteredBooks));
    }

}
