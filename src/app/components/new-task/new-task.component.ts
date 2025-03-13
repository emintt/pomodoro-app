import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  // value user entered, which is accessed by ngModel
  enteredTask = '';
  // task event to emit entered task to task component through task event
  task = output<string>();

  onSubmit() {
    console.log('submit');
    this.task.emit(this.enteredTask);
  }
}
