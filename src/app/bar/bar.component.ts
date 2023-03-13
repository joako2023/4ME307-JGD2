import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { ChartData, ChartType } from 'chart.js/dist/types/index';
import { chartsService } from '../servics/charts.service';
import { DatePipe } from '@angular/common';
import { MetricasService } from '../servics/metricas.service';
import { chartValues } from '../interfaces/chartValues.interface';

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
  options: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

 //MesesArray:any=[[],[],[],[],[],[],[],[],[],[],[],[]]
 
consultarMes(){
  const MesesArray:any=[{label:'Enero',data:[0]},{label:'Febrero',data:[0]},{label:'Marzo',data:[0]},{label:'Abril',data:[0]},{label:'Mayo',data:[0]},{label:'Junio',data:[0]},{label:'Julio',data:[0]},{label:'Agosto',data:[0]},{label:'Septiembre',data:[0]},{label:'Octubre',data:[0]},{label:'Noviembre',data:[0]},{label:'Diciembre',data:[0]}]
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
