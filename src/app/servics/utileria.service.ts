import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtileriasService {

  constructor(
    private alert: AlertController
  ) { }

  removeLastCharacter(string: string){
    return string.slice(0, -2)
  }

  /*
    Retorna un String aleatorio con Letras en mayúsculas, minúsculas y números.
    Ideal para generar contraseñas y códigos de verificación
  */
  generateRandomString(length) {
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
    Muestra un simple AlertController con su Header y Message
    Ideal para mostrar avisos simples en el sistema
  */
  async showAcceptMessage(header, message) {
    const alertador = await this.alert.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Aceptar"
        }
      ]
    });
    alertador.present();
  }

  async showIncorrectFormMessage(){
    const alertador = await this.alert.create({
      header: "Formulario incorrecto",
      message: "Revisa que hallas llenado correctamente los campos obligatorios y los no obligatorios",
      buttons: [
        {
          text: "Aceptar"
        }
      ]
    })
    alertador.present()
  }

  /*
    Convierte la primera letra en mayúsucla y las demás en minúsculas del String dado
  */
  primeraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}