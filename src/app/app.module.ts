import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './reusables/header/header.component';
import { GeographicalDataListComponent } from './pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './pages/geographical-data-form/geographical-data-form.component';
import { TableComponent } from './reusables/table/table.component';
import { TableRowComponent } from './reusables/table-row/table-row.component';
import { TextInputComponent } from './reusables/text-input/text-input.component';
import { SearchBarComponent } from './reusables/search-bar/search-bar.component';
import { ButtonComponent } from './reusables/button/button.component';
import { AccordionComponent } from './reusables/accordion/accordion.component';
import { FooterComponent } from './reusables/footer/footer.component';
import { FiltersBarComponent } from './reusables/filters-bar/filters-bar.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GeographicalDataListComponent,
    GeographicalDataFormComponent,
    TableComponent,
    TableRowComponent,
    TextInputComponent,
    SearchBarComponent,
    ButtonComponent,
    AccordionComponent,
    FooterComponent,
    FiltersBarComponent
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
