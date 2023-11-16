import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';

@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.scss']
})
export class LibraryFormComponent implements OnInit {

  libraryForm!: FormGroup;
  isAdmin: boolean;
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private roleService: RoleService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.roleService.isAdmin;
  }

  ngOnInit(): void {
    this.libraryForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postal_code: ['', Validators.required],
    });
  }

  onSubmit(): void {

    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create libraries.');
      return;
    }

    if (this.libraryForm.valid) {
      this.libraryService.createLibrary(this.libraryForm.value).subscribe({
        next: () => {
          this.notificationService.showAlert('Library created successfully!');
          this.libraryForm.reset();
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
