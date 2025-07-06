import { Injectable } from '@angular/core';
import { DropdownField } from '../classes/DropdownField';

@Injectable({ providedIn: 'root' })
export class FilterService {
  constructor() {}

  static filterByGreaterThan<T>(items: T[], minNumber: number, property: string): T[] {
    if (!minNumber) return items;
    return items.filter((item) => {
      const itemNumber = (item as any)[property];
      if (!itemNumber) return false;
      return itemNumber >= minNumber;
    });
  }

  static filterBySmallerThan<T>(items: T[], maxNumber: number, property: string): T[] {
    if (!maxNumber) return items;
    return items.filter((item) => {
      const itemNumber = (item as any)[property];
      if (!itemNumber) return false;
      return itemNumber <= maxNumber;
    });
  }

  static filterBySearchQuery<T>(items: T[], searchQuery: string, searchableFields: (keyof T)[]): T[] {
    if (!searchQuery || searchQuery.trim() === '') return items;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return items.filter((item) =>
      searchableFields.some((field) => {
        const fieldValue = item[field];
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }

  static filterByDropdowns<T>(items: T[], dropdownFilters: Record<string, DropdownField<string>>): T[] {
    return items.filter((item) =>
      Object.keys(dropdownFilters).every((key) => {
        const filterValue = dropdownFilters[key].value;
        const itemValue = (item as any)[key];
        if (!filterValue || filterValue.trim() === '') return true;
        if (!itemValue) return false;
        return itemValue.toLowerCase() === filterValue.toLowerCase();
      })
    );
  }

  static filterByStartDate<T>(items: T[], startDate: string, property: string): T[] {
    if (!startDate) return items;
    return items.filter((item) => {
      const itemDate = (item as any)[property];
      if (!itemDate) return false;
      return new Date(itemDate) >= new Date(startDate);
    });
  }

  static filterByEndDate<T>(items: T[], endDate: string, property: string): T[] {
    if (!endDate) return items;
    return items.filter((item) => {
      const itemDate = (item as any)[property];
      if (!itemDate) return false;
      return new Date(itemDate) <= new Date(endDate);
    });
  }
}
