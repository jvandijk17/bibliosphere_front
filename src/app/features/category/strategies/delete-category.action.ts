import { Injectable, Inject } from "@angular/core";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";
import { NotificationService } from "src/app/core/application-services/notification.service";
import { CategoryService } from "src/app/core/application-services/category.service";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { EntityDataService } from "src/app/core/application-services/entity-data.service";
import { CategoryActionStrategy } from "./category-action.strategy";
import { Category } from "src/app/core/domain/models/category.model";

@Injectable({
    providedIn: 'root'
})
export class DeleteCategoryAction implements CategoryActionStrategy {

    constructor(
        @Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService,
        private categoryService: CategoryService,
        private notificationService: NotificationService,
        private loadingService: LoadingService,
        private entityDataService: EntityDataService<Category>
    ) { }

    execute(category: Category): void {
        const dialogRef = this.modalService.confirmAction('Are you sure you want to delete this category?');
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadingService.setLoading(true);
                this.categoryService.deleteCategory(category.id).subscribe({
                    next: () => {
                        this.loadingService.setLoading(false);
                        this.entityDataService.removeEntity(category.id, 'id');
                        this.notificationService.showAlert('Category deleted successfully.');
                    },
                    error: (error) => {
                        this.loadingService.setLoading(false);
                        this.notificationService.showAlert('Error deleting category: ' + error.message);
                    }
                });
            }
        });
    }
}
