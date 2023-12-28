import { Observable } from "rxjs";
import { Category } from "../models/category.model";

export interface ICategoryRepository {

    getAllCategories(apiDomain: string): Observable<any>;
    getCategory(apiDomain: string, categoryId: number): Observable<Category>;
    createCategory(apiDomain: string, categoryData: any): Observable<Category>;
    updateCategory(apiDomain: string, categoryId: number, categoryData: any): Observable<Category>;
    deleteCategory(apiDomain: string, categoryId: number): Observable<any>;

}