import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableHeaderModel } from '../../interfaces/table-header-model';
import { GeographicalData } from '../../api/generated/model/geographicalData';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableHeaderModel<GeographicalData>[] = [];
  @Input() data: GeographicalData[] = [];
  @Input() sortField: string | null = null;
  @Input() selectedRow: GeographicalData | null = null;
  @Output() sort = new EventEmitter<{ field: string, direction: 0 | 1 }>();
  @Output() rowClick = new EventEmitter<GeographicalData>();

  sortState: { field: string, direction: 0 | 1 } = { field: '', direction: 0 };

  onSort(col: TableHeaderModel<GeographicalData>) {
    // Toggle direction if sorting the same field, otherwise default to ascending
    if (this.sortState.field === col.id.toString()) {
      this.sortState.direction = this.sortState.direction === 0 ? 1 : 0;
    } else {
      this.sortState.field = col.id.toString();
      this.sortState.direction = 0;
    }
    this.sort.emit({ field: this.sortState.field, direction: this.sortState.direction });
  }

  onRowClick(row: GeographicalData) {
    this.rowClick.emit(row);
  }

  getCellValue(row: GeographicalData, colId: keyof GeographicalData | string): any {
    if (colId === 'actions') return null;
    return row[colId as keyof GeographicalData];
  }
}
