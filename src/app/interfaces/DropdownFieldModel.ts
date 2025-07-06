import { DropdownOption } from "./DropdownOption";
export interface DropdownFieldModel {
  key: string;
  label: string;
  options: DropdownOption[] | (() => DropdownOption[]);
  defaultValue: string;
  required?: boolean;
  placeholderText?: string;
}
