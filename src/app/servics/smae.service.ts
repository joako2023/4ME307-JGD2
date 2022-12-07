import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { HttpGenericService } from "./FAST-TRACK-FRONTEND/http-generic.service";


@Injectable({
  providedIn: 'root'
})
export class SmaeService {
  private _listCategorias = new BehaviorSubject([])
  public listCategorias = this._listCategorias.asObservable();
  constructor(
    private httpcli: HttpClient,
    private http:HttpGenericService<any>
  ) { 
    this.getServicios()
  }

  public getServicios() {
   return this.http.get('/categorias-smae')
  }

  public getReporte() {

    return this.httpcli.get('http://localhost:4200/assets/files/MAE2014.xlsx', { responseType: 'blob' })

  }



}