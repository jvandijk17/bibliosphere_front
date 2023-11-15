import { Injectable } from '@angular/core';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private datePipe: DatePipe) { }

  applyFilter<T>(data: T, filter: string, columns: ITableColumn<T>[]): boolean {
    const numericFilter = isNaN(Number(filter)) ? null : Number(filter);

    return columns.some(column => this.isColumnMatching(data, column, filter, numericFilter));
  }

  private isColumnMatching<T>(data: T, column: ITableColumn<T>, filter: string, numericFilter: number | null): boolean {
    const key = column.key as keyof T;
    const value = data[key];

    if (column.type === 'date') {
      return this.isDateMatching(value, filter);
    } else if (typeof value === 'number') {
      return numericFilter !== null && value === numericFilter;
    } else if (typeof value === 'string') {
      return value.toLowerCase().includes(filter);
    }

    return false;
  }

  private isDateMatching(value: any, filter: string): boolean {
    if (value !== null && value !== undefined && (typeof value === 'string' || value instanceof Date || typeof value === 'number')) {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        const rawDate = dateValue.toISOString().toLowerCase();
        const formattedDate = this.datePipe.transform(dateValue, 'mediumDate')?.toLowerCase() || '';
        return rawDate.includes(filter) || formattedDate.includes(filter);
      }
    }

    return false;
  }
}
