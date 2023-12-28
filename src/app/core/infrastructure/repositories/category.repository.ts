import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../../domain/models/category.model";
import { ICategoryRepository } from "../../domain/interfaces/category-repository.interface";
import { CATEGORY_ENDPOINTS_TOKEN } from "../config/category-endpoints.token";

@Injectable({
    providedIn: 'root'
})
export class CategoryRepository implements ICategoryRepository {

    constructor(
        private http: HttpClient,
        @Inject(CATEGORY_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllCategories(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    getCategory(apiDomain: string, categoryId: number): Observable<Category> {
        return this.http.get<Category>(apiDomain + this.endpoints['specific'].replace(':id', categoryId.toString()));
    }

    createCategory(apiDomain: string, categoryData: any): Observable<Category> {
        return this.http.post<Category>(apiDomain + this.endpoints['create'], categoryData);
    }

    updateCategory(apiDomain: string, categoryId: number, categoryData: any): Observable<Category> {
        return this.http.put<Category>(apiDomain + this.endpoints['update'].replace(':id', categoryId.toString()), categoryData);
    }

}