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
        autoload: true, // load data from file on startup
        autosave: true,  // save data automatically
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
        autosaveInterval: 4000 
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

  addTask(task: Task): Task | null {
    if (this.taskCollection) {
      const newTask = this.taskCollection.insertOne(
        {
          name: task.name,
          startTime: task.startTime,
          totalTimeSpent: 0,
          pomodorosCompleted: 0,
          completed: false
        }
      );
      console.log('task added' + newTask);
      // this.taskCollection.flushChanges(); // save to db
      return newTask ? newTask : null;
    } else {
      console.log('cannot add task to db');
      return null;
    }
  }

  updateTaskTime(task: Task, timeSpent: number) {
    if (!this.taskCollection) {
      return;
    } ;

    // Find task in db
    const taskToUpdate = this.taskCollection.findOne({$loki: task.$loki});
    console.log('task to update time' + taskToUpdate);
    if (taskToUpdate && taskToUpdate.totalTimeSpent !== undefined) {
      taskToUpdate.totalTimeSpent += timeSpent;
      this.taskCollection.update(taskToUpdate);
      console.log(`Updated time for ${task.name}: ${taskToUpdate.totalTimeSpent} ms`);
    }
  }

  markTaskAsCompleted(task: Task) {
    if (!this.taskCollection) {
      return;
    }

    // Find task in db
    const taskToUpdate = this.taskCollection.findOne({ $loki: task.$loki });
    if (taskToUpdate) {
      taskToUpdate.completed = true;
      this.taskCollection.update(taskToUpdate);
      console.log(`Marked task as completed: ${task.name}`);
    }
  }

  getAllTasks(): Task[] {
    return this.taskCollection ? this.taskCollection.find().reverse() : [];  // Get fresh tasks from DB
  }


}
