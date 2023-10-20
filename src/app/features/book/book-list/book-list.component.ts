import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { Loan } from 'src/app/core/models/loan.model';
import { LoanService } from 'src/app/core/services/loan.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoanDetailModalComponent } from '../../loan/loan-detail-modal/loan-detail-modal.component';
import { RoleService } from 'src/app/core/services/role.service';
import { TableColumnConfig } from 'src/app/shared/models/table-column-config.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  displayedColumns: TableColumnConfig<Book>[] = [
    ...(this.roleService.isAdmin ? [{ key: 'id', title: 'ID' }] : []),
    { key: 'title', title: 'Title' },
    { key: 'author', title: 'Author' },
    { key: 'publisher', title: 'Publisher' },
    { key: 'isbn', title: 'ISBN' },
    { key: 'publication_year', title: 'Publication Year' },
    { key: 'page_count', title: 'Page Count' },
    {
      key: 'libraryName', title: 'Library', render: (book) => book.libraryName
    },
    {
      key: 'loans', title: 'Loaned', render: (book) => {
        return this.hasLoans(book) ? 'Details' : 'No';
      },
      actions: {
        details: (book) => this.openLoanDetailsModal(book.activeLoanIds?.[0])
      }
    },
    {
      key: 'categories', title: 'Categories', render: (book) => book.bookCategoryNames?.join(', ')
    },
    ...(this.roleService.isAdmin ? [{ key: 'actions', title: 'Actions' }] : [])
  ];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private loanService: LoanService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private roleService: RoleService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.getAllBooks();
    this.updateLocalBook();
  }

  getAllBooks() {
    this.loadingService.setLoading(true);
    this.bookService.getAllBooks().subscribe({
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

  openLoanDetailsModal(loanId?: number) {
    if (typeof loanId === 'undefined') return;

    this.loadingService.setLoading(true);
    this.loanService.getLoan(loanId).subscribe(loan => {
      if (loan) {
        this.dialog.open(LoanDetailModalComponent, {
          data: { loan },
          width: '400px',
        });
        this.loadingService.setLoading(false);
      }
    });
  }

  updateLocalBook() {
    this.loanService.loanUpdated.subscribe((updatedLoan: Loan) => {
      const bookToUpdate = this.books.data.find(book => book.activeLoanIds && book.activeLoanIds.includes(updatedLoan.id));
      if (bookToUpdate && bookToUpdate.activeLoanIds) {
        bookToUpdate.activeLoanIds = bookToUpdate.activeLoanIds.filter(id => id !== updatedLoan.id);
        this.books._updateChangeSubscription();
        this.loadingService.setLoading(false);
        this.notificationService.showAlert('Loan returned successfully.');
      }
    });

  }

  handleAction(event: { action: string, item: Book }) {
    switch (event.action) {
      case 'view':
        this.openLoanDetailsModal(event.item.id);
        break;
      case 'delete':
        // Handle book delete logic
        break;
      case 'toggle':
        // Handle book toggle logic
        break;
    }
  }


  hasLoans(book: Book): boolean {
    return !!book.activeLoanIds?.length;
  }

}
