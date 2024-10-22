import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/iorder';
import { OrdersService } from './orders.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  orders?: IOrder[];
  constructor(private orderService:OrdersService){}

  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe(response =>{
      this.orders = response
    });
  }
}
