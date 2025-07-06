import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './reusables/header/header.component';
import { GeographicalDataListComponent } from './pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './pages/geographical-data-form/geographical-data-form.component';
import { TableComponent } from './reusables/table/table.component';
import { TableRowComponent } from './reusables/table-row/table-row.component';
import { TextInputComponent } from './reusables/text-input/text-input.component';

const routes: Routes = [
  { path: '', component: GeographicalDataListComponent },
  { path: 'add', component: GeographicalDataFormComponent },
  { path: 'edit/:id', component: GeographicalDataFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GeographicalDataListComponent,
    GeographicalDataFormComponent,
    TableComponent,
    TableRowComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
