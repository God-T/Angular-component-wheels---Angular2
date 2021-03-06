import {
  Directive,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewChecked,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appAutoScrollToBottom]',
})
export class AutoScrollToBottomDirective implements AfterViewChecked {
  @Input('autoScrollToBottomTriggered') triggered: boolean;
  @Output('onDisableTrigger') emitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    if (this.triggered) {
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
      this.emitter.emit(false);
      this.cdRef.detectChanges(); // work around for ExpressionChangedAfterItHasBeenCheckedError
    }
  }
}
