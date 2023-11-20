import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { LIBRARY_FORM_CONFIG } from './library-form.config';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html'
})
export class LibraryFormComponent {

  libraryForm!: FormGroup;
  isAdmin: boolean;
  errorMsg: string = '';
  libraryFormConfig: FormFieldConfig[];

  constructor(
    private libraryService: LibraryService,
    private roleService: RoleService,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.libraryFormConfig = LIBRARY_FORM_CONFIG;
  }

  onFormSubmit(formData: any): void {
    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create libraries.');
      return;
    }

    if (formData) {
      this.libraryService.createLibrary(formData).subscribe({
        next: () => {
          this.notificationService.showAlert('Library created successfully!');
        },
        error: (error) => {
          this.notificationService.showAlert('Failed to create a library!');
          console.error(error);
        }
      })
    } else {
      this.notificationService.showAlert('Please fill out the form correctly.');
    }

  }

}
