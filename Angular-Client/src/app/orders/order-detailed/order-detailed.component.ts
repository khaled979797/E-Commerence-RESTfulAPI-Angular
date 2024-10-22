import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/iorder';
import { OrdersService } from '../orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detailed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrder;
  constructor(private orderService: OrdersService, private route: ActivatedRoute,
    private bcService: BreadcrumbService) {
      this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }
    })
  }
}
