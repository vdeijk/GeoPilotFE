import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EndpointService } from '../api/endpoint.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private endpointService: EndpointService) {
    this.fetchTableData();
  }

  fetchTableData() {
    this.endpointService.getData('api/GeographicalData').subscribe({
      next: (data) => {
        this.dataSubject.next(data as any[]);
        console.log('API data:', data);
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
}
