import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  IonModal } from '@ionic/angular';
import { ClikTools } from '../cliktools/cliktools';
import { PlanesService } from '../servics/plan.service';
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
    private planes: PlanesService,
    private servicios: ServiciosService,
    private fb: FormBuilder,
    private clicktools: ClikTools
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
     duracion: [1],
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
      this.servicios.put({...data});
       } else {
      this.servicios.post({...data });
      }
  }

  ngOnInit() {
    this.servicios.getList().subscribe(resp => {
    
      this.listaServicios = resp ;
      
    });
    this.planes.getSelected().subscribe(resp => {
      this.formPlan.patchValue(resp);
      this.serviciosSelected = resp.servicios;
    });
    
  }

  guardarPlan() {
    const data = { ...this.formPlan.value,  servicios: [ ...this.serviciosSelected.map(i => ({ id: i.id })) ] };
    if(data.id !== null) {
      this.planes.put(data);
       } else {
      this.planes.post(data);
      }

  }

  getForm(campo: string) {
    return this.formPlan.controls[campo].value;
  }

  verifyCheck(id) {
    return this.serviciosSelected.find(i => i.id === id);
  }
}