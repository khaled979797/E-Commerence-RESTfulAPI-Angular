import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';




@NgModule({
  declarations: [],
  imports: [CommonModule, PagingHeaderComponent, PagerComponent, PaginationModule],
  exports: [PagingHeaderComponent, PagerComponent]
})
export class SharedModule { }
