import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../shared/models/iproduct';
import { IPagination } from '../shared/models/ipagination';
import { IBrand } from '../shared/models/ibrand';
import { IType } from '../shared/models/itype';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = 'https://localhost:44375/Api/V1/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams:ShopParams): Observable<IPagination<IProduct[]>>{
    let params = new HttpParams();
    if(shopParams.brandId !== 0) params = params.append('brandId', shopParams.brandId.toString());
    if(shopParams.typeId !== 0) params = params.append('typeId', shopParams.typeId.toString());
    if(shopParams.search) params = params.append('search', shopParams.search);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'Product/List', {params}).pipe(
      map(response =>{
        return response
      })
    );
  }

  getBrands(): Observable<IBrand[]>{
    return this.http.get<IBrand[]>(this.baseUrl + 'Product/Brands');
  }

  getTypes(): Observable<IType[]>{
    return this.http.get<IType[]>(this.baseUrl + 'Product/Types');
  }
}
