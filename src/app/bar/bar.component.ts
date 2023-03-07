import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { ChartData, ChartType } from 'chart.js/dist/types/index';
import { chartsService } from '../servics/charts.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {

  from = new Date()
  to = new Date()
  datePipe = new DatePipe('en-US');
  formattedDateFrom = this.datePipe.transform(this.from, 'yyyy-MM-dd');
  formattedDateTo: string

  @Input() type: ChartType = 'bar'
  @Input() metricaNombre: string = 'totalNutriologo'
  data: ChartData;
  constructor(
    private graficoSvc: chartsService,
    private fb: FormBuilder,
  ) {
    this.to.setDate(this.to.getDate() - 30)
    this.formattedDateTo = this.datePipe.transform(this.to, 'yyyy-MM-dd');
    this.formularioFecha = this.fb.group({
      from: [this.formattedDateFrom, [Validators.required]],
      to: [this.formattedDateTo, [Validators.required]]
    });
  }
  public formularioFecha!: FormGroup;
  ngOnInit() {
    this.graficoSvc.llamarGrafico(this.type, this.metricaNombre, this.formattedDateTo, this.formattedDateFrom).subscribe((resp: any) => {
      
      this.data = { ...resp.data }
    });

  }
  graficar() {
    const form = this.formularioFecha.value
    
    if (form.from <= form.to) {
      this.graficoSvc.llamarGrafico(this.type, this.metricaNombre, form.from, form.to).subscribe((resp: any) => {
        
        this.data = { ...resp.data }
      });
    }



  }
  options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };


}
