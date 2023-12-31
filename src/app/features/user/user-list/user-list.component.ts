import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/application-services/user.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/core/domain/models/user.model';
import { UserListConfig } from './user-list.config';
import { Observable } from 'rxjs';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { ToggleUserStatusAction } from '../strategies/toggle-user-status.action';
import { ViewUserDetailsAction } from '../strategies/view-user-details.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: ITableColumn<User>[] = [];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private toggleStatus: ToggleUserStatusAction,
    private viewDetails: ViewUserDetailsAction,
    private userListConfig: UserListConfig
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.userListConfig.getColumns();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(callback?: () => void) {
    this.loadingService.setLoading(true);
    this.userService.fetchAllUsers().subscribe({
      next: users => {
        this.users = new MatTableDataSource(users);
        this.users.sort = this.sort;
        this.loadingService.setLoading(false);
        if (callback) {
          callback();
        }
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }

  handleAction(event: { action: string, item: User }) {
    switch (event.action) {
      case 'view':
        this.viewDetails.execute(event.item);
        break;
      case 'toggle':
        this.toggleStatus.execute(event.item);
        break;
    }
  }

}
