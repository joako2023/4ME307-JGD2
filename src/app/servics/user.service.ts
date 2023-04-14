import {Injectable} from '@angular/core';
import { CrudService } from './FAST-TRACK-FRONTEND/crud.service';
import { HttpGenericService } from './FAST-TRACK-FRONTEND/http-generic.service';
import { UtilsService } from './FAST-TRACK-FRONTEND/utils.service';


@Injectable({
  providedIn: 'root'
})
export class  UserService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/user',
      urlGet: '/user',
      urlPut: '/user',
      urlPost: '/user',
      urlGetInfinite: '',
      messageForSave: 'user guardado',
      messageForDelete: 'user eliminado',
      messageForUpdate: 'user actualizado',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_USER',
      keyLocalStorageSelected: 'USER_SELECTED'
    });
    super.get();
  }
}