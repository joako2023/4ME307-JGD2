import {Injectable} from '@angular/core';
import {CrudService} from './FAST-TRACK-FRONTEND/crud.service';
import {HttpGenericService} from './FAST-TRACK-FRONTEND/http-generic.service';
import {UtilsService} from './FAST-TRACK-FRONTEND/utils.service';

@Injectable({
  providedIn: 'root'
})
export class  SuscripcionesService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/planes',
      urlGet: '/planes',
      urlPut: '/planes',
      urlPost: '/planes',
      urlGetInfinite: '',
      messageForSave: 'Plan guardado',
      messageForDelete: 'Plan eliminado',
      messageForUpdate: 'Plan actualizado',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_PLANES',
      keyLocalStorageSelected: 'PLAN_SELECTED'
    });
    super.get();
  }
}