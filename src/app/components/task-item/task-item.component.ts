import { Component, input, output, signal } from '@angular/core';
import { Task } from '../../types/tasks.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  task = input.required<Task>(); // input is used to pass data from parent to child
  // selectedTask = signal<Task | null>(null);  // Track selected task

  isSelected = input<boolean>(false);
  taskSelected = output<Task>();
  taskDeleted = output<Task>();

  onTaskClick() {
    this.taskSelected.emit(this.task());
  }

  deleteTask(event: Event) {
    // event.stopPropagation(); // Prevents task selection when clicking delete
    this.taskDeleted.emit(this.task());
  }

  taskToggle = output<Task>(); // output to emit task item

  taskClicked() {
    this.taskToggle.emit(this.task());
  }

}
