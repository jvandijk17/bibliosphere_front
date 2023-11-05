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

    createCategory(apiDomain: string, categoryData: any): Observable<Category> {
        return this.http.post<Category>(apiDomain + this.endpoints['create'], categoryData);
    }

}