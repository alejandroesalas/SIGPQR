import { Injectable,Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    let tokenizeRe = req.clone();
    if (authService.currentUserValue){
      tokenizeRe = req.clone({
        setHeaders:{Authorization: 'Bearer '+ authService.currentUserValue.token}
      });
    }
    return next.handle(tokenizeRe);
  }
}
