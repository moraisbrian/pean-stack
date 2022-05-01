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
        this.btnModal?.nativeElement.click();
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
  @ViewChild('btnModal', { static: true }) btnModal?: ElementRef;
  @ViewChild('btnClose', { static: true }) btnClose?: ElementRef;
  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  onYesClick(): void {
    this.confirmAction.emit(true);
    this.btnClose?.nativeElement.click();
  }
}
