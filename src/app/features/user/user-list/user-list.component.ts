import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/core/models/user.model';

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

  constructor(private userService: UserService) { }

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

}
