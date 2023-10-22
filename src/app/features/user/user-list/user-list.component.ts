import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/application-services/user.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/domain/models/user.model';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Observable } from 'rxjs';
import { TableColumnConfig } from 'src/app/shared/models/table-column-config.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: TableColumnConfig<User>[] = [
    { key: 'id', title: 'ID' },
    { key: 'first_name', title: 'First Name' },
    { key: 'last_name', title: 'Last Name' },
    { key: 'email', title: 'Email' },
    { key: 'address', title: 'Address' },
    { key: 'city', title: 'City' },
    { key: 'province', title: 'Province' },
    { key: 'postal_code', title: 'Postal Code' },
    {
      key: 'birth_date',
      title: 'Birth Date',
      render: (user) => user.birth_date ? new Date(user.birth_date).toLocaleDateString() : ''
    },
    { key: 'reputation', title: 'Reputation' },
    {
      key: 'blocked',
      title: 'Blocked',
      render: (user) => user.blocked ? 'Yes' : 'No'
    },
    {
      key: 'roles',
      title: 'Roles',
      render: (user) => user.roles?.join(', ')
    },
    { key: 'library', title: 'Library', render: (user) => user.libraryName },
    {
      key: 'actions',
      title: 'Actions',
    }
  ];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private loadingService: LoadingService, private dialog: MatDialog) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(callback?: () => void) {
    this.loadingService.setLoading(true);
    this.userService.getAllUsers().subscribe({
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

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  handleAction(event: { action: string, item: User }) {
    switch (event.action) {
      case 'view':
        this.openUserDetailsModal(event.item);
        break;
      case 'toggle':
        this.toggleUserStatus(event.item);
        break;
    }
  }


  openUserDetailsModal(user: User) {
    this.dialog.open(UserDetailsModalComponent, {
      data: { user },
      width: '400px',
    });
  }

  toggleUserStatus(user: User) {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to ' + (user.blocked ? 'un-block' : 'block') + ' this user account?', confirm: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user.blocked = !user.blocked;
        this.loadingService.setLoading(true);

        this.userService.updateUser(user.id, user).subscribe({
          next: () => {
            this.getAllUsers(() => {
              this.dialog.open(AlertComponent, {
                width: '250px',
                data: {
                  message: 'User successfully ' + (!user.blocked ? 'un-blocked' : 'blocked') + '!'
                }
              });
            });
          },
          error: (error) => {
            console.error('Error updating user status:', error);
            this.loadingService.setLoading(false);
            this.dialog.open(AlertComponent, {
              width: '250px',
              data: { message: 'Error updating user status!' }
            });
          }
        });
      }
    });
  }

}
