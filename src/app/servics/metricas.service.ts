import {Injectable} from '@angular/core';
import {CrudService} from './FAST-TRACK-FRONTEND/crud.service';
import {HttpGenericService} from './FAST-TRACK-FRONTEND/http-generic.service';
import {UtilsService} from './FAST-TRACK-FRONTEND/utils.service';

@Injectable({
  providedIn: 'root'
})
export class  MetricasService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/metricas',
      urlGet: '/metricas',
      urlPut: '/metricas',
      urlPost: '/metricas',
      urlGetInfinite: '',
      messageForSave: 'metricas guardadas',
      messageForDelete: 'metricas eliminadas',
      messageForUpdate: 'metricas actualizadas',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_metricas',
      keyLocalStorageSelected: 'metricas_SELECTED'
    });
    super.get();
  }
  public getFechasNuevas(from:string, to:string){
    // console.log('/charts'+'/'+type+'/'+metricaNombre+'/'+from+'/'+to)
     return this.http.get('/metricas'+'/'+from+'/'+to)
   }

   public getByYear(year:number){
return this.http.get('/metricas',{params:{year}})
   }
}