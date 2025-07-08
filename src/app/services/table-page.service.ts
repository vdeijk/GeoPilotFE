import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeographicalData } from '../api/generated/model/geographicalData';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  private dataSubject = new BehaviorSubject<GeographicalData[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private geographicalDataService: GeographicalDataService,
    private loadingService: LoadingService
  ) {
    this.fetchTableData();
  }

  fetchTableData() {
    this.loadingService.setLoading(true);
    this.geographicalDataService.apiV1GeographicalDataGet().subscribe({
      next: (data: any) => {
        this.dataSubject.next(data);
        this.loadingService.setLoading(false);
      },
      error: (err: any) => {
        this.loadingService.setLoading(false);
        console.error('API error:', err);
      }
    });
  }
}
