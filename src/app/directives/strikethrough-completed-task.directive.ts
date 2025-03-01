import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appStrikethroughCompletedTask]',
  standalone: true
})
export class StrikethroughCompletedTaskDirective {
  isCompleted = input(false); // input from user
  el = inject(ElementRef);
  constructor() { }

  styleEffect = effect(() => {
    if (!this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = "line-through";
      this.el.nativeElement.style.backgroundColor = "gray";

    } else {
      this.el.nativeElement.style.textDecoration = "none";
    }
  });

}
