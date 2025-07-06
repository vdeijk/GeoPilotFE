// Import the generated interface from OpenAPI Generator
import { GeographicalData } from '../api/generated/model/geographicalData';
import { TableHeaderModel } from "../interfaces/TableHeaderModel";
import { InputFieldModel } from "../interfaces/InputFieldModel";

export interface GeographicalFieldConfig<T = any> {
  key: keyof T;
  label: string;
  type: "text" | "number" | "dropdown" | "date";
  required?: boolean;
  showInTable?: boolean;
  showInForm?: boolean;
  showInFilter?: boolean;
  sortable?: boolean;
  placeholder?: string;
  maxLength?: number;
  section?: string;
  options?: { label: string; value: string }[];
}

type GeographicalDataKeys = keyof GeographicalData;

const fields: GeographicalFieldConfig<GeographicalData>[] = [
  // Address section
  { key: "openbareruimte", label: "Openbare ruimte", type: "text", required: true, showInTable: true, showInForm: true, showInFilter: true, sortable: true, placeholder: "Openbare ruimte", maxLength: 50, section: "Address" },
  { key: "huisnummer", label: "Huisnummer", type: "number", required: true, showInTable: true, showInForm: true, showInFilter: true, sortable: true, placeholder: "Huisnummer", maxLength: 10, section: "Address" },
  { key: "huisletter", label: "Huisletter", type: "text", showInTable: true, showInForm: true, section: "Address" },
  { key: "huisnummertoevoeging", label: "Huisnummertoevoeging", type: "number", showInTable: true, showInForm: true, section: "Address" },
  { key: "postcode", label: "Postcode", type: "text", required: true, showInTable: true, showInForm: true, showInFilter: true, sortable: true, placeholder: "Postcode", maxLength: 10, section: "Address" },
  { key: "woonplaats", label: "Woonplaats", type: "text", required: true, showInTable: true, showInForm: true, showInFilter: true, sortable: true, placeholder: "Woonplaats", maxLength: 50, section: "Address" },
  { key: "gemeente", label: "Gemeente", type: "text", showInTable: true, showInForm: true, section: "Address" },
  { key: "provincie", label: "Provincie", type: "text", showInTable: true, showInForm: true, section: "Address" },
  // Object Information
  { key: "nummeraanduiding", label: "Nummeraanduiding", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "verblijfsobjectgebruiksdoel", label: "Verblijfsobjectgebruiksdoel", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "oppervlakteverblijfsobject", label: "Oppervlakte verblijfsobject", type: "number", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "verblijfsobjectstatus", label: "Verblijfsobjectstatus", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "objectId", label: "Object ID", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "objectType", label: "Object type", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  { key: "nevenadres", label: "Nevenadres", type: "text", showInTable: true, showInForm: true, section: "Object Information" },
  // Building Information
  { key: "pandid", label: "Pandid", type: "text", showInTable: true, showInForm: true, section: "Building Information" },
  { key: "pandstatus", label: "Pandstatus", type: "text", showInTable: true, showInForm: true, section: "Building Information" },
  { key: "pandbouwjaar", label: "Pandbouwjaar", type: "number", showInTable: true, showInForm: true, section: "Building Information" },
  // Location
  { key: "x", label: "X", type: "number", showInTable: true, showInForm: true, section: "Location" },
  { key: "y", label: "Y", type: "number", showInTable: true, showInForm: true, section: "Location" },
  { key: "lon", label: "Lon", type: "number", showInTable: true, showInForm: true, section: "Location" },
  { key: "lat", label: "Lat", type: "number", showInTable: true, showInForm: true, section: "Location" },
];

export const tableHeaders: TableHeaderModel<any>[] = fields.filter(f => f.showInTable).map(f => ({
  id: f.key as string,
  label: f.label,
  sortable: !!f.sortable,
  type: f.type === 'text' ? 'string' : (f.type as 'string' | 'number' | 'boolean' | 'date' | 'action'),
}));

export const filterFields: InputFieldModel[] = fields.filter(f => f.showInFilter).map(f => ({
  key: f.key as string,
  label: f.label,
  placeholder: f.placeholder,
  maxLength: f.maxLength,
  defaultValue: ""
}));

export default fields;
