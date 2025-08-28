export interface TableHeaderModel<T> {
  id: keyof T | 'actions';
  label: string;
  sortable: boolean;
  type: 'date' | 'string' | 'number' | 'action' | 'boolean';
  tooltip?: string;
}
