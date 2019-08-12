import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/authService/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const  currentUSer = this.authService.currentUserValue
    if (currentUSer){
      if (route.data.roles && route.data.roles.indexOf(currentUSer.profile_id)===-1){
              //Rol no autorizado. Redireccionar al login
          this.router.navigate(['/login']);
          return false;
      }
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
