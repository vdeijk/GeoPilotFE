export class FormField<T> {
  value: T;
  label: string;
  required: boolean;

  constructor(value: T, label: string, required: boolean = false) {
    this.value = value;
    this.label = label;
    this.required = required;
  }

  public setValue = (value: T) => {
    if (value === null || value === undefined) {
      console.warn(`Invalid value for ${this.label}:`, value);
      this.value = '' as T;
    } else {
      this.value = value;
    }
  };
  public reset = () => {
    this.value = '' as T;
  };

  public validateRequired = (): string | null => {
    if (this.required && !this.value) {
      return `${this.label} is required.`;
    }
    return null;
  };
}
