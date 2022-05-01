import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService) { }

  products$: Observable<Product[]> = new Observable<Product[]>();

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  ngOnDestroy(): void {
  }

}
