import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../types/tasks.type';
import { StrikethroughCompletedTaskDirective } from '../../directives/strikethrough-completed-task.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [StrikethroughCompletedTaskDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  task = input.required<Task>(); // input is used to pass data from parent to child
  selectedTask = signal<Task | null>(null);  // Track selected task


  taskToggle = output<Task>(); // output to emit task item

  taskClicked() {
    this.taskToggle.emit(this.task());
  }

}
