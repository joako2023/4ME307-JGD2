import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItem, IonModal } from '@ionic/angular';
import { Nutriologos } from '../interfaces/nutriolg.interface';


import * as Dropzone from 'dropzone';
import { ImageQueryPipe } from 'src/pipes/image-query.pipe';


import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { environment } from 'src/environments/environment';
import { ExportExcelService } from '../servics/export-excel.service';
import { NutriologoService } from '../servics/nutriologo.service';
import { UtilsService } from '../servics/FAST-TRACK-FRONTEND/utils.service';
import { SessionService } from '../servics/FAST-TRACK-FRONTEND/session.service';

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
  img: any;
  imgn: Blob = undefined;
  formData: FormData | undefined;
  constructor(
    public ete: ExportExcelService,
    private nutriologoSvc: NutriologoService,
    private alertController: AlertController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private imageQueryPipe: ImageQueryPipe,
    private utils:UtilsService,
    private sessionSvc: SessionService,
  ) { }
  files: File[] = [];
  fileImage= [] as File[];

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
      nombre_completo:['',[Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipo_pago: ['', [Validators.required]],
      acerca_de_mi: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      enfermedades_tratadas: ['', [Validators.required]],
      imagen: [''],
      score:[''],
      //terms: [false]
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
  search(value: string) {
    if (value) {
      this.nutriologoSvc.getHttp().get('/nutriologo/filtrar/'+value).subscribe((resp:any)=>{

        this.listaNutriologos=resp;

      })
    }else{
      this.nutriologoSvc.getList().subscribe((resp: any) => {
        this.listaNutriologos=resp
      });
    }

  }
  // async image(){
  //   this.imgn = await this.ngxImage.returnImageCompress()

  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.img);
  //     reader.onload = _event => {
  //    const url = reader.result;
  //    this.fileURL = url;
  //   };
  // }


  async verModal(modal: IonModal, nut: Nutriologos) {

    modal.present();

    this.formUploadNutriologo.patchValue(nut)
    const file =await this.utils.convertUrlToBinary(this.imageQueryPipe.transform(nut.imagen), nut.imagen);
      this.fileImage=[file]



  }

  verModalRegistro(modal: IonModal) {
    this.formUploadNutriologo.reset();
    modal.present();
  }
  guardarNutriologo() {
    this.formData = new FormData();
    const { nombre, apellido } = this.formUploadNutriologo.value;
    this.formUploadNutriologo.controls['nombre_completo'].patchValue(`${nombre} ${apellido}`);
    this.formUploadNutriologo.controls['imagen'].patchValue('');

    const data = this.formUploadNutriologo.value;
    for (const dataKey in data) {
      this.formData.append(dataKey, JSON.stringify(data[dataKey]));
    }
    for(const datum of this.fileImage) {

      this.formData.append('photo',datum, datum.name);

    }
    if(data.id !== null) {
      this.nutriologoSvc.post(this.formData)
    }
  }
  onFileChanged(event) {
    this.img = event.target.files[0];

  }
  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'warning',
      subHeader: 'delete user',
      message: 'do you want to continue?',
      buttons: [{ text: 'Aceptar', handler: () => { this.nutriologoSvc.delete(id) } }]
    });

    await alert.present();
  }
  save() {
    this.formData = new FormData();
    const { nombre, apellido } = this.formUploadNutriologo.value;
    this.formUploadNutriologo.controls['nombre_completo'].patchValue(`${nombre} ${apellido}`);
    this.formUploadNutriologo.controls['imagen'].patchValue('');

    const data = this.formUploadNutriologo.value;
    for (const dataKey in data) {
      this.formData.append(dataKey, JSON.stringify(data[dataKey]));
    }
    for(const datum of this.fileImage) {

      this.formData.append('photo',datum, datum.name);

    }
    if(data.id !== null) {
      this.nutriologoSvc.put(this.formData)
    } else {
      this.nutriologoSvc.post(this.formData)
    }
  }




  onSelectImagen($event: NgxDropzoneChangeEvent) {
    this.fileImage = [...$event.addedFiles];
  }

  // onSelect(arr: File[], $event: NgxDropzoneChangeEvent) {
  //   arr.push(...$event.addedFiles);
  // }

  onRemove(arr: File[], f: File) {
    arr.splice(arr.indexOf(f), 1);
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
