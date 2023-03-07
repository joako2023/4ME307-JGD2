import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
import { chartsService } from '../servics/charts.service';
import { MetricasService } from '../servics/metricas.service';
import { LibreriaAlimentosService } from '../servics/libreria-alimentos.service';
import { AlimentosSugeridos } from '../interfaces/alimentos-sugeridos.interface';
import { AlimentosSugeridosService } from '../servics/alimentos-sugeridos.service';
import { NutriologoService } from '../servics/nutriologo.service';

@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})
export class AnaliticasPage implements OnInit {
  
   listRankNutriologos=[] as any
    myArray = [];
pago:any

   public error:boolean
  constructor(
    private metricasSvc:MetricasService,
    private fb:FormBuilder
  ) {
    this.formularioFecha = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
   }
  public formularioFecha!: FormGroup;
  
  ngOnInit() {
    this.metricasSvc.getList().subscribe((resp: any) => {
      
      if (resp) {
        for (let key in resp) {
          this.myArray.push(resp[key]);
        }
        if (this.myArray[9]) {
          this.pago=this.myArray[9]
          
         }else{
          this.pago=0
         }
         console.log(this.myArray[9])
        this.listRankNutriologos=this.myArray[10]
        this.error=true
      }else{
        this.error=false
      }
     });
     
   
    
  }
graficarRankNutriologo(){
   const form = this.formularioFecha.value
    
    if (form.from <= form.to) {
      this.metricasSvc.getFechasNuevas( form.from, form.to).subscribe((resp: any) => {
        if (resp && resp.length>0) {
          for (let key in resp) {
            this.myArray.push(resp[key]);
          }
          if (this.myArray[10]) {
            this.listRankNutriologos=this.myArray[10]
           }else{
            this.listRankNutriologos=[]
           }
          console.log(this.myArray[10])
          this.error=true
        }else{
          this.listRankNutriologos=[]
        }
      });
    }

}



  graficar() {
    const form = this.formularioFecha.value
    
    if (form.from <= form.to) {
      this.metricasSvc.getFechasNuevas( form.from, form.to).subscribe((resp: any) => {
        if (resp && resp.length>0) {
          for (let key in resp) {
            this.myArray.push(resp[key]);
          }
          if (this.myArray[9]) {
            this.pago=this.myArray[9]
           }else{
            this.pago=0
           }
          console.log(this.myArray[9])
          this.error=true
        }else{
          this.pago=0
        }
      });
    }



  }


}
