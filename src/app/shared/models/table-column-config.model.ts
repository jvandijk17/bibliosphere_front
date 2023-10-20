export type TableColumnConfig<T> = {
    key: string;
    title: string;
    render?: (item: T) => any;
    actions?: { [action: string]: (item: T) => void };
};
