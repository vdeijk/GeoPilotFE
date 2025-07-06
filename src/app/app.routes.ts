import { Routes } from '@angular/router';

export const routes: Routes = [
  // Updated to use new pages structure
  { path: '', component: (await import('./pages/geographical-data-list/geographical-data-list.component')).GeographicalDataListComponent },
  { path: 'add', component: (await import('./pages/geographical-data-form/geographical-data-form.component')).GeographicalDataFormComponent },
  { path: 'edit/:id', component: (await import('./pages/geographical-data-form/geographical-data-form.component')).GeographicalDataFormComponent }
];
