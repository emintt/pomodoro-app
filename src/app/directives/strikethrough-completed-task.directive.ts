import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appStrikethroughCompletedTask]',
  standalone: true
})
export class StrikethroughCompletedTaskDirective {
  isCompleted = input(false);
  el = inject(ElementRef);
  constructor() { }

  styleEffect = effect(() => {
    if (!this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = "line-through";
    } else {
      this.el.nativeElement.style.textDecoration = "none";
    }
  });

}
