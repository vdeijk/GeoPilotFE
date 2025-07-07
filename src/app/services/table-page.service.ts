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
    this.geographicalDataService.apiGeographicalDataGet().subscribe({
      next: (data) => {
        this.dataSubject.next(data);
        this.loadingService.setLoading(false);
      },
      error: (err) => {
        this.loadingService.setLoading(false);
        console.error('API error:', err);
      }
    });
  }
}
