import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeographicalData } from '../api/generated/model/geographicalData';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';
import { SortDirection } from '../api/generated/model/sortDirection';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  private dataSubject = new BehaviorSubject<GeographicalData[]>([]);
  data$ = this.dataSubject.asObservable();

  private currentSortField: string = 'name';
  private currentSortDirection: (typeof SortDirection)[keyof typeof SortDirection] =
    SortDirection.NUMBER_0;

  constructor(
    private geographicalDataService: GeographicalDataService,
    private loadingService: LoadingService
  ) {
    this.fetchTableData();
  }

  fetchTableData(
    sortField: string = this.currentSortField,
    sortDirection: (typeof SortDirection)[keyof typeof SortDirection] = this
      .currentSortDirection,
    search: string = ''
  ) {
    this.currentSortField = sortField;
    this.currentSortDirection = sortDirection;
    this.loadingService.setLoading(true);
    this.geographicalDataService
      .apiVersionGeographicalDataPagedGet(
        '1',
        1,
        20,
        search,
        sortField,
        sortDirection
      )
      .subscribe({
        next: (result: any) => {
          this.dataSubject.next(result?.items ?? []);
          this.loadingService.setLoading(false);
        },
        error: (err: any) => {
          this.loadingService.setLoading(false);
          console.error('API error:', err);
        },
      });
  }
}
