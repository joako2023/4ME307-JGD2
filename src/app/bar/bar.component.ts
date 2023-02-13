import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartData, ChartType } from 'chart.js/dist/types/index';
import { chartsService } from '../servics/metricas.service';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {

  constructor(
    private metricaSvc:chartsService
  ) { }

  ngOnInit() {
  
  }

  chartType: ChartType = 'bar';

  data: ChartData<'bar'> = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'data 1',
        data: [350, 450, 100]
      },
      {
        label: 'data 2',
        data: [350, 450, 100]
      }
    ]
  };

  options: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }


}
