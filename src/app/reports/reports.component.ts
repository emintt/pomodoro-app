import { Component } from '@angular/core';
import { ChartComponent } from "../components/chart/chart.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
