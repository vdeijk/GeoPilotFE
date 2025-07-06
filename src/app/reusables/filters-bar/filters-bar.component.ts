import { Component } from '@angular/core';
import { filterFields } from '../../data/GeographicalData';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  filterFields = filterFields.map(f => ({ ...f, value: '' })); // Add value property for binding

  onValueChange(idx: number, newValue: string) {
    this.filterFields[idx].value = newValue;
    // TODO: Emit filter change event to parent if needed
  }
}
