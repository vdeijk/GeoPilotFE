import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContainersModule } from './components/containers/containers.module';
import { PagesModule } from './components/pages/pages.module';
import { ReusablesModule } from './components/reusables/reusables.module';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './common/utilities/global-error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideApi } from './api/generated';
import { environment } from '../environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from './auth0.config';

@NgModule({
  declarations: [
    AppComponent
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
    ContainersModule,
    PagesModule,
    ReusablesModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideApi({ basePath: environment.apiUrl }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
