import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { LoanListConfig } from './loan-list.config';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { LoanService } from 'src/app/core/application-services/loan.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  loans: MatTableDataSource<Loan> = new MatTableDataSource<Loan>([]);
  displayedColumns: ITableColumn<Loan>[];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loanService: LoanService,
    private loadingService: LoadingService,
    private loanListConfig: LoanListConfig
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.loanListConfig.getColumns();
  }

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans(callback?: () => void) {
    this.loadingService.setLoading(true);

    this.loanService.fetchAllLoans().subscribe({
      next: loans => {
        this.loans = new MatTableDataSource(loans);
        this.loans.sort = this.sort;
        this.loadingService.setLoading(false);
      },
      error: error => {
        console.error('Error fetching loans: ', error);
        this.loadingService.setLoading(false);
      }
    })
  }

  handleAction(event: { action: string, item: Loan }) {
    switch (event.action) {
      case 'create':
        // TODO
        break;
      case 'user-details':
        // Handle user-details logic
        break;
      case 'book-details':
        // Handle book-details logic
        break;
      case 'delete':
        // Handle book delete logic
        break;
    }
  }

}
