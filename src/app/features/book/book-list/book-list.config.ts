import { Injectable } from "@angular/core";
import { ITableColumn } from "src/app/shared/models/table-column-config.model";
import { Book } from "src/app/core/domain/models/book.model";
import { RoleService } from "src/app/core/application-services/role.service";
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BookListConfig {

    constructor(
        private datePipe: DatePipe
    ) { }

    private generateDefaultColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return [
            { key: 'title', title: 'Title' },
            { key: 'author', title: 'Author' },
            { key: 'publisher', title: 'Publisher' },
            { key: 'isbn', title: 'ISBN' },
            {
                key: 'publication_year',
                type: 'date',
                title: 'Publication Year',
                render: (book) => {
                    const formattedDate = this.datePipe.transform(book.publication_year, 'mediumDate');
                    return formattedDate ? formattedDate : '';
                }
            },
            { key: 'page_count', title: 'Page Count' },
            {
                key: 'libraryName',
                title: 'Library',
                customFilter: (book, filter) =>
                    book.libraryName?.toLowerCase().includes(filter),
                render: (book) => book.libraryName
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
                key: 'categories',
                title: 'Categories',
                customFilter: (book, filter) =>
                    book.bookCategoryNames?.some(category => category.toLowerCase().includes(filter)),
                render: (book) => book.bookCategoryNames?.join(', ')
            }
        ];
    }

    getAdminColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return [
            { key: 'id', title: 'ID' },
            ...this.generateDefaultColumns(canDisplay, openLoanDetailsModalFn),
            { key: 'dropdown', title: 'Actions' }
        ];
    }

    getDefaultColumns(canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return this.generateDefaultColumns(canDisplay, openLoanDetailsModalFn);
    }

    getColumnsByRole(roleService: RoleService, canDisplay: Function, openLoanDetailsModalFn: Function): ITableColumn<Book>[] {
        return roleService.isAdmin ? this.getAdminColumns(canDisplay, openLoanDetailsModalFn) : this.getDefaultColumns(canDisplay, openLoanDetailsModalFn);
    }

}