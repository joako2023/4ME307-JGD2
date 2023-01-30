import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/dist/types/index';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  chartType: ChartType = 'line';

  data: ChartData<'line'> = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'data 1',
        data: [350, 450, 100]
      },
      {
        label: 'data 2',
        data: [100, 250, 50]
      }
    ]
  };

  options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
