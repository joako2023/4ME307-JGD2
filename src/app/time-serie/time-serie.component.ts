import { Component, OnInit } from '@angular/core';
import { Item, TimeService } from './time.service';
import { ChartData, ChartOptions, ChartType, ScatterDataPoint } from 'chart.js';

@Component({
  selector: 'app-time-serie',
  templateUrl: './time-serie.component.html',
  styleUrls: ['./time-serie.component.scss'],
})
export class TimeSerieComponent implements OnInit {
  chartType: ChartType = 'line';

  data: ChartData<'line', Item[]> = {
    labels: [],
    datasets: []
  };

  options: ChartOptions<'line'> = {
    aspectRatio: 3,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          major: {
            enabled: true,
          },
          autoSkip: true,
          autoSkipPadding: 75,
          maxRotation: 0,
        },
      },
      y: {
        type: 'linear',
        // stacked: true,
        min: 0,
        max: 0,
      }
    },

    plugins: {
      tooltip: {
        mode: 'x'
      }
    },

    interaction: {
      intersect: false,
      axis: 'x'
    },

    // skip parsing since we know our data is correct from the server
    parsing: false,

    // skip normalization, since we know our data is correct
    normalized: true,

    // skip animations
    animation: false
  };

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.timeService.fetch().then(data => {
      const labels = data.map(item => item.date);

      const maxUnits = data[data.length -1]?.units
      this.options.scales.y.max = maxUnits

      const datasets = [
        {
          label: 'Reserved',
          data,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'unitStatus.reserved'
          },
          backgroundColor: '#f7af6f',
          fill: 'start',
          stepped: true,
        },
        {
          label: 'Booked',
          data,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'unitStatus.booked'
          },
          backgroundColor: '#fd9174',
          fill: 'start',
          stepped: true,
        },
        {
          label: 'Sold',
          data,
          parsing: {
            xAxisKey: 'date',
            yAxisKey: 'unitStatus.sold'
          },
          backgroundColor: '#e0797d',
          fill: 'start',
          stepped: true,
        }
      ];

      this.data = {
        labels,
        datasets
      };
    });

    /*this.dataset
    {
      label: 'Net sales',
      data: data,
      parsing: {
          yAxisKey: 'net'
      }
    }

    this.data.datasets[0].data = data;*/
  }

}
