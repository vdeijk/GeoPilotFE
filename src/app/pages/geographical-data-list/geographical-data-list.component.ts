import { Component } from '@angular/core';
import { tableHeaders } from '../../data/GeographicalData';
import { TableHeaderModel } from '../../interfaces/TableHeaderModel';
import { TablePageService } from '../../stores/TablePage.service';
import { FilterService } from '../../services/filter.service';
import { SortService } from '../../services/sort.service';
import { SearchStore } from '../../stores/SearchStore.service';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss']
})
export class GeographicalDataListComponent {
  columns: string[] = tableHeaders.map(h => h.id as string);
  data: any[] = [];
  filteredSortedData: any[] = [];
  sortService = new SortService<any>();

  constructor(private tablePageService: TablePageService, private searchStore: SearchStore) {
    this.tablePageService.data$.subscribe(apiData => {
      this.data = apiData;
      this.applyFiltersAndSorting();
    });
    this.searchStore.searchTerm$.subscribe(() => {
      this.applyFiltersAndSorting();
    });
  }

  onSort(field: string) {
    this.sortService.setSortField(field as keyof any);
    this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting() {
    let filtered = this.data;
    const searchTerm = this.searchStore['searchTermSubject'].getValue();
    if (searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        (item.openbareruimte || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.filteredSortedData = this.sortService.sortItems(filtered);
  }

  get sortFieldString(): string | null {
    return typeof this.sortService.sortField === 'string' || this.sortService.sortField === null
      ? this.sortService.sortField as string | null
      : this.sortService.sortField?.toString() ?? null;
  }
}
