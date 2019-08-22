import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../authService/auth.service";
import {User} from "../../models/User";
import {global} from "../../global";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public  currentUser;
  constructor(private http: HttpClient,
              authService:AuthService) {
    this.currentUser = authService.currentUserValue;
  }

public promoverDocente(program_id:number,teacher:User):Observable<any>{
  if (this.currentUser){
    let headers = new HttpHeaders().set('content-type',global.contentType);
      //.set('Authorization',this.currentUser.token);
    //'json={\"email\":'+JSON.stringify(email)+'}';
    let params = 'json={\"program_id\":'+JSON.stringify(program_id)+'}';
    return this.http.put<any>(global.url+'ascent-users/'+teacher.id,params,{headers:headers}).
    pipe(map(data => {
      console.log('data',data);
      return data;
    }));
  }
  return null;
}


}
