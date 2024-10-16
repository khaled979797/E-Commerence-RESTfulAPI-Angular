import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavBarComponent,
    SectionHeaderComponent,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})

export class CoreModule {

}
