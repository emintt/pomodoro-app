import { Component, inject, ViewChild, signal } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/tasks.type';
import { CommonModule } from '@angular/common';
import { getDateStringFromDate } from '../../utils/date.utils';



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

  // create mock bar chart data map
  data = [
    {day: 'Mon', timeSpent: 12 },
    {day: 'Tues', timeSpent: 13 },
    {day: 'Wed', timeSpent: 15 },
    {day: 'Thu', timeSpent: 1 },
    {day: 'Fri', timeSpent: 12 },
    {day: 'Sat', timeSpent: 0 },
    {day: 'Sun', timeSpent: 10 }
  ];

  labels = this.data.map((item) => item.day);
  dataOfDatasets = this.data.map((item) => item.timeSpent);
  

  public barChartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [
      { data: this.dataOfDatasets, label: 'Time Spent (minutes)' },
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

    this.tasks.set(this.taskService.getAllTasks());
    this.calculateTimeSpentToday(this.tasks());
    console.log(this.dataOfDatasets);
    console.log(this.labels);
  }

  // total time spent on all tasks today
  calculateTimeSpentToday(tasks: Task[]) {
    const now = new Date();
    const todayDateString = getDateStringFromDate(now);

    let time = 0;
    this.tasks().forEach(task => {
      if (task.workSessions) {
        // find the session today
        const todaySession = task.workSessions.find((session) => {
          const sessionDatetring = getDateStringFromDate(new Date(session.date));
          return sessionDatetring === todayDateString;
        });

        if (todaySession) {
          time += todaySession.duration;
        }
      }
      // const startTimeString = getDateStringFromDate(new Date(task.startTime));
      // if (startTimeString === todayDateString) {
      //   if (task.totalTimeSpent !== undefined) {
      //     time += task.totalTimeSpent;
      //   }
      // }
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


