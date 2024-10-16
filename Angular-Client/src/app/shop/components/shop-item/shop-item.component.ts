import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/models/iproduct';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {
  @Input() product!:IProduct;


  addItemToBasket(){

  }
}
