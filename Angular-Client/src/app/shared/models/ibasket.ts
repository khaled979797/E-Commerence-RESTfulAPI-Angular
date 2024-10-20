import { createId } from '@paralleldrive/cuid2';
import { IBasketItem } from './ibasket-item';

export interface IBasket {
  id: string;
  items: IBasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice: number;
}



export class Basket implements IBasket{
  id:string = createId();
  items:IBasketItem[] = [];
  shippingPrice = 0;
}
