import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../servics/plan.service';
import { SuscripcionesService } from '../servics/suscripciones.service';

@Component({
  selector: 'app-pago-planes',
  templateUrl: './pago-planes.page.html',
  styleUrls: ['./pago-planes.page.scss'],
})
export class PagoPlanesPage implements OnInit {
  listPlanes: any[] = [];
  listSubs: any[] = [];
  p = 1;

  constructor(
    private planes: PlanService,
    private router: Router,
    private suscripciones: SuscripcionesService,
    
  ) { }

  ngOnInit() {
    this.planes.listaPlanes.subscribe(resp => {
      this.listPlanes = resp.data;

    });
    this.suscripciones.listaSuscripcion.subscribe(resp => {
      this.listSubs = resp.data;

    });
  }

  openEditar(item: any) {
   // this.planSvcObj.sendObjectSource(item);
    this.planes.select(item);
    this.router.navigateByUrl('/control-pagos');
  }

  openNuevoPlan() {
    const item = {
      id: null,
      titulo: '',
      descripcion: '',
      precioOld: '',
      duracion: 1,
      active: false,
      precio: '',
      mesesSinPago: null,
      servicios: []
    };
    this.planes.select(item);
    this.router.navigateByUrl('/control-pagos');
  }

}
