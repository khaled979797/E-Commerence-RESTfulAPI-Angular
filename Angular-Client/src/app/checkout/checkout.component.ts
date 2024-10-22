import { Component, OnInit } from '@angular/core';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from "../shared/components/stepper/stepper.component";
import { CheckoutAddressComponent } from "./components/checkout-address/checkout-address.component";
import { CheckoutDeliveryComponent } from "./components/checkout-delivery/checkout-delivery.component";
import { CheckoutReviewComponent } from "./components/checkout-review/checkout-review.component";
import { CheckoutPaymentComponent } from "./components/checkout-payment/checkout-payment.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, OrderTotalsComponent, CdkStepperModule, CheckoutAddressComponent, CheckoutDeliveryComponent, CheckoutReviewComponent, CheckoutPaymentComponent, StepperComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private accountService:AccountService) { }

  completed = false;

  completeStep(): void {
    this.completed = true;
  }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFromValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['', Validators.required]
      })
    })
  }

  getAddressFromValues(){
    this.accountService.getUserAddress().subscribe(address =>{
      this.checkoutForm.get('addressForm')?.patchValue(address)
    });
  }
}
