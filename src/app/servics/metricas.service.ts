import {Injectable} from '@angular/core';
import {CrudService} from './FAST-TRACK-FRONTEND/crud.service';
import {HttpGenericService} from './FAST-TRACK-FRONTEND/http-generic.service';
import {UtilsService} from './FAST-TRACK-FRONTEND/utils.service';

@Injectable({
  providedIn: 'root'
})
export class  chartsService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/charts',
      urlGet: '/charts',
      urlPut: '/charts',
      urlPost: '/charts',
      urlGetInfinite: '',
      messageForSave: 'charts guardadas',
      messageForDelete: 'charts eliminadas',
      messageForUpdate: 'charts actualizadas',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_charts',
      keyLocalStorageSelected: 'charts_SELECTED'
    });
    super.get();
  }
  public llamarGrafico(type:string,metricaNombre:string,from:string, to:string){
    return this.http.get('/charts'+type+'/'+metricaNombre+'/'+from+'/'+to)
  }
}