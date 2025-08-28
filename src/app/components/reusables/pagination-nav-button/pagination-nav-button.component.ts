import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-nav-button',
  templateUrl: './pagination-nav-button.component.html',
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
