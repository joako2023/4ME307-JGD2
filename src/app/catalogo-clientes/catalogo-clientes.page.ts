import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonItem, IonModal } from '@ionic/angular';
import { Nutriologos } from '../interfaces/nutriolg.interface';
import { ExportExcelService } from '../servics/export-excel.service';
import { NutriologoService } from '../servics/nutriologo.service';

@Component({
  selector: 'app-catalogo-clientes',
  templateUrl: './catalogo-clientes.page.html',
  styleUrls: ['./catalogo-clientes.page.scss'],
})
export class CatalogoClientesPage implements OnInit {




  listaNutriologos = [] as any;
  private page = 2;
  keyword = '';
  public registros: any[] = [];
  searched = new FormControl('');
  constructor(
    public ete: ExportExcelService,
    private nutriologoSvc: NutriologoService,
    private alertController: AlertController,
    private fb: FormBuilder
  ) { }

  borrarReg() {
    this.registros = [];
    localStorage.removeItem('tempRegistro');
  }
  public formUploadNutriologo!: FormGroup;
  ngOnInit() {
    this.nutriologoSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.nutriologoSvc.listaNutriologos.subscribe((resp: any) => {
      if (this.page === 2) {
        this.listaNutriologos = [...[], ...resp.data];
      } else {
        this.listaNutriologos = [...this.listaNutriologos, ...resp.data];
      }
    });


    this.formUploadNutriologo = this.fb.group({
      id: [''],
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipoPago: ['', [Validators.required]],
      acercaDeMi: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      enfermedadesTratadas: ['', [Validators.required]],
      idEstablecimiento: ['', [Validators.required]],
      Imagen: ['', [Validators.required]],
      terms: [false]
    });




  }

  public get form() {
    return this.formUploadNutriologo.controls;
  }

  loadData($event) {
    this.nutriologoSvc.getAllNutriologos(this.page, this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.nutriologoSvc.searchByKeyword(value);
  }


  verModal(modal: IonModal, nut: Nutriologos) {

    modal.present();

    this.formUploadNutriologo.patchValue(nut)

  }

  verModalRegistro(modal: IonModal) {
    this.formUploadNutriologo.reset();
    modal.present();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Borrar cliente',
      message: '¿Desea continuar con la operación?',
      buttons: [{ text: 'Aceptar', handler: () => { this.nutriologoSvc.upEliminar(id) } }]
    });

    await alert.present();
  }
  editarNutriologo() {

    const body = this.formUploadNutriologo.value;
    if (body.id) {
      this.nutriologoSvc.upEditar({ ...body });
    }
  }
  guardarNutriologo() {

    const body = this.formUploadNutriologo.value;
    this.nutriologoSvc.up({ ...body })
  }


  title = 'angular-export-to-excel';

  dataForExcel = [];





  exportToExcel() {
    let listaN = [...this.listaNutriologos]
    listaN.map(item => {
      const { identificacion, nombre, apellido, telefono, email, tipoPago, acercaDeMi, experiencia, especialidad, enfermedadesTratadas, idEstablecimiento } = item;
      return { identificacion, nombre, apellido, telefono, email, tipoPago, acercaDeMi, experiencia, especialidad, enfermedadesTratadas, idEstablecimiento }
    }
    )

    listaN.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Lista nutriologos',
      data: this.dataForExcel,
      headers: Object.keys(listaN[0])
    }

    this.ete.exportExcel(reportData);
  }


}
