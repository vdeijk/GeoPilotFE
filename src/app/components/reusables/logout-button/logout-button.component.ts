import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  // Emits logout event when button is clicked
  @Output() logout = new EventEmitter<void>();
}
