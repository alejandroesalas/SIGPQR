import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/authService/auth.service";

@Injectable({ providedIn: 'root' })
export class _adminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const  currentUSer = this.authService.currentUserValue
    if (currentUSer){
          if (route.data.rol &&(route.data.rol === currentUSer.profile_id || currentUSer.admin == 'true')){
            return true;
          }else{
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
