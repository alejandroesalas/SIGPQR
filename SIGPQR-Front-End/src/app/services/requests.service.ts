import { Injectable } from '@angular/core';
import {AuthService} from "./authService/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {global} from "../global";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  public  currentUser;
  constructor(private http: HttpClient,
              private authService:AuthService) {
    authService.currentUser.subscribe(user=>this.currentUser=user);
  }

  getRequestTypes(){
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+'request-types',{headers:headers});
  }
}
