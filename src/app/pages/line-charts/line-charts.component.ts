import { Component, Input } from '@angular/core';
import { LineChart } from 'src/app/core/models/LineChart';

@Component({
  selector: 'app-line-charts',
  templateUrl: './line-charts.component.html',
  styleUrls: ['./line-charts.component.scss'],
})
export class LineChartsComponent {
  @Input() lineChartData!: LineChart[] | null;

  showLabels: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  view: any | undefined;

  constructor() {
    this.view = [innerWidth / 1.3, 400];
  }

  onResize(event: { target: any }) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
