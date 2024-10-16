import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/components/product-details/product-details.component';
import { TestErrorComponent } from './core/components/test-error/test-error.component';
import { ServerErrorComponent } from './core/components/server-error/server-error.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes =
[
  {path: '', component: HomeComponent},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: {breadcrumb: 'Shop'}},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];
