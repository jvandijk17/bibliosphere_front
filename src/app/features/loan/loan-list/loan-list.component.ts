import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from 'src/app/core/domain/models/loan.model';
import { LoanListConfig } from './loan-list.config';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { Observable, Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { LoanService } from 'src/app/core/application-services/loan.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { ViewLoanDetailsAction } from '../strategies/view-loan-details.action';
import { ViewBookDetailsAction } from '../strategies/view-book-details.action';
import { ViewUserDetailsAction } from '../strategies/view-user-details.action';
import { ReturnLoanAction } from '../strategies/return-loan.action';
import { EntityDataService } from 'src/app/core/application-services/entity-data.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  loans: MatTableDataSource<Loan> = new MatTableDataSource<Loan>([]);
  displayedColumns: ITableColumn<Loan>[];

  isLoading$: Observable<boolean>;
  private loadingComplete$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loanService: LoanService,
    private loadingService: LoadingService,
    private loanListConfig: LoanListConfig,
    private viewLoanDetails: ViewLoanDetailsAction,
    private viewBookDetails: ViewBookDetailsAction,
    private viewUserDetails: ViewUserDetailsAction,
    private returnLoanAction: ReturnLoanAction,
    private entityDataService: EntityDataService<Loan>
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.loanListConfig.getColumns(this.isLoaned, this.isLoanAccepted, this.handleViewLoanAction.bind(this), this.handleReturnLoanAction.bind(this));
  }

  ngOnInit(): void {
    this.getAllLoans();
    this.loadingComplete$.subscribe(() => {
      this.subscribeToDataSourceChanges();
    });
  }

  getAllLoans() {
    this.loadingService.setLoading(true);

    const completeLoading = () => {
      this.loadingService.setLoading(false);
      this.loadingComplete$.next();
    };

    this.loanService.fetchAllLoans().subscribe({
      next: loans => {
        this.loans = new MatTableDataSource(loans);
        this.loans.sort = this.sort;
        this.entityDataService.setDataSource(loans);
        completeLoading();
      },
      error: error => {
        console.error('Error fetching loans: ', error);
        completeLoading();
      }
    })
  }

  subscribeToDataSourceChanges(): void {
    this.entityDataService.dataSource$.subscribe(dataSource => {
      this.loans = dataSource;
      this.loans.sort = this.sort;
    });
  }

  handleAction(event: { action: string, item: Loan }) {
    switch (event.action) {
      case 'view':
        this.viewLoanDetails.execute(event.item.id);
        break;
      case 'view-book':
        this.viewBookDetails.execute(event.item.bookId);
        break;
      case 'view-user':
        this.viewUserDetails.execute(event.item.userId);
        break;
      case 'return-loan':
        this.returnLoanAction.execute(event.item)
    }
  }

  handleViewLoanAction(loan: Loan) {
    this.handleAction({ action: 'view', item: loan });
  }

  handleReturnLoanAction(loan: Loan) {
    this.handleAction({ action: 'return-loan', item: loan });
  }

  isLoanAccepted(loan: Loan): boolean {
    return loan.status === 'accepted' ? true : false;
  }

  isLoaned(loan: Loan): boolean {
    return !loan.return_date;
  }

}
