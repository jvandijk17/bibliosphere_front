import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/domain/models/category.model';
import { Library } from 'src/app/core/domain/models/library.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { BOOK_FORM_CONFIG } from './book-form.config';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  isAdmin: boolean;
  errorMsg: string = '';
  bookFormConfig: FormFieldConfig[];

  constructor(
    private bookService: BookService,
    private roleService: RoleService,
    private libraryService: LibraryService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.bookFormConfig = BOOK_FORM_CONFIG;
  }

  ngOnInit(): void {
    this.loadBookCategories();
    this.loadLibraries();
  }

  loadBookCategories() {
    this.categoryService.fetchAllCategories().subscribe({
      next: (data: Category[]) => {
        this.updateFormConfigOptions('bookCategoryId', data.map(cat => ({ value: cat.id, label: `${cat.name}` })));
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.errorMsg = 'Failed to load book categories. Please try again later.';
        console.error(error);
      }
    });
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
    const field = this.bookFormConfig.find(f => f.name === fieldName);
    if (field) {
      field.options = options;
    }
  }

  onFormSubmit(formData: any): void {

    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create books.');
      return;
    }

    if (formData) {
      this.bookService.createBook(formData).subscribe({
        next: () => {
          this.notificationService.showAlert('Book created successfully!');
          this.bookForm.reset();
        },
        error: (error) => {
          this.notificationService.showAlert('Failed to create a book!');
          console.error(error);
        }
      });
    } else {
      this.notificationService.showAlert('Please fill out the form correctly.');
    }
  }

}
