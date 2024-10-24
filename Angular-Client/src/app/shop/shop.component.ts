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
  shopParams:ShopParams;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'}
  ];
  totalCount:number = 0;
  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();;
  }

  getProducts(useCache = false){
    this.shopService.getProducts(useCache).subscribe(response =>{
      this.products = response.data
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
    const params = this.shopService.getShopParams();
    params.brandId = id;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(id:number){
    const params = this.shopService.getShopParams();
    params.typeId = id;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort:Event){
    const params = this.shopService.getShopParams();
    params.sort = (sort.target as HTMLInputElement).value;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event:any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber != event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    this.getProducts();
  }
}
