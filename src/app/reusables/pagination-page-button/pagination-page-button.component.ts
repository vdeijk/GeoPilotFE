import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-page-button',
  templateUrl: './pagination-page-button.component.html',
  styleUrls: ['./pagination-page-button.component.scss']
})
export class PaginationPageButtonComponent {
  @Input() page!: number | string;
  @Input() active = false;
  @Input() disabled = false;
  @Output() pageClick = new EventEmitter<number>();

  onClick() {
    if (!this.disabled && typeof this.page === 'number') {
      this.pageClick.emit(this.page);
    }
  }
}
