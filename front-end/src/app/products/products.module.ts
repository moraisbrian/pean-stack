import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsService } from './products.service';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    DialogModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
