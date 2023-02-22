import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/dist/types/index';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
import { chartsService } from '../servics/metricas.service';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
  from = new Date()
  to = new Date()
  datePipe = new DatePipe('en-US');
  formattedDateFrom = this.datePipe.transform(this.from, 'yyyy-MM-dd');
  formattedDateTo: string

  @Input() type: ChartType = 'line'
  @Input() metricaNombre: string = 'totalPacientes'
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
      console.log(this.data = resp)
      this.data = { ...resp.data }
    });

  }
  graficar() {
    const form = this.formularioFecha.value
    console.log(form)
    if (form.from <= form.to) {
      this.graficoSvc.llamarGrafico(this.type, this.metricaNombre, form.from, form.to).subscribe((resp: any) => {
        console.log(this.data = resp)
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






