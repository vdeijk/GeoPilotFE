import { Component } from '@angular/core';
import { FiltersStore } from '../../stores/FiltersStore.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(public filtersStore: FiltersStore) {}

  onSearchChange(value: string) {
    this.filtersStore.setFilter('search', value);
  }
}
