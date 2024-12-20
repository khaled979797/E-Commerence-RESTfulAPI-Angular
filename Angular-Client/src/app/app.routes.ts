import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/components/product-details/product-details.component';
import { TestErrorComponent } from './core/components/test-error/test-error.component';
import { ServerErrorComponent } from './core/components/server-error/server-error.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { skip } from 'rxjs';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes =
[
  {path: '', component: HomeComponent},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule), data: {breadcrumb: 'Shop'}},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule), data: {breadcrumb: 'Basket'}},
  {path: 'checkout', canActivate: [authGuard], loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule), data: {breadcrumb: 'Checkout'}},
  {path: 'orders', canActivate: [authGuard], loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule), data: {breadcrumb: 'Orders'}},
  {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
