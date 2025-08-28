import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { tableHeaders } from '../../../data/geographical-data';
import { TableHeaderModel } from '../../../common/interfaces/table-header-model';
import { TablePageService } from '../../../services/table-page-service/table-page.service';
import { GeographicalData } from '../../../api/generated/model/geographicalData';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-geographical-data-list',
  templateUrl: './geographical-data-list.component.html',
  styleUrls: ['./geographical-data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Displays a paginated, sortable, and filterable list of geographical data
export class GeographicalDataListComponent implements OnDestroy {
  columns: TableHeaderModel<GeographicalData>[] = tableHeaders;
  tableData: GeographicalData[] = [];
  curPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 20;
  totalItems: number = 0;
  // Used to clean up subscriptions
  private destroy$ = new Subject<void>();
  // Current filter object
  private curFilters: { openbareruimte?: string; postcode?: string; woonplaats?: string; huisnummer?: string } = {};

  constructor(
    public tablePageService: TablePageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Listen for data changes and update table state
    this.tablePageService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        if (Array.isArray(apiData)) {
          this.tableData = [...apiData];
        } else if (apiData && typeof apiData === 'object') {
          this.tableData = apiData.items ? [...apiData.items] : [];
          this.totalItems = apiData.totalCount ?? 0;
          this.totalPages = apiData.totalPages ?? 1;
          if (
            typeof apiData.page === 'number' &&
            !isNaN(apiData.page) &&
            apiData.page > 0
          ) {
            this.curPage = apiData.page;
          }
          this.pageSize = apiData.pageSize ?? 20;
        } else {
          this.tableData = [];
        }
        this.cdr.markForCheck();
      });
  }

  // Cleans up subscriptions when component is destroyed
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Handles sorting events from the table
  // Handles sorting events from the table
  onSort(event: { field: string; direction: 0 | 1 }) {
    this.tablePageService.fetchTableData(
      event.field,
      event.direction,
      this.curFilters,
      1
    );
  }

  // Navigates to the edit page for the selected row
  onRowClick(row: GeographicalData) {
    if (row && row.id) {
      this.router.navigate(['/edit', row.id]);
    }
  }

  // Handles pagination changes
  onPageChange(page: number) {
    this.curPage = page;
    this.tablePageService.fetchTableData(
      this.tablePageService.curSortField,
      this.tablePageService.curSortDirection,
      this.curFilters,
      page
    );
  }

  // Handles filter changes from the filters bar
  // Handles filter changes from the filters bar
  onFilterChange(filters: { openbareruimte?: string; postcode?: string; woonplaats?: string; huisnummer?: string }) {
    this.curFilters = filters;
    this.tablePageService.fetchTableData(
      this.tablePageService.curSortField,
      this.tablePageService.curSortDirection,
      this.curFilters,
      1
    );
  }
}
