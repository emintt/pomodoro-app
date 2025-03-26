import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { SelectedTaskService } from '../../services/selected-task.service';
import { Task } from '../../types/tasks.type';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})


export class TimerComponent {
  notificationService = inject(NotificationService);
  selectedTaskService = inject(SelectedTaskService);
  tasksService = inject(TasksService);

  initialTime = 5 * 1000; 
  remainingTime = signal<number>(this.initialTime);  
  intervalId: ReturnType<typeof setTimeout> | undefined = undefined;
  minute = computed(
    () => Math.floor(this.remainingTime() / 1000 / 60) % 60
  );
  second = computed(
    () => Math.floor(this.remainingTime() / 1000) % 60
  );
  startTime: number = 0;
  elapsedTime: number = 0;

  // Get currently selected task
  get selectedTask(): Task | null {
    return this.selectedTaskService.getSelectedTask();
  }

  // count down, update the countdown every 1 second
  countdown = () => {
    if (this.remainingTime() <= 0) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;

      const date = new Date();
      const duration = this.initialTime;
      if (this.selectedTask) {
        this.tasksService.updateTaskTime(this.selectedTask, date, duration);
      }

      this.notificationService.sendNotification('Pomodoro', `It's time to take a short break!`);
      console.log(`Time's up for ${this.selectedTask?.name}.  ${duration / 1000} seconds`);
      this.resetTimer();
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
    console.log(`Resuming with: ${this.remainingTime()} ms`);

  };

  pause = () => {
    if (this.intervalId) {
      console.log('pause' + this.selectedTask);

      clearInterval(this.intervalId);
      this.intervalId = undefined;
      console.log(`Paused at: ${this.remainingTime()} ms`);
    };

  };


  // Reset the remaining time to the initial value 
  resetTimer = () => {
    this.remainingTime.set(this.initialTime); 
  };


  ngOnDestroy() {
    this.pause();
  }


  
}
