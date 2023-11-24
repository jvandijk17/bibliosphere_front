import { Injectable } from "@angular/core";
import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Library } from "src/app/core/domain/models/library.model";
import { RoleService } from "src/app/core/application-services/role.service";
import { DetailConfig } from "src/app/shared/models/detail-config.model";

@Injectable({
    providedIn: 'root'
})
export class LibraryListConfig {

    constructor() { }

    toDetailConfig(columns: ITableColumn<Library>[], library: Library): DetailConfig[] {
        return columns
            .filter(col => !col.exclude || !col.exclude.includes('details'))
            .map(col => {
                const value = col.render ? col.render(library) : library[col.key as keyof Library];
                return {
                    label: col.title,
                    value: value
                };
            });
    }

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
            {
                key: 'dropdown',
                title: 'Action',
                exclude: ['details']
            }
        ];
    }

    private getDefaultColumns(): ITableColumn<Library>[] {
        return this.generateDefaultColumns();
    }

    getColumnsByRole(roleService: RoleService): ITableColumn<Library>[] {
        return roleService.isAdmin ? this.getAdminColumns() : this.getDefaultColumns();
    }

}