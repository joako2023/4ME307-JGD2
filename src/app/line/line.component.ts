import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/dist/types/index';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
import { chartsService } from '../servics/charts.service';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetricasService } from '../servics/metricas.service';
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
    private metriSvc: MetricasService
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


  consultarMes(){
    const MesesArray:any=[{label:'enero',data:[0]},{label:'febrero',data:[0]},{label:'marzo',data:[0]},{label:'abril',data:[0]},{label:'mayo',data:[0]},{label:'junio',data:[0]},{label:'julio',data:[0]},{label:'agosto',data:[0]},{label:'septiembre',data:[0]},{label:'octubre',data:[0]},{label:'noviembre',data:[0]},{label:'diciembre',data:[0]}]
    const MesesLabel:any=[]
    const newArray:any=[]
    const year= new Date().getFullYear()
   let yearFecha:any;
   this.metriSvc.getByYear(year).subscribe((resp: any) =>{
  yearFecha=resp
  for (let index = 0; index < resp.length; index++) {
    
    const mes=Number(resp[index].created_at.split('-')[1])
    const valores:number=Number(resp[index][this.metricaNombre])
   MesesArray[mes-1].data[0] =Number(MesesArray[mes-1].data[0])+Number(valores)
    
   }
   MesesArray.forEach(element => {
    if (element.data[0]>0) {
      newArray.push(element)
      MesesLabel.push(element.label)
    }
   });
  
   const data= {
    labels:MesesLabel,
    datasets:newArray
    
  }
  
  this.data = { ...data }
   })
  
  }




}






