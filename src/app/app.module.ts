import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { GeographicalDataListComponent } from './pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './pages/geographical-data-form/geographical-data-form.component';
import { TableComponent } from './reusables/table/table.component';
import { TextInputComponent } from './reusables/text-input/text-input.component';
import { ButtonComponent } from './reusables/button/button.component';
import { AccordionComponent } from './containers/accordion/accordion.component';
import { FooterComponent } from './containers/footer/footer.component';
import { FiltersBarComponent } from './containers/filters-bar/filters-bar.component';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './utility/global-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideApi } from './api/generated';
import { environment } from '../environments/environment';
import { SpinnerComponent } from './reusables/spinner/spinner.component';
import { PaginationComponent } from './containers/pagination/pagination.component';
import { PaginationNavButtonComponent } from './reusables/pagination-nav-button/pagination-nav-button.component';
import { PaginationPageButtonComponent } from './reusables/pagination-page-button/pagination-page-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GeographicalDataListComponent,
    GeographicalDataFormComponent,
    TableComponent,
    TextInputComponent,
    ButtonComponent,
    AccordionComponent,
    FooterComponent,
    FiltersBarComponent,
    SpinnerComponent,
    PaginationComponent,
    PaginationNavButtonComponent,
    PaginationPageButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideApi({ basePath: environment.apiUrl }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
