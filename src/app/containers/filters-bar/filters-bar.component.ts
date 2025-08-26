import { Component } from '@angular/core';
import { filterFields } from '../../data/geographical-data';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  filterFields = filterFields;

  // Filtering now handled by backend; remove FiltersService

  // Implement backend filter logic here if needed
}
