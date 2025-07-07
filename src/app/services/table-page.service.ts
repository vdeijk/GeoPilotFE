import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeographicalData } from '../api/generated/model/geographicalData';
import { GeographicalDataService } from '../api/generated/api/geographicalData.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  private dataSubject = new BehaviorSubject<GeographicalData[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private geographicalDataService: GeographicalDataService) {
    this.fetchTableData();
  }

  fetchTableData() {
    this.geographicalDataService.apiGeographicalDataGet().subscribe({
      next: (data) => {
        this.dataSubject.next(data);
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
}
