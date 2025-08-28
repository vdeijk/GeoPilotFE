import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @Input() title: string = '';
  expanded = false;

  // Toggles the expanded/collapsed state
  toggle() {
    this.expanded = !this.expanded;
  }
}
