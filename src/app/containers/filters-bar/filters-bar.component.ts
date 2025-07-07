import { Component } from '@angular/core';
import { filterFields } from '../../data/GeographicalData';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  filterFields = filterFields;

  constructor(public filtersService: FiltersService) {}

  getFilterValue(key: string): string {
    let value = '';
    this.filtersService.filters$.subscribe(filters => {
      value = filters[key] ?? '';
    }).unsubscribe();
    return value;
  }

  onValueChange(idx: number, newValue: string | number) {
    const key = this.filterFields[idx].key;
    this.filtersService.setFilter(key, String(newValue));
  }
}
