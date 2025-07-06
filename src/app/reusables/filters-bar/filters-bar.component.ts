import { Component } from '@angular/core';
import { filterFields } from '../../data/GeographicalData';
import { FiltersStore } from '../../stores/FiltersStore.service';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  filterFields = filterFields;

  constructor(public filtersStore: FiltersStore) {}

  getFilterValue(key: string): string {
    let value = '';
    this.filtersStore.filters$.subscribe(filters => {
      value = filters[key] ?? '';
    }).unsubscribe();
    return value;
  }

  onValueChange(idx: number, newValue: string) {
    const key = this.filterFields[idx].key;
    this.filtersStore.setFilter(key, newValue);
  }
}
