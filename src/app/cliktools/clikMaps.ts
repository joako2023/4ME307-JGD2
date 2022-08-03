import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ClikMaps {

  constructor(
    private alert: AlertController
  ) { }

  watchPosition(options?: any) {
    return navigator.geolocation.watchPosition(options)
  }

  public async getPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const pos:any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })

    return {
      lng: pos.coords.longitude,
      lat: pos.coords.latitude
    }
  }
}