import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { LibraryService } from 'src/app/core/services/library.service';
import { Router } from '@angular/router';
import { Library } from 'src/app/core/models/library.model';
import { mustMatchValidator } from 'src/app/core/validators/must-match.validator';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  createUserForm!: FormGroup;
  libraries: Library[] = [];
  errorMsg: string = '';
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private libraryService: LibraryService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
    this.createUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postal_code: ['', Validators.required],
      birth_date: ['', Validators.required],
      library: [null, Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).{8,}$')]],
      confirm_password: ['', Validators.required]
    }, { validator: mustMatchValidator('password', 'confirm_password') });
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.registerUser();
    }
  }

  registerUser() {
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: this.handleUserCreated.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleUserCreated() {
    this.loading = false;
    this.showAlert('Registration successful! Please login to continue.');
    this.router.navigate(['/account/login']);
  }

  handleError(error: any) {
    this.loading = false;
    this.errorMsg = error.message || 'Error creating user';
  }

  showAlert(message: string) {
    this.dialog.open(AlertComponent, {
      data: { message }
    });
  }


  loadLibraries() {
    this.libraryService.getAllLibrariesPreview().subscribe({
      next: (data: Library[]) => {
        this.libraries = data;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading libraries: ', error);
      },
    });
  }
}
