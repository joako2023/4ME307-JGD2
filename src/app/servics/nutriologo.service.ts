import { Injectable } from "@angular/core";
import { CrudService } from "./FAST-TRACK-FRONTEND/crud.service";
import { HttpGenericService } from "./FAST-TRACK-FRONTEND/http-generic.service";
import { UtilsService } from "./FAST-TRACK-FRONTEND/utils.service";

@Injectable({
  providedIn: 'root'
})
export class  NutriologoService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/nutriologo',
      urlGet: '/nutriologo',
      urlPut: '/nutriologo',
      urlPost: '/nutriologo',
      urlGetInfinite: '',
      messageForSave: 'Nutrologist saved',
      messageForDelete: 'Nutrologist deleted',
      messageForUpdate: 'Nutrologist updated',
      messageForLoad: 'Running proccess',
      messageForError: 'problem happened while restitering',
      keyLocalStorageList: 'LIST_NUTRIOLOGOS',
      keyLocalStorageSelected: 'NUTRIOLOGOS_SELECTED'
    });
    super.get();
  }
  // public actualizar(id:string, data:FormData){
  //   // console.log('/charts'+'/'+type+'/'+metricaNombre+'/'+from+'/'+to)
  //    return this.http.put('/nutriologo'+'/'+id+'/'+data)
  //  }
}
