/**
 * Convert an API date string to an input date string.
 * 
 * @param dateStr API date string
 * @returns Input date string
 */
export function apiDateToInputDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}