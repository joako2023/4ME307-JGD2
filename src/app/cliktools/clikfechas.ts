import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ClikFechas {

    constructor(
        private alert: AlertController
    ) { }

    public hoy() {
        return new Date().toJSON().slice(0, 10);
    }

    /*
        Convierte un objeto de tipo Date en formato YYYY-MM-DD que es el que estamos
        acostumbrados a trabajar
    */
    public convertirDate(date: Date) {
        return date.toISOString().split('T')[0]
    }

    /*
        Convierte un string en formato YYYY-MM-DD en una oración legible.
        Ejemplo: dado '2021-08-25' nos regresa '25 de Agosto del 2021'
     */
    public fixYYYY_MM_DD(date: string) {
        /*
            Arreglo de meses en español o en inglés. Usa la versión que necesites.
        */
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const yyyy = date.split("-")[0]
        const mm = Number(date.split("-")[1]) - 1
        let dd = date.split("-")[2]

        if (Number(dd) < 10) {
            dd = dd.substring(1)
        }

        return dd + " de " + meses[mm] + " del " + yyyy
        /*
            Si lo qusiéramos en inglés
            return months[mm] + " " + dd + "th " + yyyy 
        */
    }
}