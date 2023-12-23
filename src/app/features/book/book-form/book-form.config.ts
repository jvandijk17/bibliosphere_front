export const BOOK_FORM_CONFIG = [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'author',
        label: 'Author',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'publisher',
        label: 'Publisher',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'isbn',
        label: 'ISBN',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'publication_year',
        label: 'Publication Year',
        type: 'date',
        validators: { required: true }
    },
    {
        name: 'page_count',
        label: 'Page Count',
        type: 'number',
        validators: { required: true }
    },
    {
        name: 'bookCategoryIds',
        label: 'Book Categories',
        type: 'select',
        options: [],
        validators: { required: true },
        multiple: true
    },
    {
        name: 'libraryId',
        label: 'Select a Library',
        type: 'select',
        options: [],
        validators: { required: true },
    }
];
