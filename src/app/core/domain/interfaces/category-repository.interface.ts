import { Observable } from "rxjs";
import { Category } from "../models/category.model";

export interface ICategoryRepository {

    getAllCategories(apiDomain: string): Observable<any>;
    createCategory(apiDomain: string, categoryData: any): Observable<Category>;

}