import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReusablesModule } from '../reusables/reusables.module';
import { GeographicalDataFormComponent } from './geographical-data-form/geographical-data-form.component';
import { GeographicalDataListComponent } from './geographical-data-list/geographical-data-list.component';
import { ContainersModule } from '../containers/containers.module';

@NgModule({
  declarations: [
    GeographicalDataFormComponent,
    GeographicalDataListComponent,
  ],
  imports: [CommonModule, ReusablesModule, ReactiveFormsModule, ContainersModule],
  exports: [
    GeographicalDataFormComponent,
    GeographicalDataListComponent,
    CommonModule
  ]
})
export class PagesModule {}
