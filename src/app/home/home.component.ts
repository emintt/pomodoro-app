import { Component } from '@angular/core';
import { TimerComponent } from "../components/timer/timer.component";
import { TasksComponent } from "../components/tasks/tasks.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent, TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
