import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { NotificationService } from 'src/app/core/application-services/notification.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { Category } from 'src/app/core/domain/models/category.model';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { FormFieldConfig } from 'src/app/shared/models/form-field-config.model';
import { CATEGORY_FORM_CONFIG } from './category-form.config';
import { Observable, catchError, tap, of } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryForm!: FormGroup;
  categoryData: Category | null = null;
  isAdmin: boolean;
  errorMsg = '';
  categoryFormConfig: FormFieldConfig[];
  title = 'Register Category';

  constructor(
    private categoryService: CategoryService,
    private roleService: RoleService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.isAdmin = this.roleService.isAdmin;
    this.categoryFormConfig = CATEGORY_FORM_CONFIG;
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.loadCategoryData(+categoryId).subscribe(() => {
          this.title = 'Edit Category';
        });
      }
    });
  }

  private initializeForm() {
    const formGroup: any = {};
    this.categoryFormConfig.forEach(fieldConfig => {
      formGroup[fieldConfig.name] = ['', this.getValidators(fieldConfig.validators)];
    });
    this.categoryForm = this.fb.group(formGroup);
  }

  private getValidators(validatorsConfig: any) {
    const validators = [];
    if (validatorsConfig?.required) {
      validators.push(Validators.required);
    }
    return validators;
  }

  private loadCategoryData(categoryId: number): Observable<any> {
    this.loadingService.setLoading(true);
    return this.categoryService.getCategory(categoryId).pipe(
      tap((category: Category) => {
        this.categoryData = category;
        this.loadingService.setLoading(false);
      }),
      catchError(error => {
        console.error('Error loading category:', error);
        return of([]);
      })
    )
  }

  onFormSubmit(formData: any): void {
    if (!this.isAdmin) {
      this.notificationService.showAlert('Only admins can create or update categories.');
      return;
    }

    if (formData) {
      this.loadingService.setLoading(true);
      const categoryId = this.route.snapshot.params['id'];
      if (categoryId) {
        this.categoryService.updateCategory(categoryId, formData).subscribe({
          next: () => {
            this.router.navigate(['/category']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Category updated successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Failed to update the category!');
            console.error(error);
          }
        });
      } else {
        this.categoryService.createCategory(formData).subscribe({
          next: () => {
            this.router.navigate(['/category']);
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Category created successfully!');
          },
          error: (error) => {
            this.loadingService.setLoading(false);
            this.notificationService.showAlert('Failed to create a category!');
            console.error(error);
          }
        });
      }
    } else {
      this.notificationService.showAlert('Please fill out the form correctly.');
    }
  }

}
