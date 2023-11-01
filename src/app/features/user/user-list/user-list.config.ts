import { User } from 'src/app/core/domain/models/user.model';
import { TableColumnConfig } from 'src/app/shared/models/table-column-config.model';

export const DISPLAYED_COLUMNS: TableColumnConfig<User>[] = [
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
        title: 'Birth Date',
        render: (user) => user.birth_date ? new Date(user.birth_date).toLocaleDateString() : ''
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