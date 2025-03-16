import { Component, inject, ViewChild, signal } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/tasks.type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  taskService = inject(TasksService);
  tasks = signal<Task[]>([]);
  timeSpentTodayValue: number = 0;
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Time Spent (minutes)' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  async ngOnInit() {
    await this.taskService.dbLoaded;
    console.log(this.taskService.taskItems); // log taskCollection from task service
    // if (this.taskService.taskItems) {
    //   this.tasks.set(this.taskService.taskItems);
    // } else {
    //   this.tasks.set([]);
    // }
    // console.log(this.taskService.taskCollection);
    this.tasks.set(this.taskService.getAllTasks());
    this.calculateTimeSpentToday(this.tasks());

  }

  calculateTimeSpentToday(tasks: Task[]) {
    const now = new Date();
    console.log(now.toISOString().split('T')[0]);
    console.log(tasks);
    let time = 0;
    this.tasks().forEach(task => {
      if (new Date(task.startTime).toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
        if (task.totalTimeSpent !== undefined) {
          time += task.totalTimeSpent;
        }
      }
    });
    this.timeSpentTodayValue = time; // seconds
  }

  generateTimeFormat(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) /1000);

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  }
}


