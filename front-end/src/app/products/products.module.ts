import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { DialogModule } from '../dialog/dialog.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
