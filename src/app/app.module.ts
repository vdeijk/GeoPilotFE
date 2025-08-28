import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/containers/header/header.component';
import { GeographicalDataListComponent } from './components/pages/geographical-data-list/geographical-data-list.component';
import { GeographicalDataFormComponent } from './components/pages/geographical-data-form/geographical-data-form.component';
import { TableComponent } from './components/reusables/table/table.component';
import { TextInputComponent } from './components/reusables/text-input/text-input.component';
import { ButtonComponent } from './components/reusables/button/button.component';
import { AccordionComponent } from './components/containers/accordion/accordion.component';
import { FooterComponent } from './components/containers/footer/footer.component';
import { FiltersBarComponent } from './components/containers/filters-bar/filters-bar.component';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './common/utilities/global-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideApi } from './api/generated';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from './auth0.config';
import { SpinnerComponent } from './components/reusables/spinner/spinner.component';
import { PaginationComponent } from './components/containers/pagination/pagination.component';
import { PaginationNavButtonComponent } from './components/reusables/pagination-nav-button/pagination-nav-button.component';
import { PaginationPageButtonComponent } from './components/reusables/pagination-page-button/pagination-page-button.component';
import { LogoutButtonComponent } from './components/reusables/logout-button/logout-button.component';

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
    // Added LogoutButtonComponent
    // Make sure to import it at the top
    // import { LogoutButtonComponent } from './reusables/logout-button/logout-button.component';
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(),
  AuthModule.forRoot(auth0Config),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideApi({ basePath: environment.apiUrl }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
