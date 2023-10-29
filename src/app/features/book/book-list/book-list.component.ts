import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/domain/models/book.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { BookUpdateService } from 'src/app/core/application-services/book-update.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { ViewLoanDetailsAction } from 'src/app/features/loan/strategies/view-loan-details.action';
import { RoleService } from 'src/app/core/application-services/role.service';
import { TableColumnConfig } from 'src/app/shared/models/table-column-config.model';
import { getDisplayedColumns } from './book-list.config';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  displayedColumns: TableColumnConfig<Book>[];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private bookUpdateService: BookUpdateService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private roleService: RoleService,
    private loanDetailsAction: ViewLoanDetailsAction
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = getDisplayedColumns(this.roleService.isAdmin, this.hasLoans.bind(this), this.handleLoanDetailsAction.bind(this));
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.subscribeToBookUpdates();
  }

  getAllBooks() {
    this.loadingService.setLoading(true);
    this.bookService.fetchAllBooks().subscribe({
      next: books => {
        this.books = new MatTableDataSource(books);
        this.books.sort = this.sort;
        this.loadingService.setLoading(false);
      },
      error: error => console.error('Error fetching books: ', error)
    });
  }

  applyFilter(filterValue: string) {
    this.books.filter = filterValue.trim().toLowerCase();
  }

  subscribeToBookUpdates(): void {
    this.bookUpdateService.updateBookOnLoanChange(this.books, message => {
      this.loadingService.setLoading(false);
      this.notificationService.showAlert(message);
    });
  }

  handleAction(event: { action: string, item: Book }) {
    switch (event.action) {
      case 'view':
        this.loanDetailsAction.execute(event.item.id);
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
    return !!book.activeLoanIds?.length;
  }

}
