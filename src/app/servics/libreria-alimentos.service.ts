import { Injectable } from "@angular/core";
import { CrudService } from "./FAST-TRACK-FRONTEND/crud.service";
import { HttpGenericService } from "./FAST-TRACK-FRONTEND/http-generic.service";
import { UtilsService } from "./FAST-TRACK-FRONTEND/utils.service";

@Injectable({
  providedIn: 'root'
})
export class  LibreriaAlimentosService extends CrudService<any, any> {
  constructor(
    protected http: HttpGenericService<any>,
    protected utils: UtilsService
  ) {
    super(http, utils, {
      callInSave: true,
      debug: true,
      debounceConfig: 300,
      callInSaveInfinite: false,
      urlDelete: '/libreria-alimentos',
      urlGet: '/libreria-alimentos',
      urlPut: '/libreria-alimentos',
      urlPost: '/libreria-alimentos',
      urlGetInfinite: '',
      messageForSave: 'Alimento guardado',
      messageForDelete: 'Alimento eliminado',
      messageForUpdate: 'Alimento actualizado',
      messageForLoad: 'Realizando operación',
      messageForError: 'Ocurrio un problema realizando esta operación',
      keyLocalStorageList: 'LIST_LIB_ALIMENTOS',
      keyLocalStorageSelected: 'LIB_ALIMENTOS_SELECTED'
    });
    super.get();
  }
}