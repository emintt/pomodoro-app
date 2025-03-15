import Loki from 'lokijs';
import { Injectable, signal } from '@angular/core';
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
          // // delete all docs from old collection
          // this.taskCollection.removeWhere(() => true);
          if (this.taskCollection.count() === 0) {
            this.insertInitialData();
          }
          this.taskItems = this.taskCollection.find().reverse();
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
         name: 'no task',
         startTime: 12345677,
         totalTimeSpent: 0,
         pomodorosCompleted: 0,
         completed: false
       }
     ]);
    }
  }

  addTask(task: Task) {
    if (this.taskCollection) {
      this.taskCollection.insert([
        {
          name: task.name,
          startTime: task.startTime,
          totalTimeSpent: 0,
          pomodorosCompleted: 0,
          completed: false
        }
      ]);
    } else {
      console.log('cannot add task to db');
    }
  }

  updateTaskTime(task: Task, timeSpent: number) {
    if (!this.taskCollection) {
      return;
    } ;

    // Find task in db
    const taskToUpdate = this.taskCollection.findOne({$loki: task.$loki});

    if (taskToUpdate && taskToUpdate.totalTimeSpent !== undefined) {
      taskToUpdate.totalTimeSpent += timeSpent;
      this.taskCollection.update(taskToUpdate);
      console.log(`Updated time for ${task.name}: ${taskToUpdate.totalTimeSpent} ms`);
    }
  }


}
