import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClikCSV {

    constructor(
    ) { }

    ConvertToCSVBonito(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No,';

        for (let index in headerList) {
            row += headerList[index] + ',';
        }

        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = (i + 1) + '';
            for (let index in headerList) {
                let head = headerList[index];
                line += ',' + array[i][head];
            }
            str += line + '\r\n';
        }
        return str;
    }

    downloadFileBonito(data, filename = 'data', titulos) {
        let csvData = this.ConvertToCSVBonito(data, titulos);
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }


    ConvertToCSVCrudo(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';

        for (let index in headerList) {
            row += headerList[index] + ',';
        }

        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in headerList) {
                let head = headerList[index];
                line += array[i][head] + ","
            }
            line = line.substring(0, line.length - 1);
            str += line + '\r\n';
        }
        return str
    }


    //check etension
    isValidCSVFile(file: any) {
        return file.name.endsWith('.csv');
    }

    downloadFileCrudo(data, filename = 'data', titulos) {
        let csvData = this.ConvertToCSVCrudo(data, titulos);
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any, columnas) {
        let csvArr = [];
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let curruntRecord = (<string>csvRecordsArray[i]).split(',');
            if (curruntRecord.length == headerLength) {
                let csvRecord = {}
                for (let j = 0; j < columnas.length; j++) {
                    csvRecord[columnas[j]] = curruntRecord[j].trim()
                }
                csvArr.push(csvRecord);
            }
        }
        return csvArr;
    }


    /*

    Este método se copia en la pantalla donde se quieran exportar los datos
    Títulos es una lista de columnas de ejemplo

    uploadListener($event: any): void {
        let files = $event.srcElement.files;
    
        if (this.isValidCSVFile(files[0])) {
          
          
          let input = $event.target;
          let reader = new FileReader();
          reader.readAsText(input.files[0]);
    
          reader.onload = () => {
            let csvData = reader.result;
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    
            let headersRow = this.getHeaderArray(csvRecordsArray);
            const titulos = ["nombre", "codigo", "descripcion", "familia", "unidad_medida", "precio_vmost", "precio_vesp", "precio_sucursal", "precio_franquicia", "tiene_iva", "moneda", "estatus", "caracteristicas", "iva", "costo", "peso_individual", "sucursal"]
    
            this.records = this.getDataRecordsArrayFromCSVFile(
              csvRecordsArray,
              headersRow.length,
              titulos
            );
    
    
          };
    
          reader.onerror = function () {
          };
        } else {
          alert('Please import valid .csv file.');
          this.fileReset();
        }
      }*/




}