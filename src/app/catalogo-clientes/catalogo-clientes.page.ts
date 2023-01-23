import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  img: File;
  constructor(
    public ete: ExportExcelService,
    private nutriologoSvc: NutriologoService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  borrarReg() {
    this.registros = [];
    localStorage.removeItem('tempRegistro');
  }
  public formUploadNutriologo!: FormGroup;

  ngOnInit() {
  
    this.nutriologoSvc.getList().subscribe((resp: any) => {
      this.listaNutriologos=resp
    });


    this.formUploadNutriologo = this.fb.group({
      id: [''],
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
      terms: [false]
    });




  }

  public get form() {
    return this.formUploadNutriologo.controls;
  }

  loadData($event) {
    this.nutriologoSvc.get();
    $event.target.complete();
    this.page++;
  }

  


  verModal(modal: IonModal, nut: Nutriologos) {

    modal.present();

    this.formUploadNutriologo.patchValue(nut)

  }

  verModalRegistro(modal: IonModal) {
    this.formUploadNutriologo.reset();
    modal.present();
  }
  onFileChanged(event) {
    this.img = event.target.files[0];

  }
  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Borrar cliente',
      message: '¿Desea continuar con la operación?',
      buttons: [{ text: 'Aceptar', handler: () => { this.nutriologoSvc.delete(id) } }]
    });

    await alert.present();
  }
  editarNutriologo() {

    const body = this.formUploadNutriologo.value;
    if (body.id) {
      this.nutriologoSvc.put({ ...body });
    }
  }
  guardarNutriologo() {
    const formData = new FormData()
    formData.append('imageUpload', this.img, this.img.name)
    const body = this.formUploadNutriologo.value;
    for(const dataKey in body) {
      formData.append(dataKey, body[dataKey]);
    }
    this.nutriologoSvc.post(formData)
  }


  title = 'angular-export-to-excel';

  dataForExcel = [];





  exportToExcel() {
    let listaN = [...this.listaNutriologos]
    listaN.map(item => {
      const { identificacion, nombre, apellido, telefono, email, tipo_pago, acerca_de_mi, especialidad, enfermedades_tratadas, idEstablecimiento } = item;
      return { identificacion, nombre, apellido, telefono, email, tipo_pago, acerca_de_mi, especialidad, enfermedades_tratadas, idEstablecimiento }
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
