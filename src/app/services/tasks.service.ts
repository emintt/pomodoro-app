import Loki from 'lokijs';
import { Injectable } from '@angular/core';
import { Task } from '../types/tasks.type';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  db!: Loki;
  dbLoaded: Promise<void>;

  taskCollection: Collection<Task> | null = null;
  taskItems: Task[] = [];
  
  constructor() { 
    this.dbLoaded = new Promise((resolve, reject) => {
      this.db = new Loki('pomodoro-app.db', {
        autoload: true,
        autosave: true,
        autoloadCallback: () => {
          this.taskCollection = this.db.getCollection<Task>('taskItems') 
            || this.db.addCollection<Task>('taskItems');
          if (this.taskCollection.count() === 0) {
            this.insertInitialData();
          }
          this.taskItems = this.taskCollection.find();
          console.log(this.taskItems);
          resolve();
        },
        // autosaveInterval: 4000 
      });
    })
  }


  insertInitialData() {
    console.log(this.taskCollection);
    if (this.taskCollection) {
      // insert array of documents
      this.taskCollection.insert([
       {
         name: 'make db connection',
         startTime: 12345677,
         duration: 65363526,
         completed: false
       },
       {
         name: 'make ui',
         startTime: 364868,
         duration: 36546356,
         completed: true,
       }
     ]);
    }
  }
}
