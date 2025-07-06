import { FormField } from './FormField';

export class DateField<T> extends FormField<T> {
  constructor(value: T = '' as T, label: string, required: boolean = false) {
    super(value, label, required);
  }
}
