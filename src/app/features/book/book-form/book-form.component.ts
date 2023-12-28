import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { switchMap, map } from 'rxjs/operators';
import { Observable, of, forkJoin, tap, catchError } from 'rxjs';
import { BookCategoryService } from 'src/app/core/application-services/book-category.service';

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
  title = 'Register Book';

  constructor(
    private bookService: BookService,
    private roleService: RoleService,
    private libraryService: LibraryService,
    private categoryService: CategoryService,
    private bookCategoryService: BookCategoryService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.bookFormConfig = BOOK_FORM_CONFIG;
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if (bookId) {
        this.loadBookData(+bookId).subscribe(() => {
          this.loadInitialData();
          this.title = 'Edit Book';
        });
      } else {
        this.loadInitialData();
      }
    });
  }

  loadInitialData() {
    forkJoin([
      this.loadBookCategories(),
      this.loadLibraries(),
    ]).subscribe({
      next: () => {
        this.cd.detectChanges();
      },
      error: error => {
        console.error('Error loading data:', error);
        this.errorMsg = 'Failed to load data. Please try again later.';
      }
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

  private loadBookData(bookId: number): Observable<any> {
    this.loadingService.setLoading(true);
    return this.bookService.getBook(bookId).pipe(
      switchMap((book: Book) => {
        if (book) {
          return this.bookCategoryService.fetchBookCategoriesByBookId(book.id).pipe(
            map((categories: { categoryId: number, bookCategoryId: number }[]) => {
              book.bookCategoryIds = categories.map(c => c.categoryId);
              this.bookData = book;
              this.cd.detectChanges();
              this.loadingService.setLoading(false);
              return book;
            })
          );
        }
        return of(book);
      }),
      catchError(error => {
        console.error('Error loading book data:', error);
        this.loadingService.setLoading(false);
        return of(null);
      })
    );
  }

  loadBookCategories(): Observable<Category[]> {
    this.loadingService.setLoading(true);
    return this.categoryService.fetchAllCategories().pipe(
      tap((data: Category[]) => {
        this.updateFormConfigOptions('bookCategoryIds', data.map(cat => ({ value: cat.id, label: cat.name })));
        this.loadingService.setLoading(false);
      }),
      catchError(error => {
        console.error('Error loading book categories:', error);
        return of([]);
      })
    );
  }

  loadLibraries(): Observable<Library[]> {
    this.loadingService.setLoading(true);
    return this.libraryService.fetchAllLibrariesPreview().pipe(
      tap((data: Library[]) => {
        this.updateFormConfigOptions('libraryId', data.map(lib => ({ value: lib.id, label: `${lib.name} - ${lib.city}` })));
        this.loadingService.setLoading(false);
      }),
      catchError(error => {
        console.error('Error loading libraries:', error);
        return of([]);
      })
    );
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
      this.loadingService.setLoading(true);
      const bookId = this.route.snapshot.params['id'];
      if (bookId) {
        this.bookService.updateBook(bookId, formData).subscribe({
          next: () => {
            this.router.navigate(['/book']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Book updated successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Failed to update the book!');
            console.error(error);
          }
        });
      } else {
        this.bookService.createBook(formData).subscribe({
          next: () => {
            this.router.navigate(['/book']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Book created successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
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
