import {Injectable} from '@angular/core';
import {CrudService} from './FAST-TRACK-FRONTEND/crud.service';
import {HttpGenericService} from './FAST-TRACK-FRONTEND/http-generic.service';
import {UtilsService} from './FAST-TRACK-FRONTEND/utils.service';

@Injectable({
  providedIn: 'root'
})
export class  ServiciosService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/servicios',
      urlGet: '/servicios',
      urlPut: '/servicios',
      urlPost: '/servicios',
      urlGetInfinite: '',
      messageForSave: 'Servicio guardado',
      messageForDelete: 'Servicio eliminado',
      messageForUpdate: 'Servicio actualizado',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_SERVICIOS',
      keyLocalStorageSelected: 'SERVICIO_SELECTED'
    });
    super.get();
  }
}