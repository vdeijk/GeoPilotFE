import { FormField } from "./FormField";

export class TextField extends FormField<string> {
  placeholder?: string;
  maxLength?: number;
  error?: string | null;
  readonly?: boolean;

  constructor(
    value: string,
    label: string,
    required: boolean = false,
    placeholder?: string,
    maxLength?: number,
    readonly?: boolean
  ) {
    super(value, label, required);
    this.placeholder = placeholder;
    this.maxLength = maxLength;
    this.readonly = readonly;
  }

  public sanitize = (opts?: {
  trim?: boolean;
  lowerCase?: boolean;
  removeSpecial?: boolean;
}): boolean => {
  let isValid = true;
  if (typeof this.value === "string") {
    let sanitized = this.value;
    if (!opts || opts.trim) sanitized = sanitized.trim();
    if (opts?.lowerCase) sanitized = sanitized.toLowerCase();
    if (opts?.removeSpecial) sanitized = sanitized.replace(/[^\w\s]/gi, "");
    if (this.maxLength && sanitized.length > this.maxLength) {
      sanitized = sanitized.slice(0, this.maxLength);
      isValid = false;
      this.error = `Input cannot exceed ${this.maxLength} characters`;
    }
    this.value = sanitized;
  }
  return isValid;
};

  public validateMaxLength = (): boolean => {
    if (
      this.maxLength &&
      typeof this.value === "string" &&
      this.value.length > this.maxLength
    ) {
      this.error = `Input cannot exceed ${this.maxLength} characters`;

      return true;
    }

    return false;
  };
}
