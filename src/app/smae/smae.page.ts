
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

  public wsname: string;
  public ws: XLSX.WorkSheet;
  public archivo: File;
  public file: File;
  listCategorias: any[] = [];
  constructor(
    private svcSmae: SmaeService
  ) {

  }

  ngOnInit() {
    this.svcSmae.getServicios().subscribe((resp: any) => {
      if (resp.length > 0) {
        this.listCategorias = resp;

      }
    })

    this.svcSmae.getReporte().subscribe(resp => {
      this.file = (new File([resp], "MAE2014.xlsx"))
      this.configExcel()
    })
  }


  Change(event: any) {
    /*if(event.id.value==2||event.id.value==3||event.id.value==4){
    
    
    }*/
    this.configExcel(event.detail.value)

  }

  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
   newKey:any[]=[]
  configExcel(id: number = 0) {
    let data, header;
    this.isExcelFile = !!this.file.name.match(/(.xls|.xlsx)/);
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        this.wsname = wb.SheetNames[(id-1)];
        this.ws = wb.Sheets[this.wsname];
        data = XLSX.utils.sheet_to_json(this.ws);

      };

      reader.readAsBinaryString(this.file);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;

        this.keys = Object.keys(data[0]);
        
       this.newKey=[]
     this.keys.forEach(key =>{

      if(!key.includes('_EMPTY')){
        this.newKey.push(key)

      }else{
        this.newKey.push('')
      }

     })
     
      

        this.dataSheet.next(data)
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }

  }




}
