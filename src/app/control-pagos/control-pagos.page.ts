import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { PlanService } from '../servics/plan.service';
import { ServiciosService } from '../servics/servicios.service';

@Component({
  selector: 'app-control-pagos',
  templateUrl: './control-pagos.page.html',
  styleUrls: ['./control-pagos.page.scss'],
})
export class ControlPagosPage implements OnInit {
  listaServicios: any[] = [];
  serviciosSelected: any[] = [];
  formServicio: FormGroup;
  formPlan: FormGroup;

  constructor(
    private planes: PlanService,
    private servicios: ServiciosService,
    private fb: FormBuilder
  ) {this.formServicio = this.fb.group({
      id: [null],
      nombre: ['',[Validators.required]],
      descripcion: ['',[Validators.required]]
    });
    this.formPlan = this.fb.group({
      id:[null],
      nombre: ['',[Validators.required]],
      precioOld: ['',[Validators.required]],
      precio: [''],
      descripcion: ['',[Validators.required]],
     active:[false],
     duracion: ['1'],
     mesesSinPago:[null],
     
    });
  }

  addBeneficio(item: any, event: any) {
    const exist = this.serviciosSelected.find(i => i.id === item.id);
    if( exist === undefined && event.target.checked === true) {
        this.serviciosSelected.push(item);
    } else if(exist && event.target.checked === false) {
      this.serviciosSelected = this.serviciosSelected.filter(i => i.id !== item.id);
    }
  }

  async openGuardarServicio(modal: IonModal) {this.formServicio.reset({
      id: null,
      nombre: '',
      descripcion: ''
    });
    await modal.present();
  }

  guardarServicio(){
    const data=this.formServicio.value;
    if(data.id !== null) {
      this.servicios.upEditar({...data});
    } else {
      this.servicios.up({...data });
    }
  }

  ngOnInit() {
    this.servicios.listaServicios.subscribe(resp => {
     
      this.listaServicios = resp.data ;
      
    });
    
  }

  guardarPlan() {
    const data = { ...this.formPlan.value,  servicios: [ ...this.serviciosSelected.map(i => ({ id: i.id })) ] };
    if(data.id !== null) {
      this.planes.upEditar(data);
    } else {
      this.planes.up(data);
    }

  }

  getForm(campo: string) {
    return this.formPlan.controls[campo].value;
  }

  verifyCheck(id) {
    return this.serviciosSelected.find(i => i.id === id);
  }
}