import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IOrder } from '../shared/models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  getOrdersForUser(){
    return this.http.get<IOrder[]>(environment.apiUrl + 'Order');
  }

  getOrderDetailed(id:number){
    return this.http.get<IOrder>(environment.apiUrl + `Order/${id}`);
  }
}
