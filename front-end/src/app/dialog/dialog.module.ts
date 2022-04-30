import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InformationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InformationDialogComponent
  ]
})
export class DialogModule { }
