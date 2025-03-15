import { Injectable, signal, WritableSignal } from '@angular/core';
import { Task } from '../types/tasks.type';

@Injectable({
  providedIn: 'root'
})
export class SelectedTaskService {

  constructor() { }
  selectedTask: WritableSignal<Task | null> = signal<Task | null>(null);


  getSelectedTask(): Task | null {
    return this.selectedTask();
  }


  // Set a task as selected
  setSelectedTask(task: Task) {
    this.selectedTask.set(task);
  }

  // Clear the selected task 
  clearSelectedTask() {
    this.selectedTask.set(null);
  }
}
