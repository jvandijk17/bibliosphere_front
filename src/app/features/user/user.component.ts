import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  selectedUser?: User;
  displayedColumns: string[] = [
    'id', 'first_name', 'last_name', 'email', 'address', 'city',
    'province', 'postal_code', 'birth_date', 'reputation', 'blocked', 'roles',
    'library', 'actions'
  ];
  loading: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
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

  createUser(user: User) {
    this.userService.createUser(user).subscribe(newUser => {
      // This pattern might lead to race conditions in some cases.
      // Consider refetching data or using another pattern to ensure consistency.
      const data = this.users.data;
      data.push(newUser);
      this.users.data = [...data];
    });
  }

  updateUser(user: User) {
    if (user.id) {
      this.userService.updateUser(user.id, user).subscribe(updatedUser => {
        // TODO: Handle the updated user.
      });
    }
  }

  deleteUser(user: User) {
    if (user.id) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.users.data = this.users.data.filter(u => u.id !== user.id);
      });
    }
  }

}
