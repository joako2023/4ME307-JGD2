import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/dist/types/index';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  chartType: ChartType = 'doughnut';

  data: ChartData<'doughnut'> = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'something',
        data: [350, 450, 100]
      }
    ]
  };

  options: ChartOptions<'doughnut'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
