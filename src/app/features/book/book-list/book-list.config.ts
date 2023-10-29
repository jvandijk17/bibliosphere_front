import { TableColumnConfig } from "src/app/shared/models/table-column-config.model";
import { Book } from "src/app/core/domain/models/book.model";

export function getDisplayedColumns(isAdmin: boolean, hasLoansFn: Function, openLoanDetailsModalFn: Function): TableColumnConfig<Book>[] {
    return [
        ...(isAdmin ? [{ key: 'id', title: 'ID' }] : []),
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
            title: 'Loaned',
            render: (book) => book,
            actions: {
                details: (book) => openLoanDetailsModalFn(book)
            }
        },
        {
            key: 'categories', title: 'Categories', render: (book) => book.bookCategoryNames?.join(', ')
        },
        ...(isAdmin ? [{ key: 'actions', title: 'Actions' }] : [])
    ];
}
