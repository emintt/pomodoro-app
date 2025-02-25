import { Injectable } from '@angular/core';
import { Task } from '../types/tasks.type';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  taskItems: Array<Task> = [{
    id: 1,
    name: 'make db connection',
    startTime: 12345677,
    duration: 65363526,
    completed: false,
  },
  {
    id: 2,
    name: 'make ui',
    startTime: 364868,
    duration: 36546356,
    completed: true,
  }

];

  constructor() { }
}
