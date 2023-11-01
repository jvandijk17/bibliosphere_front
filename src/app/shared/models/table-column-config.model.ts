export type TableColumnConfig<T> = {
    key: string;
    type?: string;
    title: string;
    render?: (item: T) => any;
    actions?: { [action: string]: (item: T) => void };
    discriminatorFn?: (item: T) => Function;
    notAvailableAction?: string
};
