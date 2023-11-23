import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/domain/models/user.model';
import { DetailConfig } from 'src/app/shared/models/detail-config.model';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';

@Injectable({
    providedIn: 'root'
})
export class UserListConfig {

    constructor(
        private datePipe: DatePipe
    ) { }

    toDetailConfig(columns: ITableColumn<User>[], user: User): DetailConfig[] {
        return columns
            .filter(col => !col.exclude || !col.exclude.includes('details'))
            .map(col => {
                const value = col.render ? col.render(user) : user[col.key as keyof User];
                return {
                    label: col.title,
                    value: value
                };
            });
    }

    getColumns(): ITableColumn<User>[] {
        return [
            { key: 'id', title: 'ID' },
            { key: 'first_name', title: 'First Name' },
            { key: 'last_name', title: 'Last Name' },
            { key: 'email', title: 'Email' },
            { key: 'address', title: 'Address' },
            { key: 'city', title: 'City' },
            { key: 'province', title: 'Province' },
            { key: 'postal_code', title: 'Postal Code' },
            {
                key: 'birth_date',
                type: 'date',
                title: 'Birth Date',
                render: (user) => {
                    const formattedDate = this.datePipe.transform(user.birth_date, 'mediumDate');
                    return formattedDate ? formattedDate : '';
                }
            },
            { key: 'reputation', title: 'Reputation' },
            {
                key: 'blocked',
                title: 'Blocked',
                render: (user) => user.blocked ? 'Yes' : 'No'
            },
            {
                key: 'roles',
                title: 'Roles',
                customFilter: (user, filter) =>
                    user.roles?.some(role => role.toLowerCase().includes(filter)),
                render: (user) => user.roles?.join(', ')
            },
            {
                key: 'library',
                title: 'Library',
                customFilter: (user, filter) =>
                    user.libraryName?.toLowerCase().includes(filter),
                render: (user) => user.libraryName
            },
            {
                key: 'dropdown',
                title: 'Actions',
                exclude: ['details'],
            }
        ];
    }
}