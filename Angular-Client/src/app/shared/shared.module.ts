import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CdkStepperModule} from '@angular/cdk/stepper';




@NgModule({
  declarations: [],
  imports:
  [
    CommonModule,
    PagingHeaderComponent,
    PagerComponent,
    PaginationModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
  ],
  exports:
  [
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule
  ]
})
export class SharedModule { }
