import { Injectable } from '@angular/core';
import {AuthService} from "./authService/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {global} from "../global";
import {_Request} from "../models/_Request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  public  currentUser;
  constructor(private http: HttpClient,
              private authService:AuthService) {
    authService.currentUser.subscribe(user=>this.currentUser=user);
  }

  getAll():Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+'requests',{headers:headers});
  }
  getRequest(id:number):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+'requests/'+id,{headers:headers});
  }
  storeRequest(request:_Request):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    let params = 'json=' + JSON.stringify(request);
    return this.http.post<any>(global.url+'requests',params,{headers:headers});
  }
  editRequest(request:_Request):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    let params = 'json=' + JSON.stringify(request);
    return this.http.put<any>(global.url+"requests/"+request.id,params,{headers:headers});
  }
  getRequestById(id:number):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+"requests/"+id,{headers:headers});
  }
  getRequestTypes():Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+'request-types',{headers:headers});
  }
  getRequestByType(type_id:number):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+'student-request-types/'+type_id+'/requests',{headers:headers});
  }
}
