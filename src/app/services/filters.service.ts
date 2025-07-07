import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filterFields } from '../data/geographical-data';

export interface FiltersState {
  [key: string]: string;
}

function getInitialFiltersState(): FiltersState {
  const state: FiltersState = {};
  for (const f of filterFields) {
    state[f.key] = '';
  }
  return state;
}

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private filtersSubject = new BehaviorSubject<FiltersState>(
    getInitialFiltersState()
  );
  filters$ = this.filtersSubject.asObservable();

  setFilter(key: string, value: string) {
    const current = { ...this.filtersSubject.value };
    current[key] = value;
    this.filtersSubject.next(current);
  }

  resetFilters() {
    this.filtersSubject.next(getInitialFiltersState());
  }

  applyFilters<T>(data: T[], filters: FiltersState): T[] {
    let filtered = data;
    const searchTerm = filters['search'] || '';
    if (searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter((item) =>
        Object.values(item as object).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'search') return;
      if (value && value.trim() !== '') {
        filtered = filtered.filter((item) => {
          const fieldValue = (item as any)[key as keyof T];
          return (
            fieldValue !== null &&
            fieldValue !== undefined &&
            fieldValue.toString().toLowerCase().includes(value.toLowerCase())
          );
        });
      }
    });
    return filtered;
  }
}
