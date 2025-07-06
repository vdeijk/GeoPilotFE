import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() sortField: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  @Output() sort = new EventEmitter<string>();

  onSort(col: string) {
    this.sort.emit(col);
  }
}
