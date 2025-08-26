import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { tableHeaders } from '../../data/geographical-data';
import { TableHeaderModel } from '../../interfaces/table-header-model';
import { TablePageService } from '../../services/table-page.service';
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
  // Filtering now handled by backend
  private destroy$ = new Subject<void>();

  constructor(
    public tablePageService: TablePageService,
    private router: Router
  ) {
    this.tablePageService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(apiData => {
        this.data = apiData;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSort(event: { field: string, direction: 0 | 1 }) {
    this.tablePageService.fetchTableData(event.field, event.direction);
  }

  onRowClick(row: GeographicalData) {
    if (row && row.id) {
      this.router.navigate(['/edit', row.id]);
    }
  }
}
