import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() value: string | number = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() label = '';
  @Input() error: string | null = null;
  @Input() readonly = false;
  @Input() maxLength?: number;
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter<string | number>();

  // Internal change/touch handlers for ControlValueAccessor
  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  // Writes value from parent form
  writeValue(value: string | number): void {
    this.value = value ?? '';
  }

  // Registers change handler from parent form
  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  // Registers touch handler from parent form
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  onInput(event: Event) {
    let newValue: string | number = (event.target as HTMLInputElement).value;
    if (this.type === 'number' && newValue !== '') {
      newValue = Number(newValue);
    }
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  onBlur() {
    this.onTouched();
  }
}
