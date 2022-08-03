import { Injectable } from '@angular/core';
import {  UserInterface } from '../interfaces/user.interface';

import { HttpGenericService } from '../servics/http-generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlUser = '/usuarios';
  private readonly urlLogin = '/auth/local';

  constructor(private httpGeneric: HttpGenericService<any> ) { }

  public getUser(){
    return this.httpGeneric.get(this.urlUser);
  }

  public saveUser(user: UserInterface){
    const body = this.mapUser(user);
    return this.httpGeneric.post(this.urlUser, body);
  }

  public userLogin(user: string, pass: string){
    const body = {
      username: user,
      password: pass
    }
    return this.httpGeneric.post(this.urlLogin, body);
  }

  public updateUser(url: string, user: UserInterface, options = {}){

    const body = this.mapUser(user);
    return this.httpGeneric.put(this.urlUser, body)
  }

  public deleteUser(url: string, options = {}) {
  }

  private mapUser(user: UserInterface){

    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      confirmed: false,
      blocked: true,
      tipo: "nutriologo",
      telefono: user.telefono,
      rol: "nutriologo",
    } 
    return body;
  }
}