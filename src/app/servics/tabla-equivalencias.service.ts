import {Injectable} from '@angular/core';
import {CrudService} from './FAST-TRACK-FRONTEND/crud.service';
import {HttpGenericService} from './FAST-TRACK-FRONTEND/http-generic.service';
import {UtilsService} from './FAST-TRACK-FRONTEND/utils.service';

@Injectable({
  providedIn: 'root'
})
export class  EquivalenciasService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/equivalencias',
      urlGet: '/equivalencias',
      urlPut: '/equivalencias',
      urlPost: '/equivalencias',
      urlGetInfinite: '',
      messageForSave: 'Equivalencia guardada',
      messageForDelete: 'Equivalencia eliminada',
      messageForUpdate: 'Equivalencia actualizada',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_EQUIVALENCIAS',
      keyLocalStorageSelected: 'EQUIVALENCIA_SELECTED'
    });
    super.get();
  }
}