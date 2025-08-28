import { Component, OnDestroy } from '@angular/core';
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
})
export class GeographicalDataListComponent implements OnDestroy {
  columns: TableHeaderModel<GeographicalData>[] = tableHeaders;
  data: GeographicalData[] = [];
  curPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 20;
  totalItems: number = 0;
  private destroy$ = new Subject<void>();
  private currentSearch: string = '';
  private currentSortField: string = this.tablePageService['curSortField'];
  private currentSortDirection: (typeof this.tablePageService)['curSortDirection'] =
    this.tablePageService['curSortDirection'];

  constructor(
    public tablePageService: TablePageService,
    private router: Router
  ) {
    this.tablePageService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((apiData: any) => {
        if (Array.isArray(apiData)) {
          this.data = apiData;
        } else if (apiData && typeof apiData === 'object') {
          this.data = apiData.items ?? [];
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
          this.data = [];
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSort(event: { field: string; direction: 0 | 1 }) {
    this.currentSortField = event.field;
    this.currentSortDirection = event.direction;
    this.tablePageService.fetchTableData(
      this.currentSortField,
      this.currentSortDirection,
      this.currentSearch,
      1
    );
  }

  onRowClick(row: GeographicalData) {
    if (row && row.id) {
      this.router.navigate(['/edit', row.id]);
    }
  }

  onPageChange(page: number) {
    this.curPage = page;
    this.tablePageService.fetchTableData(
      this.currentSortField,
      this.currentSortDirection,
      this.currentSearch,
      page
    );
  }

  onFilterChange(filters: { [key: string]: string }) {
    this.currentSearch = Object.values(filters).filter(Boolean).join(' ');
    this.tablePageService.fetchTableData(
      this.currentSortField,
      this.currentSortDirection,
      this.currentSearch,
      1
    );
  }
}
