import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IOrder } from '../../../shared/models/iorder';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent {
  order?: IOrder;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state as IOrder
  }
}
