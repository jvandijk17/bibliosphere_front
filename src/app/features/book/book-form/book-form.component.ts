import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/domain/models/category.model';
import { Library } from 'src/app/core/domain/models/library.model';
import { BookService } from 'src/app/core/application-services/book.service';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {

  bookForm!: FormGroup;
  isAdmin: boolean;
  bookCategories: any[] = [];
  libraries: Library[] = [];
  errorMsg: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private roleService: RoleService,
    private libraryService: LibraryService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.roleService.isAdmin;
  }

  ngOnInit(): void {
    this.loadBookCategories();
    this.loadLibraries();
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      isbn: ['', Validators.required],
      publication_year: ['', Validators.required],
      page_count: ['', Validators.required],
      bookCategoryId: ['', Validators.required],
      library: [null, Validators.required],
    });
  }

  loadBookCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.bookCategories = categories;
      },
      error: (error) => {
        this.errorMsg = 'Failed to load book categories. Please try again later.';
        console.error(error);
      }
    });
  }

  loadLibraries() {
    this.libraryService.getAllLibrariesPreview().subscribe({
      next: (data: Library[]) => {
        this.libraries = data;
        this.loadingService.setLoading(false);
      },
      error: error => {
        console.error('Error loading libraries: ', error);
      },
    });
  }

  onSubmit(): void {

    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create books.');
      return;
    }

    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe({
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

  handleCreateBookError(error: any) {
    this.errorMsg = 'Failed to create a book. Please try again later.';
    console.error(error);
  }

}
