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
  @Input() value = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() label = '';
  @Input() error: string | null = null;
  @Input() readonly = false;
  @Input() maxLength?: number;
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter<string>();

  // ControlValueAccessor methods
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  onInput(event: Event) {
    let newValue: any = (event.target as HTMLInputElement).value;
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
