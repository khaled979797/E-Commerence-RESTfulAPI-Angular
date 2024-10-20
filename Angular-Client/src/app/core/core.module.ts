import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    SectionHeaderComponent,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    SharedModule,
    BsDropdownModule
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})

export class CoreModule {

}
