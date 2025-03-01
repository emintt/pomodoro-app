import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/tasks.type';
import { StrikethroughCompletedTaskDirective } from '../../directives/strikethrough-completed-task.directive';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  keyUpHandler = (event: KeyboardEvent) => {
    console.log(`me typing ${event.key}`);
  }

  taskService = inject(TasksService);
  taskItem = signal<Array<Task>>([]);

  ngOnInit(): void {
    console.log(this.taskService.taskItems);
    this.taskItem.set(this.taskService.taskItems);
  }


}
