import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() curPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageSize: number = 20;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const windowSize = 5;
    if (this.totalPages <= windowSize + 2) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, this.curPage - Math.floor(windowSize / 2));
      let end = Math.min(this.totalPages - 1, this.curPage + Math.floor(windowSize / 2));
      if (start <= 2) {
        start = 2;
        end = windowSize + 1;
      }
      if (end >= this.totalPages - 1) {
        end = this.totalPages - 1;
        start = this.totalPages - windowSize;
      }
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < this.totalPages - 1) pages.push('...');
      pages.push(this.totalPages);
    }
    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page !== 'number') return;
    if (page >= 1 && page <= this.totalPages && page !== this.curPage) {
      this.pageChange.emit(page);
    }
  }
}
