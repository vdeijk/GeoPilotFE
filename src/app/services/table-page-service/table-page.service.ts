import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GeographicalDataService } from '../../api/generated/api/geographicalData.service';
import { SortDirection } from '../../api/generated/model/sortDirection';
import { LoadingService } from '../loading-service/loading.service';
import { TableFilters } from '../../common/interfaces/table-filters';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  curSortField: string = 'name';
  curSortDirection: (typeof SortDirection)[keyof typeof SortDirection] =
    SortDirection.NUMBER_0;
  curPage: number = 1;

  // Observable for table data
  data$ = new BehaviorSubject<any>(null);
  // Observable for filter/sort/search state
  filter$ = new BehaviorSubject<{
    sortField: string;
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection];
    filters: TableFilters;
    page: number;
  }>({
    sortField: this.curSortField,
    sortDirection: this.curSortDirection,
    filters: {},
    page: this.curPage,
  });

  constructor(
    private geographicalDataService: GeographicalDataService,
    private loadingService: LoadingService
  ) {
    // Subscribe to filter changes and fetch table data
    this.filter$.pipe(debounceTime(400)).subscribe((params) => {
      const { sortField, sortDirection, filters, page } = params;
      this._fetchTableData(sortField, sortDirection, filters, page);
    });
  }

  fetchTableData(
    sortField: string = this.curSortField,
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = this
      .curSortDirection,
    filters: TableFilters = {},
    page: number = this.curPage
  ) {
    this.curSortField = sortField;
    this.curSortDirection = sortDirection;
    this.curPage = page;
    this.filter$.next({ sortField, sortDirection, filters, page });
  }

  private _fetchTableData(
    sortField: string,
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection],
    filters: TableFilters = {},
    page: number
  ) {
    this.loadingService.setLoading(true);
    this.geographicalDataService
      .apiVersionGeographicalDataPagedGet(
        '1',
        page,
        20,
        filters.openbareruimte ?? '',
        filters.postcode ?? '',
        filters.woonplaats ?? '',
        filters.huisnummer ?? '',
        sortField,
        sortDirection
      )
      .subscribe({
        next: (result: any) => {
          this.data$.next(result);
          this.loadingService.setLoading(false);
        },
        error: (err: any) => {
          this.loadingService.setLoading(false);
          console.error('API error:', err);
        },
      });
  }
}
