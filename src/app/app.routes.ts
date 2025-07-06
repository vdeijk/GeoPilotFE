import { Routes } from '@angular/router';
import { GeographicalDataListComponent } from './pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './pages/geographical-data-form/geographical-data-form.component';

export const routes: Routes = [
  { path: '', component: GeographicalDataListComponent },
  { path: 'add', component: GeographicalDataFormComponent },
  { path: 'edit/:id', component: GeographicalDataFormComponent }
];
