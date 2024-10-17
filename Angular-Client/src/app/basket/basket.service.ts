import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/ibasket';
import { environment } from '../../environments/environment';
import { IProduct } from '../shared/models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get<IBasket>(environment.apiUrl + `Basket?id=${id}`)
      .pipe(
        map((basket:IBasket) =>{
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      );
  }

  setBasket(basket:IBasket){
    return this.http.post<IBasket>(environment.apiUrl + `Basket`, basket)
    .subscribe((response:IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  private mapProductItemToBasketItem(item: IProduct): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = Number(basket?.items.reduce((a, b) => (b.price * b.quantity) + a, 0));
    const total = subTotal + shipping;
    this.basketTotalSource.next({shipping, total, subTotal});
  }

  private isProduct(item: IProduct | IBasketItem): item is IProduct {
    return (item as IProduct).productBrand !== undefined;
  }

  // addItemToBasket(item:IProduct, quantity = 1){
  //   const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
  //   const basket = this.getCurrentBasketValue() ?? this.createBasket();
  //   basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
  //   this.setBasket(basket);
  // }

  addItemToBasket(item: IProduct | IBasketItem, quantity = 1) {
    if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    console.log(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  // incrementItemQuantity(item: IBasketItem){
  //   const basket = this.getCurrentBasketValue();
  //   const index = Number(basket?.items.findIndex(x => x.id == item.id));
  //   basket!.items[index].quantity++;
  //   this.setBasket(<IBasket>basket);
  // }

  // decrementItemQuantity(item: IBasketItem){
  //   const basket = this.getCurrentBasketValue();
  //   const index = Number(basket?.items.findIndex(x => x.id == item.id));
  //   if(basket!.items[index].quantity > 1){
  //   basket!.items[index].quantity--;
  //   }else{
  //     this.removeItemFromBasket(item);
  //   }
  //   this.setBasket(<IBasket>basket);
  // }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(environment.apiUrl + `Basket?id=${basket.id}`).subscribe(() =>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    })
  }
}
