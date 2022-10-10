import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { LibreriaAlimentos } from '../interfaces/Libreria-alimentos.interface';
import { ExportExcelService } from '../servics/export-excel.service';
import {  LibreriaAlimentosService } from '../servics/libreria-alimentos.service';

@Component({
  selector: 'app-libreria-alimentos',
  templateUrl: './libreria-alimentos.page.html',
  styleUrls: ['./libreria-alimentos.page.scss'],
})
export class LibreriaAlimentosPage implements OnInit {


  listaAlimentos = [] as any;
  private page = 2;
  keyword = '';
  public registros: any[] = [];
  searched = new FormControl('');
  constructor(
    public ete: ExportExcelService,
    private alimentosSvc: LibreriaAlimentosService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  borrarReg() {
    this.registros = [];
    localStorage.removeItem('tempRegistro');
  }
  public formAlimentos!: FormGroup;
  ngOnInit() {
    this.activatedRoute.url.subscribe(() => {
      this.alimentosSvc.searchByKeyword(this.keyword)
      this.page=1;
    })
    this.alimentosSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.alimentosSvc.listaAlimentos.subscribe((resp: any) => {
      if (this.page === 2) {
        this.listaAlimentos = [...[], ...resp.data];
      } else {
        this.listaAlimentos = [...this.listaAlimentos, ...resp.data];
      }
    });


    this.formAlimentos = this.fb.group({
      id: [''],
    
      nombre: ['', [Validators.required]],
      terms: [false]
    });




  }

  public get form() {
    return this.formAlimentos.controls;
  }

  loadData($event) {
    this.alimentosSvc.getAllLibreriaAlimentos(this.page, this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.alimentosSvc.searchByKeyword(value);
  }


  verModal(modal: IonModal, ali: LibreriaAlimentos) {

    modal.present();

    this.formAlimentos.patchValue(ali)

  }

  verModalRegistro(modal: IonModal) {
    this.formAlimentos.reset();
    modal.present();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Borrar alimento',
      message: '¿Desea continuar con la operación?',
      buttons: [{ text: 'Aceptar', handler: () => { this.alimentosSvc.upEliminar(id) } }]
    });

    await alert.present();
  }
  editarAlimento() {

    const body = this.formAlimentos.value;
    if (body.id) {
      this.alimentosSvc.upEditar({ ...body });
    }
  }
  guardarAlimento() {

    const body = this.formAlimentos.value;
    this.alimentosSvc.up({ ...body })
  }


  title = 'angular-export-to-excel';

  dataForExcel = [];





  exportToExcel() {
    let listaAli = [...this.listaAlimentos]
    listaAli.map(item => {
      const {  nombre} = item;
      return {  nombre}
    }
    )

    listaAli.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Libreria alimentos',
      data: this.dataForExcel,
      headers: Object.keys(listaAli[0])
    }

    this.ete.exportExcel(reportData);
  }

}
