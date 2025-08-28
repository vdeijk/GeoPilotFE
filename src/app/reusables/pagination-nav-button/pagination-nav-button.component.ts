import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-nav-button',
  template: `
    <button
      (click)="onClick()"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      class="pagination-nav-btn"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./pagination-nav-button.component.scss']
})
export class PaginationNavButtonComponent {
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Output() navClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.navClick.emit();
    }
  }
}
