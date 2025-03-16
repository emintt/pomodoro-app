import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../types/tasks.type';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  // value user entered, which is accessed by ngModel
  enteredTaskName = '';
  // task event to emit entered task to task component through task event
  taskOutput = output<Task>();
  tasksService = inject(TasksService);

  submitted = false;

  onSubmit(newTaskForm: NgForm) {
    console.log('submit');
    const newTask = this.tasksService.addTask({
      name: this.enteredTaskName,
      startTime: Date.now(),
      completed: false
    } as Task);
    if (newTask) {
      this.taskOutput.emit(newTask);
    }
    this.submitted = true;
    newTaskForm.reset();
  }
}
