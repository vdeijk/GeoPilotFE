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
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  @Input() selectedRow: GeographicalData | null = null;
  @Output() sort = new EventEmitter<string>();
  @Output() rowClick = new EventEmitter<GeographicalData>();

  onSort(col: TableHeaderModel<GeographicalData>) {
    this.sort.emit(col.id.toString());
  }

  onRowClick(row: GeographicalData) {
    this.rowClick.emit(row);
  }

  getCellValue(row: GeographicalData, colId: keyof GeographicalData | string): any {
    if (colId === 'actions') return null;
    return row[colId as keyof GeographicalData];
  }
}
