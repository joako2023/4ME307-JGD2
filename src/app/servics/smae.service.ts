import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { HttpGenericService } from "./http-generic.service";

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

  getServicios() {
    this.http.get('/categorias-smae').subscribe((resp: any[]) => {
      this._listCategorias.next(resp);

    });
  }

  public getReporte() {

    return this.httpcli.get('http://localhost:4200/assets/files/MAE2014.xlsx', { responseType: 'blob' })

  }



}