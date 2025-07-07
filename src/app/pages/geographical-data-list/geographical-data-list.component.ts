import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tableHeaders } from '../../data/GeographicalData';
import { TableHeaderModel } from '../../interfaces/TableHeaderModel';
import { TablePageService } from '../../stores/TablePage.service';
import { SortService } from '../../services/sort.service';
import { FiltersService } from '../../services/FiltersStore.service';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss']
})
export class GeographicalDataListComponent {
  columns: TableHeaderModel<any>[] = tableHeaders;
  data: any[] = [];
  filteredSortedData: any[] = [];
  sortService = new SortService<any>();
  filters: { [key: string]: string } = {};

  constructor(
    private tablePageService: TablePageService,
    private filtersService: FiltersService,
    private router: Router
  ) {
    this.tablePageService.data$.subscribe(apiData => {
      this.data = apiData;
      this.applyFiltersAndSorting();
    });
    this.filtersService.filters$.subscribe(filters => {
      this.filters = filters;
      this.applyFiltersAndSorting();
    });
  }

  onSort(field: string) {
    this.sortService.setSortField(field as keyof any);
    this.applyFiltersAndSorting();
  }

  onRowClick(row: any) {
    if (row && row.id) {
      this.router.navigate(['/edit', row.id]);
    }
  }

  applyFiltersAndSorting() {
    let filtered = this.data;
    const searchTerm = this.filters['search'] || '';
    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    // Apply all other filters (except 'search')
    Object.entries(this.filters).forEach(([key, value]) => {
      if (key === 'search') return;
      if (value && value.trim() !== '') {
        filtered = filtered.filter(item =>
          (item[key] || '').toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    this.filteredSortedData = this.sortService.sortItems(filtered);
  }

  get sortFieldString(): string | null {
    return typeof this.sortService.sortField === 'string' || this.sortService.sortField === null
      ? this.sortService.sortField as string | null
      : this.sortService.sortField?.toString() ?? null;
  }
}
