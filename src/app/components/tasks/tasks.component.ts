import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  keyUpHandler = (event: KeyboardEvent) => {
    console.log(`me typing ${event.key}`);
  }
}
