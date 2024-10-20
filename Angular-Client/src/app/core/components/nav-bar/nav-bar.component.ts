import { Component, OnInit } from '@angular/core';
import {RouterModule } from '@angular/router';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../../shared/models/ibasket';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../shared/models/iuser';
import { AccountService } from '../../../account/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, BsDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  basket$?: Observable<IBasket | null>;
  currentUser$?: Observable<IUser | null>;
  constructor(private basketService: BasketService, public accountService:AccountService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  getCount(){

  }
}
