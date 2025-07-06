import { Component } from '@angular/core';
import { SearchStore } from '../../stores/SearchStore.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  constructor(public searchStore: SearchStore) {}

  onSearchChange(value: string) {
    this.searchStore.setSearchTerm(value);
  }
}
