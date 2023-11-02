import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ITableColumn } from '../models/table-column-config.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnInit {

  private _columns: ITableColumn<T>[] = [];

  @Input() data: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() displayedColumns: string[] = [];
  @Input() dropdownMenuTemplate!: TemplateRef<any>;
  @Input() set columnsConfig(config: ITableColumn<any>[]) {
    this._columns = config;
    this.displayedColumns = config.map(col => String(col.key));
  }

  @Output() action = new EventEmitter<{ action: string; item: T }>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if (this.data) {
      this.data.sort = this.sort;
    }
  }

  get columnsConfig(): ITableColumn<any>[] {
    return this._columns;
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  onAction(actionType: string, item: T) {
    this.action.emit({ action: actionType, item });
  }

}
