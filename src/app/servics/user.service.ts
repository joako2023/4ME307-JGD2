import {Injectable} from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
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
      messageForSave: 'user saved',
      messageForDelete: 'user deleted',
      messageForUpdate: 'user updated',
      messageForLoad: 'runing proccess',
      messageForError: 'problem happened while restitering',
      keyLocalStorageList: 'LIST_USER',
      keyLocalStorageSelected: 'USER_SELECTED'
    });
    super.get();
  }
  private mapUser(user: UserInterface){

    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      confirmed: false,
      blocked: true,
      tipo: "ADMIN",
      telefono: user.telefono,
      rol: "ADMIN",
    }
    return body;
  }

  public saveUser(user: UserInterface){
    const body = this.mapUser(user);
    return this.http.post('/user',body);
  }

}
