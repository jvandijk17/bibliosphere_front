import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "src/app/core/domain/models/category.model";
import { CategoryActionStrategy } from "./category-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class EditCategoryAction implements CategoryActionStrategy {

    constructor(private router: Router) { }

    execute(category: Category): void {
        this.router.navigate(['/category/edit', category.id]);
    }

}