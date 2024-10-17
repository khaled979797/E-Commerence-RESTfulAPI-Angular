import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SectionHeaderComponent } from "./core/components/section-header/section-header.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, SharedModule, SectionHeaderComponent,
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() =>{
        console.log('initialized basket')
      }, error => {
        console.log(error)
      })
    };
  }
}
