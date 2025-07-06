import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeaderModel } from '../../interfaces/TableHeaderModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableHeaderModel<any>[] = [];
  @Input() data: any[] = [];
  @Input() sortField: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  @Output() sort = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<any>();

  onSort(col: TableHeaderModel<any>) {
    this.sort.emit(col.id.toString());
  }

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
}
