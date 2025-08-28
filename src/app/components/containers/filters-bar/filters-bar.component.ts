import { Component, Output, EventEmitter } from '@angular/core';
import { filterFields } from '../../../data/geographical-data';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  filterFields = filterFields;
  filterValues: { [key: string]: string } = {};

  @Output() filterChange = new EventEmitter<{ [key: string]: string }>();

  onFilterInput(key: string, value: string | number) {
    this.filterValues[key] = String(value);
    this.filterChange.emit({ ...this.filterValues });
  }
}