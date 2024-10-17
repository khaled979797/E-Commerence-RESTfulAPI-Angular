import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/ibasket';
import { CommonModule } from '@angular/common';
import { BasketSummaryComponent } from "../shared/components/basket-summary/basket-summary.component";
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, BasketSummaryComponent, OrderTotalsComponent, RouterLink],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  constructor(public basketService: BasketService){}

  incrementQuantity(item: IBasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: {id: number, quantity: number}) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }
}
