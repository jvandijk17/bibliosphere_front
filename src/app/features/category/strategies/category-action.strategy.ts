import { Category } from "src/app/core/domain/models/category.model";

export interface CategoryActionStrategy {
    execute(category: Category): void
}