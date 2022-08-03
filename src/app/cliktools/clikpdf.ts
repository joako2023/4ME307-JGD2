import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClikFechas } from './clikfechas';

@Injectable({
    providedIn: 'root'
})

export class ClikPDF {

    constructor(
        private alert: AlertController,
        private clikFechas: ClikFechas
    ) { }


    public buildMainTableBody(
        columnas: string[],
        bodies: any[],
        columnWidths,
        columnFontSize,
        sumas: any[],
        posicionSumas: number,
        tieneSumas: boolean
    ): any {
        const mainBody = []

        const columnasPDF = []
        columnas.forEach(columna => {
            columnasPDF.push({
                text: columna,
                fontSize: columnFontSize
            })
        })

        mainBody.push(
            [
                {
                    table: {
                        headerRows: 1,
                        widths: columnWidths,
                        fontSize: columnFontSize,
                        body: [
                            columnasPDF
                        ]
                    },
                    layout: 'noBorders',
                },
            ]
        )

        mainBody.push(
            [
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
            ]
        )

        for (let i = 0; i < bodies.length; i++) {
            if (bodies[i].length > 0) {

                mainBody.push(
                    [
                        {
                            table: {
                                widths: columnWidths,
                                body: bodies[i],
                            },
                            layout: 'noBorders',
                        }
                    ]
                )

                mainBody.push(
                    [
                        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 580, y2: 0, lineWidth: 1 }] },
                    ]
                )

                if (tieneSumas) {
                    let rowSumas = []
                    for (let j = 0; j < columnas.length; j++) {
                        if (j == posicionSumas) {
                            rowSumas.push({
                                text: "$" + sumas[i].toFixed(2),
                                fontSize: columnFontSize,
                                margin: [0, 0, 0, 20]
                            })
                        } else {
                            rowSumas.push({
                                text: "",
                                fontSize: columnFontSize,
                                margin: [0, 0, 0, 20]
                            })
                        }
                    }

                    mainBody.push(
                        [
                            {
                                table: {
                                    headerRows: 1,
                                    widths: columnWidths,
                                    fontSize: 6,
                                    body: [
                                        rowSumas
                                    ]
                                },
                                layout: 'noBorders'
                            },
                        ]
                    )
                }
            }
        }
        return mainBody
    }

    /* -------------- TABLAS -------------- */
    public buildTableBody(data, columns) {
        const rowFontSize = 9

        var body = [];
        data.forEach(row => {
            var dataRow = [];
            columns.forEach(column => {
                if (column === "TOTAL") {
                    dataRow.push({ text: "$" + row[column].toString(), fontSize: rowFontSize })
                } else {
                    dataRow.push({ text: row[column].toString(), fontSize: rowFontSize })
                }
            })
            body.push(dataRow);
        });
        return body;
    }

    /*
        obtenemos la imágen codificada en base 64 para poder
        colocarla en PDFs de MakePDF
    */
    public getBase64ImageFromURL(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");

            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                resolve(dataURL);
            };

            img.onerror = error => {
                reject(error);
            };

            img.src = url;
        });
    }

    public fechaParaPDF(date: string) {
        const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DEC"]
        const dia = date.split('-')[2]
        const mes = meses[Number(date.split('-')[1]) - 1]
        const year = date.split('-')[0]
        return dia + " " + mes + " " + year
    }

    public definicionEstandarPDF(titulo, mainBody, startDate, endDate, pdfStyles) {
        let del
        let al

        if (startDate == "") {
            del = this.fechaParaPDF(this.clikFechas.hoy())
        } else {
            del = this.fechaParaPDF(startDate)
        }
        if (endDate == "") {
            al = this.fechaParaPDF(this.clikFechas.hoy())
        } else {
            al = this.fechaParaPDF(endDate)
        }
        const delAl = "Del: " + del + " Al: " + al


        return {
            pageOrientation: 'portrait',
            pageMargins: [10, 10, 10, 30],
            content: [
                {
                    text: titulo,
                    style: 'header'
                },
                {
                    text: delAl,
                    style: 'subheader'
                },
                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        fontSize: 4,
                        body: mainBody
                    },
                    layout: 'noBorders',
                }
            ],
            styles: pdfStyles,
            footer: function (currentPage, pageCount) {
                const date = new Date().toJSON().slice(0, 10);
                const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                const yyyy = date.split("-")[0]
                const mm = Number(date.split("-")[1]) - 1
                let dd = date.split("-")[2]

                if (Number(dd) < 10) {
                    dd = dd.substring(1)
                }

                const dateString = dd + " de " + meses[mm] + " del " + yyyy



                const today = new Date();
                let hours = today.getHours();
                let minutes: any = today.getMinutes();
                const ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                const timeString = hours + ':' + minutes + ' ' + ampm;

                return {
                    margin: 10,
                    columns: [
                        {
                            fontSize: 9,
                            text: [
                                {
                                    text: 'Fecha: ' + dateString + " " + timeString,
                                    fontSize: 8
                                }
                            ],
                            alignment: 'left'
                        },
                        {
                            fontSize: 9,
                            text: [
                                {
                                    text: 'Pagina ' + currentPage.toString(),
                                    fontSize: 8
                                }
                            ],
                            alignment: 'right'
                        }
                    ]
                };

            }
        };
    }
}