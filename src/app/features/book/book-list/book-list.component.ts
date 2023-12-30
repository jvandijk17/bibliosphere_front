import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, finalize, map, of } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/domain/models/book.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { ViewLoanDetailsAction } from 'src/app/features/loan/strategies/view-loan-details.action';
import { RoleService } from 'src/app/core/application-services/role.service';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { BookListConfig } from './book-list.config';
import { ViewBookDetailsAction } from '../strategies/view-book-details.action';
import { DeleteBookAction } from '../strategies/delete-book.action';
import { EntityDataService } from 'src/app/core/application-services/entity-data.service';
import { EditBookAction } from '../strategies/edit-book.action';
import { RequestLoanAction } from '../../loan/strategies/request-loan.action';

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
    private loadingService: LoadingService,
    private roleService: RoleService,
    private loanDetails: ViewLoanDetailsAction,
    private requestLoan: RequestLoanAction,
    private editBookAction: EditBookAction,
    private deleteBookAction: DeleteBookAction,
    private bookListConfig: BookListConfig,
    private viewDetails: ViewBookDetailsAction,
    private entityDataService: EntityDataService<Book>
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.bookListConfig.getColumnsByRole(this.roleService, this.hasLoans.bind(this), this.canPerformLoanRequest.bind(this), this.handleLoanDetailsAction.bind(this), this.handleLoanRequestAction.bind(this));
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.loadingComplete$.subscribe(() => {
      this.subscribeToDataSourceChanges();
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
        this.entityDataService.setDataSource(books);
        completeLoading();
      },
      error: error => {
        console.error('Error fetching books: ', error);
        completeLoading();
      }
    });
  }

  subscribeToDataSourceChanges(): void {
    this.entityDataService.dataSource$.subscribe(dataSource => {
      this.books = dataSource;
      this.books.sort = this.sort;
    });
  }

  handleAction(event: { action: string, item: Book }) {
    switch (event.action) {
      case 'view':
        this.viewDetails.execute(event.item);
        break;
      case 'viewLoan':
        this.loanDetails.execute(event.item.activeLoanId);
        break;
      case 'requestLoan':
        this.requestLoan.execute(event.item);
        break;
      case 'edit':
        this.editBookAction.execute(event.item);
        break;
      case 'delete':
        this.deleteBookAction.execute(event.item);
        break;
    }
  }

  handleLoanDetailsAction(book: Book) {
    this.handleAction({ action: 'viewLoan', item: book });
  }

  handleLoanRequestAction(book: Book) {
    this.handleAction({ action: 'requestLoan', item: book });
  }

  canPerformLoanRequest(book: Book): boolean {
    return !this.roleService.isAdmin && !this.hasLoans(book);
  }

  hasLoans(book: Book): boolean {
    return !!book.activeLoanId;
  }

}
