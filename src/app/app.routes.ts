import { Routes } from '@angular/router';
import { AuthGuard } from './common/auth/auth.guard';
import { GeographicalDataListComponent } from './components/pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './components/pages/geographical-data-form/geographical-data-form.component';

export const routes: Routes = [
  { path: '', component: GeographicalDataListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: GeographicalDataFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: GeographicalDataFormComponent, canActivate: [AuthGuard] }
];
