import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/core/application-services/user.service';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { Router } from '@angular/router';
import { Library } from 'src/app/core/domain/models/library.model';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { mustMatchValidator } from 'src/app/core/infrastructure/validators/must-match.validator';
import { ACCOUNT_FORM_CONFIG } from './register.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  accountForm!: FormGroup;
  accountFormConfig: FormFieldConfig[];
  formLevelValidators: ValidatorFn[] = [];
  libraries: Library[] = [];
  errorMsg: string = '';

  constructor(
    private userService: UserService,
    private libraryService: LibraryService,
    private loadingService: LoadingService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.accountFormConfig = ACCOUNT_FORM_CONFIG;
  }

  ngOnInit(): void {
    this.loadLibraries();
    this.applyCustomValidators();
  }

  loadLibraries() {
    this.libraryService.fetchAllLibrariesPreview().subscribe({
      next: (data: Library[]) => {
        this.updateFormConfigOptions('library', data.map(lib => ({ value: lib.id, label: `${lib.name} - ${lib.city}` })));
        this.loadingService.setLoading(false);
      },
      error: error => {
        console.error('Error loading libraries: ', error);
      },
    });
  }

  updateFormConfigOptions(fieldName: string, options: any[]) {
    const field = this.accountFormConfig.find(f => f.name === fieldName);
    if (field) {
      field.options = options;
    }
  }

  applyCustomValidators(): void {
    this.formLevelValidators.push(mustMatchValidator('password', 'confirm_password'));
  }

  onFormSubmit(formData: any): void {

    if (formData) {
      this.userService.createUser(formData).subscribe({
        next: () => {
          this.notificationService.showAlert('Registration successful! Please login to continue.');
          this.router.navigate(['/account/login']);
        },
        error: (error) => {
          this.notificationService.showAlert('Failed to register!');
          console.error(error);
        }
      });
    }

  }
}
