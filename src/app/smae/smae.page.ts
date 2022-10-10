
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { SmaeService } from '../servics/smae.service';
//import { Subject } from 'rxjs/Subject';
//import readXlsxFile from 'read-excel-file';
/*declare var require:any;
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');*/
@Component({
  selector: 'app-smae',
  templateUrl: './smae.page.html',
  styleUrls: ['./smae.page.scss'],

})
export class SmaePage implements OnInit {
  //public pathRouteFile= path.join('/home','/sergio','/Descargas','/MAE2014.xlsx');
  public wsname: string;
  public ws: XLSX.WorkSheet;
  public archivo: File;
  listCategorias: any[] = [];
  constructor(
    private svcSmae: SmaeService
  ) { 

  }

  ngOnInit() {
    this.svcSmae.listCategorias.subscribe(resp => {
    if(resp.length>0){
      this.listCategorias = resp;
      console.log(this.listCategorias)
    }
      
    })
    this.svcSmae.getReporte().subscribe(resp => {
      this.configExcel(new File([resp], "MAE2014.xlsx"))
    })

  }
  
/*this.formTraslado.controls.servicio.valueChanges.subscribe(resp => {
      
      const servcs = this.listServicios.find(i => i.id == resp);
      
     this.precio=servcs.price;
     

    }) */

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  /*
    onChange(evt) {
      let data, header;
      const target: DataTransfer = <DataTransfer>(evt.target);
      this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
      if (target.files.length > 1) {
        this.inputFile.nativeElement.value = '';
      }
      if (this.isExcelFile) {
        this.spinnerEnabled = true;
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
  
          const bstr: string = e.target.result;
          console.log(bstr)
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
  
          const names = wb.SheetNames
  
          this.wsname = wb.SheetNames[5];
          this.ws = wb.Sheets[this.wsname];
  
  
  
          data = XLSX.utils.sheet_to_json(this.ws);
  
        };
  
        reader.readAsBinaryString(target.files[0]);
  
        reader.onloadend = (e) => {
          this.spinnerEnabled = false;
  
          this.keys = Object.keys(data[0]);
          this.dataSheet.next(data)
        }
      } else {
        this.inputFile.nativeElement.value = '';
      }
    }
  */

  configExcel(file: File) {

    console.log(file)
    let data, header;

    this.isExcelFile = !!file.name.match(/(.xls|.xlsx)/);


    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target)
        const bstr: string = e.target.result;
        console.log(bstr)
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });


        const names = wb.SheetNames
        console.log(names)
        this.wsname = wb.SheetNames[5];
        console.log(this.wsname)
        this.ws = wb.Sheets[this.wsname];



        data = XLSX.utils.sheet_to_json(this.ws);

      };

      reader.readAsBinaryString(file);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;

        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }

  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
  }


}
