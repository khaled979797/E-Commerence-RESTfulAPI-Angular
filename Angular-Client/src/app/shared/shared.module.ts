import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';




@NgModule({
  declarations: [],
  imports: [CommonModule, PagingHeaderComponent, PagerComponent, PaginationModule, CarouselModule.forRoot()],
  exports: [PagingHeaderComponent, PagerComponent, CarouselModule]
})
export class SharedModule { }
