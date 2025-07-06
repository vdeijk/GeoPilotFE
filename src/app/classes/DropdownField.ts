import { FormField } from './FormField';
import { DropdownOption } from '../interfaces/DropdownOption';

export class DropdownField<T> extends FormField<T> {
  options: DropdownOption[] = [];
  placeholderText: string = '';

  constructor(
    value: T,
    label: string,
    required: boolean = false,
    options: DropdownOption[] = [],
    placeholderText: string = '',
  ) {
    super(value, label, required);
    this.options = options;
    this.placeholderText = placeholderText || `Select ${label}`;
  }

  public generateDropdownOptions = (
    options: DropdownOption[],
    customPlaceholderText?: string,
  ) => {
    if (customPlaceholderText) {
      this.placeholderText = customPlaceholderText;
    }
    this.options = [{ value: '', label: this.placeholderText }, ...options];
  };

  public isPlaceholderSelected = () => {
    return this.value === '';
  };
}
