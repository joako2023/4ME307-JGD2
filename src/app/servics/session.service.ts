import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private storage: Storage = localStorage;

  private nutriologo = new BehaviorSubject<any>({});
  castNutriologo = this.nutriologo.asObservable();

  constructor(
    private router: Router
  ) {}

  public set (key: string, value: any): void {
    sessionStorage.setItem(key, value);
    if(key.includes('nutriologoSD')){
      this.nutriologo.next(JSON.parse(value));
    }
  }

  public get (key: string): string {
    return sessionStorage.getItem(key);
  }

  public logout(){
    sessionStorage.removeItem("tokenSD")
    sessionStorage.removeItem("usuarioSD")
    this.redirectIfNotLoggedIn("/login")
  }

  public setToken (token: string): void {
    this.set('tokenSD', token);
  }

  public getToken (): string {
    return this.get('tokenSD');
  }

  public check (): boolean {
    return this.getToken() !== null;
  }

  public redirectIfLoggedIn (route: string): void {
    if (this.check()) this.router.navigateByUrl(route);
  }

  public redirectIfNotLoggedIn (route: string = '/login'): void {
    if (!this.check()) this.router.navigateByUrl(route);
  }

  public clear () {
    sessionStorage.clear();
  }
}