import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';
import { SortDirection } from '../api/generated/model/sortDirection';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  curSortField: string = 'name';
  curSortDirection: (typeof SortDirection)[keyof typeof SortDirection] =
    SortDirection.NUMBER_0;
  curPage: number = 1;

  data$ = new BehaviorSubject<any>(null);
  filter$ = new BehaviorSubject<{
    sortField: string;
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection];
    search: string;
    page: number;
  }>({
    sortField: this.curSortField,
    sortDirection: this.curSortDirection,
    search: '',
    page: this.curPage,
  });

  constructor(
    private geographicalDataService: GeographicalDataService,
    private loadingService: LoadingService
  ) {
    this.filter$.pipe(debounceTime(400)).subscribe((params) => {
      const { sortField, sortDirection, search, page } = params;
      this._fetchTableData(sortField, sortDirection, search, page);
    });
  }

  fetchTableData(
    sortField: string = this.curSortField,
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = this
      .curSortDirection,
    search: string = '',
    page: number = this.curPage
  ) {
    this.curSortField = sortField;
    this.curSortDirection = sortDirection;
    this.curPage = page;
    this.filter$.next({ sortField, sortDirection, search, page });
  }

  private _fetchTableData(
    sortField: string,
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection],
    search: string,
    page: number
  ) {
    this.loadingService.setLoading(true);
    this.geographicalDataService
      .apiVersionGeographicalDataPagedGet(
        '1',
        page,
        20,
        search,
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
