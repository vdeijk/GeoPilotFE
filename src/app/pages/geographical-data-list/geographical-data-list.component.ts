import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { tableHeaders } from '../../data/GeographicalData';
import { TableHeaderModel } from '../../interfaces/TableHeaderModel';
import { TablePageService } from '../../services/table-page.service';
import { SortService } from '../../services/sort.service';
import { FiltersService } from '../../services/filters.service';
import { GeographicalData } from '../../api/generated/model/geographicalData';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss']
})
export class GeographicalDataListComponent implements OnDestroy {
  columns: TableHeaderModel<GeographicalData>[] = tableHeaders;
  data: GeographicalData[] = [];
  filteredSortedData: GeographicalData[] = [];
  filters: { [key: string]: string } = {};
  private destroy$ = new Subject<void>();

  constructor(
    public tablePageService: TablePageService,
    public filtersService: FiltersService,
    public sortService: SortService<GeographicalData>,
    private router: Router
  ) {
    this.tablePageService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(apiData => {
        this.data = apiData;
        this.applyFiltersAndSorting();
      });
    this.filtersService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filters => {
        this.filters = filters;
        this.applyFiltersAndSorting();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSort(field: string) {
    this.sortService.setSortField(field as keyof GeographicalData);
    this.applyFiltersAndSorting();
  }

  onRowClick(row: GeographicalData) {
    if (row && row.id) {
      this.router.navigate(['/edit', row.id]);
    }
  }

  applyFiltersAndSorting() {
    const filtered = this.filtersService.applyFilters(this.data, this.filters);
    this.filteredSortedData = this.sortService.sortItems(filtered);
  }

  get sortFieldString(): string | null {
    if (typeof this.sortService.sortField === 'string' || this.sortService.sortField === null) {
      return this.sortService.sortField as string | null;
    }
    return this.sortService.sortField ? String(this.sortService.sortField) : null;
  }
}
