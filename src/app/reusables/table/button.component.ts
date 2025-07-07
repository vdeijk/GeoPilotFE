import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeaderModel } from '../../interfaces/table-header-model';

@Component({
  selector: 'app-table-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
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
