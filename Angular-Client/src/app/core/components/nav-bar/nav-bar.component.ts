import { Component, OnInit } from '@angular/core';
import {RouterModule } from '@angular/router';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../../shared/models/ibasket';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  basket$?: Observable<IBasket | null>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  getCount(){

  }
}
