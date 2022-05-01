import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { FormsModule } from '@angular/forms';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

@NgModule({
  declarations: [
    InformationDialogComponent,
    QuestionDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InformationDialogComponent,
    QuestionDialogComponent
  ]
})
export class DialogModule { }
