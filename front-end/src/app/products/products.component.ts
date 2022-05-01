import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  showModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  productToDelete: string = '';

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  ngOnDestroy(): void {
  }

  editProduct(event: Event): void {
    const productId = (<HTMLButtonElement>event.target).value;
    console.log(productId);
  }

  deleteProduct(event: Event): void {
    const productId = (<HTMLButtonElement>event.target).value;
    this.showModal.emit(true);
    this.productToDelete = productId;
  }

  confirmDelete(event: boolean): void {
    if (event) {
      console.log(this.productToDelete);
    }
  }

}
