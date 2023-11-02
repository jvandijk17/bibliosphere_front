import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Book } from "src/app/core/domain/models/book.model";
import { RoleService } from "src/app/core/application-services/role.service";


export class BookListConfig {

    constructor() { }

    private generateDefaultColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
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
                canDisplay: (book) => () => canDisplay(book),
                actions: {
                    modal: (book) => openLoanDetailsModalFn(book)
                },
                fallbackDisplayText: 'No'
            },
            {
                key: 'categories', title: 'Categories', render: (book) => book.bookCategoryNames?.join(', ')
            }
        ];
    }

    getAdminColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return [
            { key: 'id', title: 'ID' },
            ...this.generateDefaultColumns(canDisplay, openLoanDetailsModalFn),
            { key: 'dropdown', title: 'Actions' }
        ]
    }

    getDefaultColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return this.generateDefaultColumns(canDisplay, openLoanDetailsModalFn);
    }

    getColumnsByRole(roleService: RoleService, canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return roleService.isAdmin ? this.getAdminColumns(canDisplay, openLoanDetailsModalFn) : this.getDefaultColumns(canDisplay, openLoanDetailsModalFn);
    }



}