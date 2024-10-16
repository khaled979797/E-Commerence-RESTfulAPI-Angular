import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/iproduct';
import { ShopService } from '../shop.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product!:IProduct;

  constructor(private shopService:ShopService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    let id = Number(this.route.snapshot.paramMap?.get('id'));
    this.shopService.getProduct(id).subscribe(prod => {
      this.product = prod
    }, error => {console.log(error)})
  };
}
