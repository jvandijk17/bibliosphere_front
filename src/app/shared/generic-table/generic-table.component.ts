import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TableColumnConfig } from '../models/table-column-config.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnInit {

  @Input() data: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  @Input() displayedColumns: string[] = [];
  @Input() actionMenuTemplate!: TemplateRef<any>;
  @Input() hasLoansFn!: (item: T) => boolean;
  @Input() set columnsConfig(config: TableColumnConfig<any>[]) {
    this._columnsConfig = config;
    this.displayedColumns = config.map(col => col.key);
  }

  @Output() action = new EventEmitter<{ action: string; item: any }>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if (this.data) {
      this.data.sort = this.sort;
    }
  }

  get columnsConfig(): TableColumnConfig<any>[] {
    return this._columnsConfig;
  }
  private _columnsConfig: TableColumnConfig<any>[] = [];

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  onAction(actionType: string, item: T) {
    this.action.emit({ action: actionType, item });
  }

}
