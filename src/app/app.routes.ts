import { Routes } from '@angular/router';
import { GeographicalDataListComponent } from './components/pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './components/pages/geographical-data-form/geographical-data-form.component';

export const routes: Routes = [
  { path: '', component: GeographicalDataListComponent },
  { path: 'add', component: GeographicalDataFormComponent },
  { path: 'edit/:id', component: GeographicalDataFormComponent }
];
