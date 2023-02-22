import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpGenericService } from '../servics/FAST-TRACK-FRONTEND/http-generic.service';
import { chartsService } from '../servics/metricas.service';

@Component({
  selector: 'app-analiticas',
  templateUrl: './analiticas.page.html',
  styleUrls: ['./analiticas.page.scss'],
})
export class AnaliticasPage implements OnInit {
   type:string
   metricaNombre:string
   from:string
   to:string
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private graficaSvc: chartsService,
    private clientHttp: HttpGenericService<any>
  ) { }
  public formGrafica!: FormGroup;
  ngOnInit() {
this.crearGrafico()
  }

crearGrafico(){

}





}
