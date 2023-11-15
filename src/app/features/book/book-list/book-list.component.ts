import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/domain/models/book.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { BookUpdateService } from 'src/app/core/application-services/book-update.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { ViewLoanDetailsAction } from 'src/app/features/loan/strategies/view-loan-details.action';
import { RoleService } from 'src/app/core/application-services/role.service';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { BookListConfig } from './book-list.config';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  displayedColumns: ITableColumn<Book>[];

  isLoading$: Observable<boolean>;
  private loadingComplete$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private bookUpdateService: BookUpdateService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private loanDetailsAction: ViewLoanDetailsAction,
    private bookListConfig: BookListConfig,
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.bookListConfig.getColumnsByRole(this.roleService, this.hasLoans.bind(this), this.handleLoanDetailsAction.bind(this))
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.loadingComplete$.subscribe(() => {
      this.subscribeToBookUpdates();
    });
  }

  getAllBooks(): void {
    this.loadingService.setLoading(true);

    const completeLoading = () => {
      this.loadingService.setLoading(false);
      this.loadingComplete$.next();
    };

    this.bookService.fetchAllBooks().subscribe({
      next: books => {
        this.books = new MatTableDataSource(books);
        this.books.sort = this.sort;
        completeLoading();
      },
      error: error => {
        console.error('Error fetching books: ', error);
        completeLoading();
      }
    });
  }

  private isDateColumn(columnKey: string): boolean {
    const dateColumns = ['publication_year'];
    return dateColumns.includes(columnKey);
  }

  subscribeToBookUpdates(): void {
    this.bookUpdateService.updateBookOnLoanChange(this.books, message => {
      this.loadingService.setLoading(false);
      this.notificationService.showAlert(message);
    });
  }

  handleAction(event: { action: string, item: Book }) {
    switch (event.action) {
      case 'create':
        // TODO
        break;
      case 'view':
        this.loanDetailsAction.execute(event.item.activeLoanId);
        break;
      case 'delete':
        // Handle book delete logic
        break;
      case 'toggle':
        // Handle book toggle logic
        break;
    }
  }

  handleLoanDetailsAction(book: Book) {
    this.handleAction({ action: 'view', item: book });
  }

  hasLoans(book: Book): boolean {
    return !!book.activeLoanId;
  }

}
