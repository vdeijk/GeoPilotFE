import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeaderModel } from '../../../common/interfaces/table-header-model';
import { GeographicalData } from '../../../api/generated/model/geographicalData';

import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input() columns: TableHeaderModel<GeographicalData>[] = [];
  @Input() data: GeographicalData[] = [];
  @Input() sortField: string | null = null;
  @Input() selectedRow: GeographicalData | null = null;
  @Output() sort = new EventEmitter<{ field: string, direction: 0 | 1 }>();
  @Output() rowClick = new EventEmitter<GeographicalData>();

  // Tracks current sort state for the table
  sortState: { field: string, direction: 0 | 1 } = { field: '', direction: 0 };

  // Handles sorting logic and emits sort event
  onSort(col: TableHeaderModel<GeographicalData>) {
    if (this.sortState.field === col.id.toString()) {
      this.sortState.direction = this.sortState.direction === 0 ? 1 : 0;
    } else {
      this.sortState.field = col.id.toString();
      this.sortState.direction = 0;
    }
    this.sort.emit({ field: this.sortState.field, direction: this.sortState.direction });
  }

  // Emits row data when a table row is clicked
  onRowClick(row: GeographicalData) {
    this.rowClick.emit(row);
  }

  // Returns cell value for a given row and column
  getCellValue(row: GeographicalData, colId: keyof GeographicalData | string): any {
    if (colId === 'actions') return null;
    return row[colId as keyof GeographicalData];
  }
}
