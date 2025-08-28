import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-page-button',
  template: `
    <button
      (click)="onClick()"
      [class.pagination-page-btn]="true"
      [class.active]="active"
      [disabled]="disabled"
    >
      {{ page }}
    </button>
  `,
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
