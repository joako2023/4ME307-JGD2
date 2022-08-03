import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const user= JSON.parse(sessionStorage.getItem('usuarioSD'))
   if ( user.rol.toUpperCase().includes('ADMINISTRADOR')==true ) {
        if(!sessionStorage.getItem('tokenSD')){
          this.router.navigateByUrl('/login');
          return false
        }else{
          return true;
        }
      
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
    
  }
}