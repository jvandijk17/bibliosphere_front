import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { apiDateToInputDate } from 'src/app/core/utils/date-utils';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editForm!: FormGroup;
  user: User | null = null;
  errorMsg: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }


  initForm(): void {
    this.editForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],      
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postal_code: ['', Validators.required],
      birth_date: ['', Validators.required]
    });

  }

  loadUserData(): void {
    this.loading = true;

    this.userService.getCurrentUser(this.authService.getCurrentUserEmail()).pipe(
      catchError(error => {
        this.errorMsg = 'Failed to load user data!';
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe(user => {
      if (user) {
        this.user = user;
        const birthDateString = user.birth_date ? apiDateToInputDate(user.birth_date as any) : '';
        this.editForm.patchValue({
          ...user,
          birth_date: birthDateString
        })
      }
    })

  }

  onSubmit(): void {
    if (this.editForm.valid && this.user) {
      this.loading = true;
      this.userService.updateUser(this.user.id, this.editForm.value).subscribe({
        next: (updatedUser: User) => {
          this.loading = false;
          this.user = updatedUser;
          this.dialog.open(AlertComponent, {
            data: {
              message: 'User data successfully updated!'
            }
          });
        },
        error: err => {
          this.loading = false;
          this.errorMsg = 'Failed to update user data!';
        }
      });
    }
  }

}
