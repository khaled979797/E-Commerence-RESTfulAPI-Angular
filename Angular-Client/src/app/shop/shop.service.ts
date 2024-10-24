import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IProduct } from '../shared/models/iproduct';
import { IPagination } from '../shared/models/ipagination';
import { IBrand } from '../shared/models/ibrand';
import { IType } from '../shared/models/itype';
import { ShopParams } from '../shared/models/shop-params';
import { environment } from '../../environments/environment';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  products:IProduct[] = [];
  brands:IBrand[] = [];
  types:IType[] = [];
  pagination!: IPagination<IProduct[]>;
  shopParams = new ShopParams();
  constructor(private http: HttpClient) { }

  getProducts(useCache:boolean): Observable<IPagination<IProduct[]>>{
    if(useCache === false) this.products = [];
    if(this.products.length > 0 && useCache === true){
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);
      if(this.shopParams.pageNumber <= pagesReceived){
        this.pagination.data =
        this.products.slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize,
        this.shopParams.pageNumber * this.shopParams.pageSize);
        return of(this.pagination);
      }
    }
    let params = new HttpParams();
    if(this.shopParams.brandId !== 0) params = params.append('brandId', this.shopParams.brandId.toString());
    if(this.shopParams.typeId !== 0) params = params.append('typeId', this.shopParams.typeId.toString());
    if(this.shopParams.search) params = params.append('search', this.shopParams.search);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageSize', this.shopParams.pageSize);

    return this.http.get<IPagination<IProduct[]>>(environment.apiUrl + 'Product/List', {params}).pipe(
      map(response =>{
        this.products = [...this.products, ...response.data];
        this.pagination = response;
        return this.pagination
      })
    );
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getShopParams(){
    return this.shopParams;
  }

  getProduct(id:number): Observable<IProduct>{
    const product = this.products.find(x => x.id == id);
    if(product) return of(product);
    return this.http.get<IProduct>(environment.apiUrl + `Product/${id}`);
  }

  getBrands(): Observable<IBrand[]>{
    if(this.brands.length > 0) return of(this.brands);
    return this.http.get<IBrand[]>(environment.apiUrl + 'Product/Brands').pipe(
      map(response =>{
        this.brands = response;
        return response;
      })
    );;
  }

  getTypes(): Observable<IType[]>{
    if(this.types.length > 0) return of(this.types);
    return this.http.get<IType[]>(environment.apiUrl + 'Product/Types').pipe(
      map(response =>{
        this.types = response;
        return response;
      })
    );
  }
}
