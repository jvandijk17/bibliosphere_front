import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/domain/models/category.model';
import { Book } from 'src/app/core/domain/models/book.model';
import { Library } from 'src/app/core/domain/models/library.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { BOOK_FORM_CONFIG } from './book-form.config';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm!: FormGroup;
  bookData: Book | null = null;
  isAdmin: boolean;
  errorMsg = '';
  bookFormConfig: FormFieldConfig[];
  title: string = 'Register Book';

  constructor(
    private bookService: BookService,
    private roleService: RoleService,
    private libraryService: LibraryService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.bookFormConfig = BOOK_FORM_CONFIG;
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if (bookId) {
        this.loadBookData(+bookId);
        this.title = 'Edit Book';
      }
      this.loadBookCategories();
      this.loadLibraries();
    });
  }

  private initializeForm() {
    const formGroup: any = {};
    this.bookFormConfig.forEach(fieldConfig => {
      formGroup[fieldConfig.name] = ['', this.getValidators(fieldConfig.validators)];
    });
    this.bookForm = this.fb.group(formGroup);
  }

  private getValidators(validatorsConfig: any) {
    const validators = [];
    if (validatorsConfig?.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  private loadBookData(bookId: number) {
    this.bookService.getBook(bookId).subscribe({
      next: (book: Book) => {
        this.bookData = book;
        const formValue = this.formatApiDataToForm(book);
        this.bookForm.patchValue(formValue);
        console.log(this.bookForm);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error loading book data:', error);
      }
    });
  }

  private formatApiDataToForm(apiData: any): any {
    return {
      title: apiData.title,
      author: apiData.author,
      publisher: apiData.publisher,
      isbn: apiData.isbn,
      publication_year: apiData.publication_year.split('T')[0],
      page_count: apiData.page_count,
      bookCategoryId: apiData.bookCategoryIds,
      library: apiData.libraryId
    };
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
      this.notificationService.showAlert('Only admins can create or update books.');
      return;
    }

    if (formData) {
      const bookId = this.route.snapshot.params['id'];
      if (bookId) {
        this.bookService.updateBook(bookId, formData).subscribe({
          next: () => {
            this.notificationService.showAlert('Book updated successfully!');
          },
          error: (error) => {
            this.notificationService.showAlert('Failed to update the book!');
            console.error(error);
          }
        });
      } else {
        this.bookService.createBook(formData).subscribe({
          next: () => {
            this.notificationService.showAlert('Book created successfully!');
          },
          error: (error) => {
            this.notificationService.showAlert('Failed to create a book!');
            console.error(error);
          }
        });
      }
    } else {
      this.notificationService.showAlert('Please fill out the form correctly.');
    }
  }

}
