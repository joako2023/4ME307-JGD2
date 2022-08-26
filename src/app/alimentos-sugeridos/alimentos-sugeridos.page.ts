import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { AlimentosSugeridos } from '../interfaces/alimentos-sugeridos.interface';
import { AlimentosSugeridosService } from '../servics/alimentos-sugeridos.service';
import { ExportExcelService } from '../servics/export-excel.service';

@Component({
  selector: 'app-alimentos-sugeridos',
  templateUrl: './alimentos-sugeridos.page.html',
  styleUrls: ['./alimentos-sugeridos.page.scss'],
})
export class AlimentosSugeridosPage implements OnInit {


  listaAlimentosSugeridos = [] as any;
  private page = 2;
  keyword = '';
  public registros: any[] = [];
  searched = new FormControl('');
  constructor(
    public ete: ExportExcelService,
    private alimentosSvc: AlimentosSugeridosService,
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
    this.alimentosSvc.listaAlimentosSugeridos.subscribe((resp: any) => {
      if (this.page === 2) {
        this.listaAlimentosSugeridos = [...[], ...resp.data];
      } else {
        this.listaAlimentosSugeridos = [...this.listaAlimentosSugeridos, ...resp.data];
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
    this.alimentosSvc.getAllAlimentos(this.page, this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.alimentosSvc.searchByKeyword(value);
  }


  verModal(modal: IonModal, ali: AlimentosSugeridos) {

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
    let listaAli = [...this.listaAlimentosSugeridos]
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
