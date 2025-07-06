import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() label = '';
  @Input() error: string | null = null;
  @Input() readonly = false;
  @Input() maxLength?: number;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(newValue);
    // EventBus logic can be added here if needed
  }
}
