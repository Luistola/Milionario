import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const usuarioActual = this.auth.pegarUsuario;
      if (usuarioActual) {
        return true;
        /* const expectedPermission = next.data.expectedPermission;
        if (expectedPermission == undefined) { return true; } else if (Object(usuarioActual).permissions.includes(expectedPermission)) {
          return true;
        } else {
          this.router.navigate(['/403']);
          return false;
        } */

      }

      this.router.navigate(['/login'])
      return false;
  }

}
