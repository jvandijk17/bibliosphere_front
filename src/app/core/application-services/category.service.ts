import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../domain/models/category.model';
import { CATEGORY_ENDPOINTS } from '../infrastructure/config/category-endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, @Inject('API_DOMAIN') private apiDomain: String) { }

  getAllCategories() {
    return this.http.get<Category[]>(this.apiDomain + CATEGORY_ENDPOINTS.getAll);
  }

}
