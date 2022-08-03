import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ClikStrings {

    constructor(
        private alert: AlertController
    ) { }


    public elminarDesdeUltimoCaracter(string: string, to: number) {
        return string.slice(0, -(to))
    }

    /*
      Retorna un String aleatorio con Letras en mayúsculas, minúsculas y números.
      Ideal para generar contraseñas y códigos de verificación/validación
    */
    public stringAleatorio(length) {
        var result: string = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    /*
      Convierte la primera letra en mayúsucla y las demás en minúsculas del String dado
    */
    public primeraMayusculaRestoMinuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
}