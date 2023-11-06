import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Category } from "src/app/core/domain/models/category.model";
import { RoleService } from "src/app/core/application-services/role.service";

export class CategoryListConfig {

    constructor() { }

    private generateDefaultColumns(): ITableColumn<Category>[] {
        return [
            { key: 'name', title: 'Name' }
        ];
    }

    getAdminColumns(): ITableColumn<Category>[] {
        return [
            { key: 'id', title: 'ID' },
            ...this.generateDefaultColumns(),
            { key: 'dropdown', title: 'Actions' }
        ];
    }

    getDefaultColumns(): ITableColumn<Category>[] {
        return this.generateDefaultColumns();
    }

    getColumnsByRole(roleService: RoleService): ITableColumn<Category>[] {
        return roleService.isAdmin ? this.getAdminColumns() : this.getDefaultColumns();
    }

}