import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { LIBRARY_FORM_CONFIG } from './library-form.config';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';
import { Library } from 'src/app/core/domain/models/library.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html'
})
export class LibraryFormComponent implements OnInit {

  libraryForm!: FormGroup;
  libraryData: Library | null = null;
  isAdmin: boolean;
  errorMsg = '';
  libraryFormConfig: FormFieldConfig[];
  title = 'Register Library';

  constructor(
    private libraryService: LibraryService,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.libraryFormConfig = LIBRARY_FORM_CONFIG;
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const libraryId = params.get('id');
      if (libraryId) {
        this.loadLibraryData(+libraryId).subscribe(() => {
          this.title = 'Edit Library';
        });
      }
    });
  }

  private loadLibraryData(libraryId: number): Observable<any> {
    this.loadingService.setLoading(true);
    return this.libraryService.getLibrary(libraryId).pipe(
      tap((library: Library) => {
        this.libraryData = library;
        this.loadingService.setLoading(false);
      }),
      catchError(error => {
        console.error('Error loading library:', error);
        return of([]);
      })
    )
  }

  private initializeForm() {
    const formGroup: any = {};
    this.libraryFormConfig.forEach(fieldConfig => {
      formGroup[fieldConfig.name] = ['', this.getValidators(fieldConfig.validators)];
    });
    this.libraryForm = this.fb.group(formGroup);
  }

  private getValidators(validatorsConfig: any) {
    const validators = [];
    if (validatorsConfig?.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  onFormSubmit(formData: any): void {
    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create or update libraries.');
      return;
    }

    if (formData) {
      this.loadingService.setLoading(true);
      const libraryId = this.route.snapshot.params['id'];
      if (libraryId) {
        this.libraryService.updateLibrary(libraryId, formData).subscribe({
          next: () => {
            this.router.navigate(['/library']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Library updated successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Failed to update the library!');
            console.error(error);
          }
        });
      } else {
        this.libraryService.createLibrary(formData).subscribe({
          next: () => {
            this.router.navigate(['/library']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Library created successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Failed to create a library!');
            console.error(error);
          }
        });
      }
    } else {
      this.notificationService.showAlert('Please fill out the form correctly.');
    }

  }

}
