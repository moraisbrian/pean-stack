import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.showModal.subscribe((result: boolean) => {
      if (result) {
        this.btnInfoModal?.nativeElement.click();
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
  @ViewChild('btnInfoModal', { static: true }) btnInfoModal?: ElementRef;
}
