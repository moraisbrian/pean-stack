import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellsComponent } from './sells.component';
import { SellsRoutingModule } from './sells-routing.module';

@NgModule({
  declarations: [
    SellsComponent
  ],
  imports: [
    CommonModule,
    SellsRoutingModule
  ]
})
export class SellsModule { }
