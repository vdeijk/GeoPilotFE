import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SortService<T> {
  sortField: keyof T | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor() {}

  setSortField(field: keyof T) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
  }

  sortItems(items: T[]): T[] {
    if (!this.sortField) return items;

    return items.slice().sort((a, b) => {
      const fieldA = a[this.sortField!];
      const fieldB = b[this.sortField!];

      if (fieldA === undefined || fieldB === undefined) {
        return 0;
      }

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return this.sortOrder === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return this.sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      if (typeof fieldA === 'boolean' && typeof fieldB === 'boolean') {
        return this.sortOrder === 'asc'
          ? Number(fieldA) - Number(fieldB)
          : Number(fieldB) - Number(fieldA);
      }
      // fallback to string comparison
      return this.sortOrder === 'asc'
        ? String(fieldA).localeCompare(String(fieldB))
        : String(fieldB).localeCompare(String(fieldA));
    });
  }
}
