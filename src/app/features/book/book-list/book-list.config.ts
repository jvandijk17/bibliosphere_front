import { TableColumnConfig } from "src/app/shared/models/table-column-config.model";
import { Book } from "src/app/core/domain/models/book.model";
import { RoleService } from "src/app/core/application-services/role.service";


export class BookListConfig {

    constructor() { }

    private generateDefaultColumns(discriminatorFn: Function, openLoanDetailsModalFn: Function): TableColumnConfig<Book>[] {
        return [
            { key: 'title', title: 'Title' },
            { key: 'author', title: 'Author' },
            { key: 'publisher', title: 'Publisher' },
            { key: 'isbn', title: 'ISBN' },
            { key: 'publication_year', title: 'Publication Year' },
            { key: 'page_count', title: 'Page Count' },
            {
                key: 'libraryName', title: 'Library', render: (book) => book.libraryName
            },
            {
                key: 'loans',
                type: 'action',
                title: 'Loaned',
                render: (book) => book,
                discriminatorFn: (book) => () => discriminatorFn(book),
                actions: {
                    modal: (book) => openLoanDetailsModalFn(book)
                },
                notAvailableAction: 'No'
            },
            {
                key: 'categories', title: 'Categories', render: (book) => book.bookCategoryNames?.join(', ')
            }
        ];
    }

    getAdminColumns(discriminatorFn: Function, openLoanDetailsModalFn: Function): TableColumnConfig<Book>[] {
        return [
            { key: 'id', title: 'ID' },
            ...this.generateDefaultColumns(discriminatorFn, openLoanDetailsModalFn),
            { key: 'dropdown', title: 'Actions' }
        ]
    }

    getDefaultColumns(discriminatorFn: Function, openLoanDetailsModalFn: Function): TableColumnConfig<Book>[] {
        return this.generateDefaultColumns(discriminatorFn, openLoanDetailsModalFn);
    }

    getColumnsByRole(roleService: RoleService, discriminatorFn: Function, openLoanDetailsModalFn: Function): TableColumnConfig<Book>[] {
        return roleService.isAdmin ? this.getAdminColumns(discriminatorFn, openLoanDetailsModalFn) : this.getDefaultColumns(discriminatorFn, openLoanDetailsModalFn);
    }



}