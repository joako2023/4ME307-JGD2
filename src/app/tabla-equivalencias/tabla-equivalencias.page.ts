import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Equivalencias } from '../interfaces/equivalencias.interface';
import { ExportExcelService } from '../servics/export-excel.service';
import { EquivalenciasService } from '../servics/tabla-equivalencias.service';

@Component({
  selector: 'app-tabla-equivalencias',
  templateUrl: './tabla-equivalencias.page.html',
  styleUrls: ['./tabla-equivalencias.page.scss'],
})
export class TablaEquivalenciasPage implements OnInit {


  listaEquivalencias = [] as any;
  private page = 2;
  keyword = '';
  public registros: any[] = [];
  searched = new FormControl('');
  constructor(
    public ete: ExportExcelService,
    private equivalenciasSvc: EquivalenciasService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  borrarReg() {
    this.registros = [];
    localStorage.removeItem('tempRegistro');
  }
  public formEquivalencias!: FormGroup;
  ngOnInit() {
 
    this.equivalenciasSvc.getList().subscribe((resp: any) => {
      if (this.page === 2) {
        this.listaEquivalencias = [...[], ...resp.data];
      } else {
        this.listaEquivalencias = [...this.listaEquivalencias, ...resp.data];
      }
    });


    this.formEquivalencias = this.fb.group({
      id: [''],
    
      nombre: ['', [Validators.required]],
      terms: [false]
    });




  }

  public get form() {
    return this.formEquivalencias.controls;
  }

  loadData($event) {
    this.equivalenciasSvc.get();
    $event.target.complete();
    this.page++;
  }



  verModal(modal: IonModal, ali: Equivalencias) {

    modal.present();

    this.formEquivalencias.patchValue(ali)

  }

  verModalRegistro(modal: IonModal) {
    this.formEquivalencias.reset();
    modal.present();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Borrar equivalencia',
      message: '¿Desea continuar con la operación?',
      buttons: [{ text: 'Aceptar', handler: () => { this.equivalenciasSvc.delete(id) } }]
    });

    await alert.present();
  }
  editarEquivalencia() {

    const body = this.formEquivalencias.value;
    if (body.id) {
      this.equivalenciasSvc.put({ ...body });
    }
  }
  guardarEquivalencia() {

    const body = this.formEquivalencias.value;
    this.equivalenciasSvc.post({ ...body })
  }


  title = 'angular-export-to-excel';

  dataForExcel = [];





  exportToExcel() {
    let listaEqui = [...this.listaEquivalencias]
    listaEqui.map(item => {
      const {  nombre} = item;
      return {  nombre}
    }
    )

    listaEqui.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Equivalencias',
      data: this.dataForExcel,
      headers: Object.keys(listaEqui[0])
    }

    this.ete.exportExcel(reportData);
  }


}
