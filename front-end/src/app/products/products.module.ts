import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
