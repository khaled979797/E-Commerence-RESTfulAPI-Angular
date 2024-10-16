import { AfterViewChecked, Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IProduct } from '../shared/models/iproduct';
import { ShopService } from './shop.service';
import { ShopItemComponent } from "./components/shop-item/shop-item.component";
import { IBrand } from '../shared/models/ibrand';
import { IType } from '../shared/models/itype';
import { ShopParams } from '../shared/models/shop-params';
import { PagerComponent } from "../shared/components/pager/pager.component";
import { PagingHeaderComponent } from "../shared/components/paging-header/paging-header.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopItemComponent, PagerComponent, PagingHeaderComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  @ViewChild('search')searchTerm!: ElementRef;
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'}
  ];
  totalCount:number = 0;
  constructor(private shopService: ShopService) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();;
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response =>{
      this.products = response.data
      this.shopParams.pageNumber = response.pageIndex,
      this.shopParams.pageSize = response.pageSize,
      this.totalCount = response.count
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response =>{
      this.brands = [{id: 0, name: 'All'}, ...response]
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      this.types = [{id: 0, name: 'All'}, ...response]
    });
  }

  onBrandSelected(id:number){
    this.shopParams.brandId = id;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(id:number){
    this.shopParams.typeId = id;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort:Event){
    this.shopParams.sort = (sort.target as HTMLInputElement).value;
    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
