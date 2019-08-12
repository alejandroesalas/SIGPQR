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
      if (route.data.rol && route.data.rol !== (currentUSer.profile_id)){
              //Rol no autorizado. Redireccionar al login
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
      }else{
        return true;
      }
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  redirect(profile_id){
    switch (profile_id) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/coordinador']);
        break;
      case 3:
        this.router.navigate(['/student']);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

}
