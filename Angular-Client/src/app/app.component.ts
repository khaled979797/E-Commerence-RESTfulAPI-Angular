import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SectionHeaderComponent } from "./core/components/section-header/section-header.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, SharedModule, SectionHeaderComponent,
    NgxSpinnerModule, AccountModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private basketService:BasketService, private accountService:AccountService){}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe({
        next: (res:any) =>{
          console.log('initialized basket');
        },
        error: (err:any) =>{
          console.log(err);
        }
      });
    }
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token)?.subscribe({
        next: (res:any) =>{
          console.log('loaded user');
        },
        error: (err:any) =>{
          console.log(err);
        }
      });
    }
  }
}
