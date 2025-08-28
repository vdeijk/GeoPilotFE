import { DropdownOption } from "./dropdown-option";

/**
 * Model for a dropdown field in forms or filters.
 * @property key Unique identifier for the field
 * @property label Display label for the field
 * @property options List of dropdown options or a function returning them
 * @property defaultValue Default selected value
 * @property required Whether the field is required
 * @property placeholderText Optional placeholder text
 */
export interface DropdownFieldModel {
  key: string;
  label: string;
  options: DropdownOption[] | (() => DropdownOption[]);
  defaultValue: string;
  required?: boolean;
  placeholderText?: string;
}
