/**
 * Model for a text input field in forms.
 * @property key Unique identifier for the field
 * @property label Display label for the field
 * @property defaultValue Default value for the field
 * @property required Whether the field is required
 * @property readonly Whether the field is read-only
 * @property placeholder Optional placeholder text
 * @property maxLength Optional maximum length
 */
export interface InputFieldModel {
  key: string;
  label: string;
  defaultValue: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  maxLength?: number;
}
