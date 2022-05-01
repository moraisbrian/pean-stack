import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
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
  showQuestionModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  showInformationModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  productToDelete: string = '';
  subscriptions: Subscription = new Subscription();
  infoMessage: string = '';

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editProduct(event: Event): void {
    const productId = (<HTMLButtonElement>event.target).value;
    console.log(productId);
  }

  deleteProduct(event: Event): void {
    const productId = (<HTMLButtonElement>event.target).value;
    this.showQuestionModal.emit(true);
    this.productToDelete = productId;
  }

  confirmDelete(event: boolean): void {
    if (event) {
      this.subscriptions.add(this.productsService.deleteProduct(this.productToDelete)
        .subscribe({
          next: (result: number) => {
            if (result === 1) {
              this.products$ = this.productsService.getProducts();
            } else {
              this.infoMessage = 'Erro ao tentar remover o produto';
              this.showInformationModal.emit(true);
            }
          },
          error: (err: any) => {
            this.infoMessage = `Erro ao tentar remover o produto: ${err?.error?.name}`;
            this.showInformationModal.emit(true);
          }, 
        }));
    }
  }

}
