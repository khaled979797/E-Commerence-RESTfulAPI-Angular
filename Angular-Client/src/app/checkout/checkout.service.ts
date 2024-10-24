import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/models/idelivery-method';
import { IOrderToCreate } from '../shared/models/iorder-to-create';
import { IOrder } from '../shared/models/iorder';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) {}

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(environment.apiUrl + 'Order/GetDeliveryMethods').pipe(
      map((dm:IDeliveryMethod[]) =>{
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post<IOrder>(environment.apiUrl + 'Order/CreateOrder', order);
  }
}
