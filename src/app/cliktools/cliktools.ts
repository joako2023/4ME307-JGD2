import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ClikTools  {

    constructor(
        private alert: AlertController,
        private toastController: ToastController,
        private router: Router
    ) { }

    /*  
      Muestra un simple AlertController con su Header y Message
      Ideal para mostrar avisos simples en el sistema
    */
    public async acceptMessage(header, message) {
        const messageAlert = await this.alert.create({
            header: header,
            message: message,
            buttons: [
                {
                    text: "Aceptar"
                }
            ]
        });
        messageAlert.present()
    }

    public async warningToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: "danger"
        });
        toast.present();
    }

    public async customToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: color
        });
        toast.present();
    }

    /*  
        Valida una imagen por su tamaño en mb, ancho y alto
    */
    public imagenValida(file: File, sizeMb: number, width: number, height: number): boolean {
        //Verificamos que el formato sea en jpeg
        if (file.type !== 'image/jpeg') {
            this.acceptMessage("Archivo no valido", "Debes introducir un archivo en formato jpg o jpeg")
            return false;
        } else {
            const imagenSizeMb = file.size / 1024 / 1024
            // Verificamos que pese menos de 2mb
            if (imagenSizeMb <= sizeMb) {
                var url = URL.createObjectURL(file);
                var img = new Image;
                img.src = url;
                img.onload = async () => {
                    if (img.width !== width || img.height !== height) {
                        let alert: AlertController = new AlertController()
                        const message = await alert.create({
                            header: "Tamaño de la imágen incorrecto",
                            message: "El tamaño de la imágen debe ser exactamente de " + width + " x " + height + ". Redimensiona su tamaño o elige otra foto",
                            buttons: [
                                {
                                    text: "Aceptar",
                                },
                                {
                                    text: "Redimensionar",
                                    handler: () => window.open('https://www.iloveimg.com/es/redimensionar-imagen', '_blank').focus()
                                },
                            ]
                        })
                        message.present()
                        return false
                    } else {
                        return true
                    }
                };
            } else {
                this.acceptMessage("Imágen demasiado pesada", "Debes introducir una imágen de menos de 2mb de peso")
                return false
            }
        }
    }



    public async alertMessageRouter(link: string, header, message){
        const messageAlert = await this.alert.create({
          header: header,
          message: message,
          buttons: [
              {
                  text: "Aceptar", handler: () => {
                    this.router.navigateByUrl(link);
                  }
              }
          ],
          backdropDismiss: false
      });
      messageAlert.present();
    }
}