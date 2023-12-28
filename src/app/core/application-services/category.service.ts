import { Inject, Injectable } from '@angular/core';
import { Category } from '../domain/models/category.model';
import { ICategoryRepository } from '../domain/interfaces/category-repository.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private _categoryList: Category[] = [];

  constructor(
    @Inject('CategoryRepositoryToken') private readonly categoryRepository: ICategoryRepository,
    @Inject('API_DOMAIN') private readonly apiDomain: string
  ) { }

  get categories(): Category[] {
    return this._categoryList;
  }

  fetchAllCategories() {
    return this.categoryRepository.getAllCategories(this.apiDomain).pipe(
      tap(categories => {
        this._categoryList = categories;
      })
    );
  }

  getCategory(id: number) {
    return this.categoryRepository.getCategory(this.apiDomain, +id);
  }

  createCategory(categoryData: any): Observable<Category> {
    return this.categoryRepository.createCategory(this.apiDomain, categoryData).pipe(
      tap(category => {
        this._categoryList.push(category);
      })
    )
  }

  updateCategory(categoryId: number, categoryData: Category): Observable<Category> {
    return this.categoryRepository.updateCategory(this.apiDomain, categoryId, categoryData).pipe(
      tap(updatedCategory => {
        const index = this._categoryList.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
          this._categoryList[index] = updatedCategory;
        }
      })
    );
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.categoryRepository.deleteCategory(this.apiDomain, categoryId).pipe(
      tap(() => {
        this._categoryList = this._categoryList.filter(category => category.id !== categoryId);
      })
    );
  }

}
