import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Library } from "src/app/core/domain/models/library.model";
import { RoleService } from "src/app/core/application-services/role.service";

export class LibraryListConfig {

    constructor() { }

    private generateDefaultColumns(): ITableColumn<Library>[] {
        return [
            { key: 'name', title: 'Name' },
            { key: 'address', title: 'Address' },
            { key: 'city', title: 'City' },
            { key: 'province', title: 'Province' },
            { key: 'postal_code', title: 'Postal Code' }
        ];
    }

    private getAdminColumns(): ITableColumn<Library>[] {
        return [
            { key: 'id', title: 'ID' },
            ...this.generateDefaultColumns(),
            { key: 'dropdown', title: 'Action' }
        ];
    }

    private getDefaultColumns(): ITableColumn<Library>[] {
        return this.generateDefaultColumns();
    }

    getColumnsByRole(roleService: RoleService): ITableColumn<Library>[] {
        return roleService.isAdmin ? this.getAdminColumns() : this.getDefaultColumns();
    }

}