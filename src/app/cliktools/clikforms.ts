import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class ClikForms {

    constructor(
        private alert: AlertController,
        public toastController: ToastController,

    ) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Formulario incorrecto. Revisa que hallas llenado correctamente los campos',
            duration: 2000,
            color: "danger"
        });
        toast.present();
    }

    async presentInvalidEnToast() {
        const toast = await this.toastController.create({
            message: 'Invalid form, Please verify the fields',
            duration: 2000,
            color: "danger"
        });
        toast.present();
    }

    public async formularioInvalidoAlert() {
        const messageAlert = await this.alert.create({
            header: "Formulario incorrecto",
            message: "Revisa que hallas llenado bien los campos",
            buttons: [
                {
                    text: "Aceptar"
                }
            ]
        })
        messageAlert.present()
    }
}