import { Component } from '@angular/core';
import { TablePageService } from '../../stores/TablePage.service';
import { FilterService } from '../../services/filter.service';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss']
})
export class GeographicalDataListComponent {
  columns = [
    'openbareruimte', 'huisnummer', 'huisletter', 'huisnummertoevoeging', 'postcode',
    'woonplaats', 'gemeente', 'provincie', 'nummeraanduiding', 'verblijfsobjectgebruiksdoel',
    'oppervlakteverblijfsobject', 'verblijfsobjectstatus', 'object_id', 'object_type',
    'nevenadres', 'pandid', 'pandstatus', 'pandbouwjaar', 'x', 'y', 'lon', 'lat'
  ];
  data: any[] = [];
  filteredSortedData: any[] = [];
  searchQuery: string = '';
  sortService = new SortService<any>();

  constructor(private tablePageService: TablePageService) {
    this.tablePageService.data$.subscribe(apiData => {
      this.data = apiData;
      this.applyFiltersAndSorting();
    });
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.applyFiltersAndSorting();
  }

  onSort(field: string) {
    this.sortService.setSortField(field as keyof any);
    this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting() {
    let filtered = FilterService.filterBySearchQuery(this.data, this.searchQuery, this.columns);
    this.filteredSortedData = this.sortService.sortItems(filtered);
  }

  get sortFieldString(): string | null {
    return typeof this.sortService.sortField === 'string' || this.sortService.sortField === null
      ? this.sortService.sortField as string | null
      : this.sortService.sortField?.toString() ?? null;
  }
}
