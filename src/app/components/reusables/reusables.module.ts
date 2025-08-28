import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { PaginationNavButtonComponent } from './pagination-nav-button/pagination-nav-button.component';
import { PaginationPageButtonComponent } from './pagination-page-button/pagination-page-button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableComponent } from './table/table.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LogoutButtonComponent,
    PaginationNavButtonComponent,
    PaginationPageButtonComponent,
    SpinnerComponent,
    TableComponent,
    TextInputComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    LogoutButtonComponent,
    PaginationNavButtonComponent,
    PaginationPageButtonComponent,
    SpinnerComponent,
    TableComponent,
    TextInputComponent,
    CommonModule
  ]
})
export class ReusablesModule {}
