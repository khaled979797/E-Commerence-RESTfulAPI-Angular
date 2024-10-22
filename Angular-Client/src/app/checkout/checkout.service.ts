import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { IDeliveryMethod } from '../shared/models/idelivery-method';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(environment.apiUrl + 'Order/GetDeliveryMethods').pipe(
      map((dm:IDeliveryMethod[]) =>{
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
