import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SortService<T> {
  public sortField: keyof T | null = null;
  public sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {}

  public setSortField(field: keyof T) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  public sortItems(items: T[]): T[] {
    if (!this.sortField) return items;

    return items.slice().sort((a, b) => {
      const fieldA = a[this.sortField!] as any;
      const fieldB = b[this.sortField!] as any;

      if (fieldA === undefined || fieldB === undefined) {
        return 0;
      }

      if (fieldA < fieldB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }

      if (fieldA > fieldB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }
}
