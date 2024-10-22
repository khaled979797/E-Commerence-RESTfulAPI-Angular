import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDeliveryMethod } from '../../../shared/models/idelivery-method';
import { CheckoutService } from '../../checkout.service';
import { BasketService } from '../../../basket/basket.service';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: IDeliveryMethod[] = [];

  constructor(private checkoutService:CheckoutService, private basketService: BasketService){}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm => this.deliveryMethods = dm
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

  get deliveryForm(){
    return this.checkoutForm?.get('deliveryForm');
  }
}
