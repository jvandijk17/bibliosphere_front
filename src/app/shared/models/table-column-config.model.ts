export interface ITableColumn<T> {
    key: Extract<keyof T, string> | string;
    title: string;
    type?: 'action' | 'text' | 'dropdown' | 'date';
    render?: (item: T) => T | string | undefined;
    actions?: Record<string, (item: T) => void>;
    canDisplay?: (item: T) => Function;
    displayText?: string;
    fallbackDisplayText?: string;
    customFilter?: (item: T, filter: string) => boolean | undefined;
    exclude?: string[];
}