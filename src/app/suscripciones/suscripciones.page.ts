import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { PlanesService } from '../servics/plan.service';
import { SuscripcionesService } from '../servics/suscripciones.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.page.html',
  styleUrls: ['./suscripciones.page.scss'],
})
export class SuscripcionesPage implements OnInit {
  formPersonas: FormGroup;
  listPersonas = [] as any[];
  listPlanes = [] as any[];
  showsView = new FormControl(10, [Validators.required]);
  listVisible = 'persona';
  today = new Date();
  p = 1;
  asociar = 'empresa';
  editar = false;

  constructor(
    
    private suscripPersona: SuscripcionesService,
    private planes: PlanesService,
    private menuController: MenuController,
    private fb: FormBuilder
  ) {
    this.formPersonas = this.fb.group({
      
      
      id: [null],
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipo_pago: ['', [Validators.required]],
      acerca_de_mi: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      enfermedades_tratadas: ['', [Validators.required]],
      idEstablecimiento: [''],
      Imagen: [''],
      planes: this.fb.group({
        id: [null]
      }),
      subscripcion: this.fb.group({
        id:[null],
        fechaInicio: ['', [Validators.required]],
        fechaExpiracion: ['', [Validators.required]],
        duracion: ['', [Validators.required]],
        precioPlan: ['', [Validators.required]],
        pago: ['', [Validators.required]],
        mesesSinPago: ['', [Validators.required]],
        fechaExpiracionSinPago: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        plan: this.fb.group({
          id: [null]
        }),
        nutriologo: this.fb.group({
          id: [null]
        }),
        
      })
    });
    
  }
  
  validateFields(value: string, strings: string[]) {
    if(value === 'empresa') {
      let valid = true;
      for (const valueElement in strings) {
        if(valid !== this.formPersonas.get(strings[valueElement]).valid) {
          valid = false;
          break;
        }
      return valid;
    }
  }
  }
  
  ngOnInit() {
    this.planes.getList().subscribe(resp => {
      this.listPlanes = resp;
    });
    this.suscripPersona.getList().subscribe(resp => {
      this.listPersonas = resp;
      this.planes.get();
      this.formPersonas.enable();
      this.menuController.close('custom');
    });
}


openMenuEditor(value: string) {
  this.asociar = value;
  this.editar = false;
  this.formPersonas.reset();
  this.menuController.open('custom');
}

cambiarLista($event: any) {
  this.listVisible = $event.target.value;
}

editarSubscripcion(item: any) {
  if(this.listVisible === 'persona') {
    this.asociar = 'persona';
    this.editar = true;
    this.formPersonas.patchValue({...item, planes: { id: item.subscripcion.plan.id }});
    const formP = this.formPersonas.get('subscripcion').get('programas') as FormArray;
    formP.clear();
    for (const data of item.subscripcion.programas) {
      formP.push(this.fb.group({
        id: data.id
      }));
    }
    this.menuController.open('custom');
  }
  }

}