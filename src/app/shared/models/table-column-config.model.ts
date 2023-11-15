export interface ITableColumn<T> {
    key: Extract<keyof T, string> | string;
    title: string;
    type?: 'action' | 'text' | 'dropdown' | 'date';
    render?: (item: T) => T | string | undefined;
    actions?: Record<string, (item: T) => void>;
    canDisplay?: (item: T) => Function;
    fallbackDisplayText?: string;
}