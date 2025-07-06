export interface EventMap {
  [key: string]: void | object;
  'pagination:currentPageChanged': void;
  'filteredItems:updated': void;
  'searchQuery:updated': void;
  'dropdownFilters:updated': void;
  'dateFilters:updated': void;
  'locations:updated': void;
}
