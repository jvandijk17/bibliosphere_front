import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/domain/models/user.model';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';

@Injectable({
    providedIn: 'root'
})
export class UserListConfig {

    constructor(
        private datePipe: DatePipe
    ) { }

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
                render: (user) => user.roles?.join(', ')
            },
            { key: 'library', title: 'Library', render: (user) => user.libraryName },
            {
                key: 'dropdown',
                title: 'Actions',
            }
        ];
    }
}