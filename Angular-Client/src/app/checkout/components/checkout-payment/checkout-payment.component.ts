import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBasket } from '../../../shared/models/ibasket';
import { IOrderToCreate } from '../../../shared/models/iorder-to-create';
import { IAddress } from '../../../shared/models/iaddress';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from '../../../basket/basket.service';
import { CheckoutService } from '../../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkStepperModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumberElement') cardNumberElement!: ElementRef;
  @ViewChild('cardExpiryElement') cardExpiryElement!: ElementRef;
  @ViewChild('cardCvcElement') cardCvcElement!: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  // cardNumber: any;
  // cardExpiry: any;
  // cardCvc: any;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: string | null = null;
  loading = false;


  constructor(private basketService: BasketService, private checkoutService: CheckoutService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    loadStripe('pk_test_51Po0zG08Jg0oDVu5nX1ZfTkhJmz0eA0OsxdgKZlnexGG8VpSunLSS8CdBBRCU5kiL4cc4uSvfaRL9F4GtyGH3eyY00vhxyaVp1').then((stripe) => {
      if (!stripe) {
        console.error('Stripe initialization failed.');
        return;
      }

      this.stripe = stripe;
      const elements = stripe.elements();
      const style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      };

      if (elements) {
        this.cardNumber = elements.create('cardNumber', { style });
        this.cardNumber.mount(this.cardNumberElement.nativeElement);
        this.cardNumber.on('change', (event: any) => {
          this.cardNumberComplete = event.complete;
          this.cardErrors = event.error ? event.error.message : null;
        });

        this.cardExpiry = elements.create('cardExpiry', { style });
        this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
        this.cardExpiry.on('change', (event: any) => {
          this.cardExpiryComplete = event.complete;
          this.cardErrors = event.error ? event.error.message : null;
        });

        this.cardCvc = elements.create('cardCvc', { style });
        this.cardCvc.mount(this.cardCvcElement.nativeElement);
        this.cardCvc.on('change', (event: any) => {
          this.cardCvcComplete = event.complete;
          this.cardErrors = event.error ? event.error.message : null;
        });
      }
    });
  }


  get paymentFormComplete() {
    return this.checkoutForm?.get('paymentForm')?.valid
      && this.cardNumberComplete
      && this.cardExpiryComplete
      && this.cardCvcComplete
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (error: any) {
      console.log(error);
      this.toastr.error(error.message)
    } finally {
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: IBasket | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }

  private async createOrder(basket: IBasket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as IAddress;
    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }
}
