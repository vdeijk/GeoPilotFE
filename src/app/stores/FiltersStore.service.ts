import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filterFields } from '../data/GeographicalData';

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
export class FiltersStore {
  private filtersSubject = new BehaviorSubject<FiltersState>(getInitialFiltersState());
  filters$ = this.filtersSubject.asObservable();

  setFilter(key: string, value: string) {
    const current = { ...this.filtersSubject.value };
    current[key] = value;
    this.filtersSubject.next(current);
  }

  resetFilters() {
    this.filtersSubject.next(getInitialFiltersState());
  }
}
