import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/iproduct';
import { ShopService } from '../../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product!:IProduct;

  constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute,
    private bcService: BreadcrumbService){
      this.bcService.set('@ProductDetails', ' ')
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@ProductDetails', product.name);
      },
      error: error => console.log(error)
    })
  }
}
