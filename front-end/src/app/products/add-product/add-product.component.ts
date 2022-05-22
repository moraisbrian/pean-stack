import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private productService: ProductsService, private router: Router) { }

  subscription: Subscription = new Subscription();
  productForm!: FormGroup;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription.add(this.route.queryParams.subscribe(params => {
        this.productForm = new FormGroup({
          "id": new FormControl(id),
          "description": new FormControl(params['description'], [Validators.required]),
          "amount": new FormControl(params['amount'], [Validators.required]),
          "unitPrice": new FormControl(params['unitPrice'], [Validators.required])
        });
      }));
    } else {
      this.productForm = new FormGroup({
        "id": new FormControl(null),
        "description": new FormControl(null, [Validators.required]),
        "amount": new FormControl(null, [Validators.required]),
        "unitPrice": new FormControl(null, [Validators.required])
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const product: Product = new Product();
      product.Id = this.productForm.value.id;
      product.Description = this.productForm.value.description;
      product.Amount = this.productForm.value.amount;
      product.UnitPrice = this.productForm.value.unitPrice;

      if (product.Id) {
        this.subscription.add(this.productService.updateProduct(product).subscribe(_ => this.router.navigate(['/products'])));
      } else {
        this.subscription.add(this.productService.addProduct(product).subscribe(_ => this.router.navigate(['/products'])));
      }
    }
  }

}
