import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReusablesModule } from '../reusables/reusables.module';
import { AccordionComponent } from './accordion/accordion.component';
import { FiltersBarComponent } from './filters-bar/filters-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AccordionComponent,
    FiltersBarComponent,
    FooterComponent,
    HeaderComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, ReusablesModule, RouterModule],
  exports: [
    AccordionComponent,
    FiltersBarComponent,
    FooterComponent,
    HeaderComponent,
    PaginationComponent,
    CommonModule
  ]
})
export class ContainersModule {}
