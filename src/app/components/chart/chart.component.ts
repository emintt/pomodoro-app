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
  now = new Date();
  
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
  data:  { day: string; timeSpent: number }[] = [
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
    this.timeSpentTodayValue = this.calculateTimeSpentByDate(this.now);
    this.createChartData();
    console.log(this.dataOfDatasets);
    console.log(this.labels);
    this.dateArray();
  }

  calculateTimeSpentByDate(date: Date): number {
    const todayDateString = getDateStringFromDate(date);

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
    });
    return time;
  }


  generateTimeFormat(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) /1000);

    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  // Get the date range for current week
  // Week starts on Monday, ex. Mon = 1, Sat = 6, Sun = 0
  // Sun = 0 is the previous week
  // getWeekDay(date = new Date()) {
  //   let d = new Date(); 
  //   // if it is Sunday (0), set 
  //   d.getDate();
  // }

  // Create a mock date array for a week
  dateArray = () => {
    const todayMonday = new Date(); // bc today is monday :)
    const dateArr = [todayMonday, new Date(todayMonday.getDate() + 1), new Date(todayMonday.getDate() + 2),new Date(todayMonday.getDate() + 3), new Date(todayMonday.getDate() + 4), 
      new Date(todayMonday.getDate() + 5), new Date(todayMonday.getDate() + 6)];
    console.log(dateArr);
    return dateArr;
  }

  createChartData() {
    const now = new Date();
    const todayDateString = getDateStringFromDate(now);
    let dayToDisplay = 0;
    console.log(todayDateString);
    console.log(now.getDay() -1); // example mon -> 1

    const milliToHours = (milli: number): number => {
      return milli / (1000 * 60 * 60);
    }

    const milliToMinutes = (milli: number): number => {
      return milli / (1000 * 60 );
    }
    if (now.getDay() === 1) {
      console.log(this.now);
      this.data = [
        {day: 'Mon', timeSpent: this.timeSpentTodayValue },
        {day: 'Tue', timeSpent: 0 },
        {day: 'Wed', timeSpent: 0 },
        {day: 'Thu', timeSpent: 0 },
        {day: 'Fri', timeSpent: 0 },
        {day: 'Sat', timeSpent: 0 },
        {day: 'Sun', timeSpent: 0 }
      ];
    } else if (now.getDay() === 3) {
      // dayToDisplay = 2;
      // if (dayToDisplay >= 1) {
      //   for (let i = 1; i < dayToDisplay; i++) {
      //     console.log('hehe');
      //   } 
      // }
      this.data = [
        {day: 'Mon', timeSpent:  0},
        {day: 'Tue', timeSpent: 0 },
        {day: 'Wed', timeSpent: this.timeSpentTodayValue },
        {day: 'Thu', timeSpent: 0 },
        {day: 'Fri', timeSpent: 0 },
        {day: 'Sat', timeSpent: 0 },
        {day: 'Sun', timeSpent: 0 }
      ];
    }
  // update labels and dataset data
  this.labels = this.data.map((item) => item.day);
  this.dataOfDatasets = this.data.map((item) => item.timeSpent);

  // update the chart data dynamically
  this.barChartData = {
    labels: this.labels,
    datasets: [
      { data: this.dataOfDatasets, label: 'Time Spent (ms)' },
    ],
  };

  // refresh the chart
  if (this.chart) {
    this.chart.update();
  }
  }
}


