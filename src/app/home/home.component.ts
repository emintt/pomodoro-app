import { Component } from '@angular/core';
import { TimerComponent } from "../components/timer/timer.component";
import { TasksComponent } from "../components/tasks/tasks.component";
import { ReportsComponent } from "../reports/reports.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimerComponent, TasksComponent, ReportsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
