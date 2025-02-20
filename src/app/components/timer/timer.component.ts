import { Component, computed, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})


export class TimerComponent {
  remainingTime = signal<number>(0.25 * 60 * 1000);  // 1p30s 
  minute = computed(
    () => Math.floor(this.remainingTime() / 1000 / 60) % 60
  );
  second = computed(
    () => Math.floor(this.remainingTime() / 1000) % 60
  );

  intervalId: ReturnType<typeof setTimeout> | undefined = undefined;


  // update the countdown every 1 second
  countdown = () => {
    if (this.remainingTime() === 0) {
      this.pause();
      return;
    }
    this.remainingTime.update((val: number) => {
      return (val - 1000);
    });
  }

  start = () => {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.countdown, 1000);
    };
 
  };

  pause = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    };
  };

  ngOnDestroy() {
    this.pause();
  }
  
}
