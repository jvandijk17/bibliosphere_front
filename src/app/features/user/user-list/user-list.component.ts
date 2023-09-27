import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';
import { AlertComponent } from 'src/app/core/components/alert/alert.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = [
    'id', 'first_name', 'last_name', 'email', 'address', 'city',
    'province', 'postal_code', 'birth_date', 'reputation', 'blocked', 'roles',
    'library', 'actions'
  ];
  loading: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = new MatTableDataSource(users);
        this.users.sort = this.sort;
        this.loading = false;
      },
      error: error => console.error('Error fetching users:', error)
    });
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  openUserDetailsModal(user: User) {
    this.dialog.open(UserDetailsModalComponent, {
      data: { user },
      width: '400px',
    });
  }

  deleteUser(user: User) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this user?', confirm: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.dialog.open(AlertComponent, {
              width: '250px',
              data: { message: 'User successfully deleted!' }
            });
            this.getAllUsers();
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.dialog.open(AlertComponent, {
              width: '250px',
              data: { message: 'Error deleting user!' }
            });
          }
        })
      }
    });

  }

  toggleUserStatus(user: User) {

    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to ' + (user.blocked ? 'un-block' : 'block') + ' this user account?', confirm: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user.blocked = !user.blocked ? true : false;
        this.userService.updateUser(user.id, user).subscribe({
          next: () => {
            this.dialog.open(AlertComponent, {
              width: '250px',
              data: {
                message: 'User successfully ' + (!user.blocked ? 'un-blocked' : 'blocked') + '!'
              }
            });
            this.getAllUsers();
          },
          error: (error) => {
            console.error('Error updating user status on user: ', error);
            this.dialog.open(AlertComponent, {
              width: '250px',
              data: { message: 'Error updating user status!' }
            });
          }
        })
      }
    })

  }

}
