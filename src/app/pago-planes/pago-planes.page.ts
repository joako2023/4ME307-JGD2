import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanesService } from '../servics/plan.service';
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
    private planes: PlanesService,
    private router: Router,
    private suscripciones: SuscripcionesService,
    
  ) { }

  ngOnInit() {
    this.planes.getList().subscribe(resp => {
      this.listPlanes = resp;

    });
    this.suscripciones.getList().subscribe(resp => {
      this.listSubs = resp;

    });
  }

  openEditar(item: any) {
    this.planes.select(item);
    this.router.navigateByUrl('/control-pagos');
  }

  openNuevoPlan() {
    const item = {
      id: null,
      nombre: '',
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
