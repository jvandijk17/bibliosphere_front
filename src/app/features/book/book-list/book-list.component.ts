import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { LoanService } from 'src/app/core/services/loan.service';
import { LoanDetailModalComponent } from '../../loan/loan-detail-modal/loan-detail-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  displayedColumns: string[] = [
    'id', 'title', 'author', 'publisher', 'isbn', 'publication_year', 'page_count', 'library', 'loans', 'categories'
  ];

  loading: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService, private loanService: LoanService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.loading = true;
    this.bookService.getAllBooks().subscribe({
      next: books => {
        this.books = new MatTableDataSource(books);
        this.books.sort = this.sort;
        this.loading = false;
      },
      error: error => console.error('Error fetching books: ', error)
    });
  }

  applyFilter(filterValue: string) {
    this.books.filter = filterValue.trim().toLowerCase();
  }

  openLoanDetailsModal(loanId: number) {
    this.loading = true;
    this.loanService.getLoan(loanId).subscribe(loan => {
      if (loan) {
        this.dialog.open(LoanDetailModalComponent, {
          data: { loan },
          width: '400px',
        });
        this.loading = false;
      }
    });
  }


  hasLoans(book: Book): boolean {
    return !!book.activeLoanIds?.length;
  }

}
