import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/tasks.type';
import { StrikethroughCompletedTaskDirective } from '../../directives/strikethrough-completed-task.directive';
import { TaskItemComponent } from "../task-item/task-item.component";
import { NewTaskComponent } from "../new-task/new-task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskItemComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{

  taskService = inject(TasksService);
  taskItems = signal<Array<Task>>([]);

  async ngOnInit(): Promise<void> {
    await this.taskService.dbLoaded;
    console.log(this.taskService.taskItems); // log taskCollection from task service
    if (this.taskService.taskItems) {
      this.taskItems.set(this.taskService.taskItems);
    } else {
      this.taskItems.set([]);
    }
    console.log(this.taskService.taskCollection);
    // const taskCollection = this.taskService.getTaskCollection();
    // this.taskItems.set(taskCollection.find()); // Call find returns an array of documents
    // console.log(this.taskService.taskCollection);
  }

  updateTaskItems(task: Task) {
    this.taskItems.update((items) => {
      return items.map((item) => {
        if (item.$loki === task.$loki) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    });
  }

  addTaskItem(task: Task) {

  }
}

