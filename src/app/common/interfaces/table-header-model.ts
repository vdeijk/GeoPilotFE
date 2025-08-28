/**
 * Model for a table header column.
 * @template T The type of data represented in the table
 * @property id The key of the data or 'actions'
 * @property label Display label for the column
 * @property sortable Whether the column is sortable
 * @property type Data type for the column
 * @property tooltip Optional tooltip for the column
 */
export interface TableHeaderModel<T> {
  id: keyof T | 'actions';
  label: string;
  sortable: boolean;
  type: 'date' | 'string' | 'number' | 'action' | 'boolean';
  tooltip?: string;
}
