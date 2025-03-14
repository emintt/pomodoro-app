import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../types/tasks.type';


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

  submitted = false;

  onSubmit(newTaskForm: NgForm) {
    console.log('submit');
    this.taskOutput.emit({
      name: this.enteredTaskName,
      startTime: Date.now(),
      completed: false 
    });
    this.submitted = true;
    newTaskForm.reset();
  }
}
