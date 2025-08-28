export interface InputFieldModel {
  key: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  maxLength?: number;
}
