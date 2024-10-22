import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import {CdkStepperModule} from '@angular/cdk/stepper';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CdkStepperModule
  ]
})
export class CheckoutModule { }
