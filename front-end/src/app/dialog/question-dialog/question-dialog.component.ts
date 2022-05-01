import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.showModal.subscribe((result: boolean) => {
      if (result) {
        this.btnQuestionModal?.nativeElement.click();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscription: Subscription = new Subscription();
  @Input() title?: string;
  @Input() content?: string;
  @Input() showModal: Subject<boolean> = new Subject<boolean>();
  @ViewChild('btnQuestionModal', { static: true }) btnQuestionModal?: ElementRef;
  @ViewChild('btnQuestionClose', { static: true }) btnQuestionClose?: ElementRef;
  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  onYesClick(): void {
    this.confirmAction.emit(true);
    this.btnQuestionClose?.nativeElement.click();
  }
}
