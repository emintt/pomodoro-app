import { SelectedTaskService } from './../../services/selected-task.service';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/tasks.type';
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
  selectedTaskService = inject(SelectedTaskService);



  async ngOnInit(): Promise<void> {
    await this.taskService.dbLoaded;
    const tasksFromDB = this.taskService.getAllTasks().filter((task) => !task.completed);
    this.taskItems.set(tasksFromDB); 
    // if (this.taskService.taskItems) {
    //   this.taskItems.set(this.taskService.taskItems.filter((task) => task.completed === false));
    // } else {
    //   this.taskItems.set([]);
    // }
    console.log(this.taskService.taskCollection);
  }

  // Select a task using SelectedTaskService
  selectTask(task: Task) {
    this.selectedTaskService.setSelectedTask(task);
  }

  // Get currently selected task
  get selectedTask(): Task | null {
    return this.selectedTaskService.getSelectedTask();
  }

  // Mark completed and remove task from ui
  deleteTask(task: Task) {
    this.taskService.markTaskAsCompleted(task); // Mark the task as completed in the database
    this.taskItems.update((items) => 
      items.filter((item) => item.completed === false)
    );
   
  }

  // // Update complete property
  // updateTaskItems(task: Task) {
  //   this.taskItems.update((items) => {
  //     return items.map((item) => {
  //       if (item.$loki === task.$loki) {
  //         return {
  //           ...item,
  //           completed: !item.completed,
  //         };
  //       }
  //       return item;
  //     });
  //   });
  // }

  addTaskItem(task: Task) {
    console.log(task);
    const newTask = this.taskService.addTask(task); // save task to db
    if (newTask) {
      this.taskItems.update((items) => [newTask, ...items]);  // update task items for ui
    }
  }
  

}

