import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../shared/models/iproduct';
import { IPagination } from '../shared/models/ipagination';
import { IBrand } from '../shared/models/ibrand';
import { IType } from '../shared/models/itype';
import { ShopParams } from '../shared/models/shop-params';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient) { }

  getProducts(shopParams:ShopParams): Observable<IPagination<IProduct[]>>{
    let params = new HttpParams();
    if(shopParams.brandId !== 0) params = params.append('brandId', shopParams.brandId.toString());
    if(shopParams.typeId !== 0) params = params.append('typeId', shopParams.typeId.toString());
    if(shopParams.search) params = params.append('search', shopParams.search);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    return this.http.get<IPagination<IProduct[]>>(environment.apiUrl + 'Product/List', {params}).pipe(
      map(response =>{
        return response
      })
    );
  }

  getProduct(id:number): Observable<IProduct>{
    return this.http.get<IProduct>(environment.apiUrl + `Product/${id}`);
  }

  getBrands(): Observable<IBrand[]>{
    return this.http.get<IBrand[]>(environment.apiUrl + 'Product/Brands');
  }

  getTypes(): Observable<IType[]>{
    return this.http.get<IType[]>(environment.apiUrl + 'Product/Types');
  }
}
