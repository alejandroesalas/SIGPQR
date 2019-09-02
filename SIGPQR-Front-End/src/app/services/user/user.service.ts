import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../authService/auth.service";
import {Observable} from "rxjs";
import {global} from "../../global";
import {map} from "rxjs/operators";
import {Profile} from "../../models/Profile";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public  currentUser;
  constructor(private http: HttpClient,
              authService:AuthService) {
    this.currentUser = authService.currentUserValue;
  }
  public checkEmail(email:String):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    let params = 'json={\"email\":'+JSON.stringify(email)+'}';
    return this.http.post<any>(global.url+'check-email',params,{headers:headers});
  }

  public getAll():Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'users',{headers:headers}).
      pipe(map(response => {
        if (response && response.status == 'success'){
          return response.data;
        }else{
          return response;
        }
      }));
    }else {
      return false;
    }
  }
  public getAllDisabledUsers():Observable<any> {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
      return this.http.get<any>(global.url + 'only-teachers-trashed', {headers: headers});
    }
  }
  public getUser(id:number):Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'users/'+id,{headers:headers}).
      pipe(map(response => {
        if (response && response.status == 'success'){
          return response.data;
        }else{
          return response;
        }
      }));
    }else {
      return false;
    }
  }
  public store(user:User):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType)
    let params = 'json='+JSON.stringify(user);
    return this.http.post<any>(global.url+'users',params,{headers:headers});
  }
  public update(user:User):Observable<any>|boolean{
    let headers = new HttpHeaders().set('content-type',global.contentType)
      .set('Authorization',this.currentUser.token);
    let params = 'json='+JSON.stringify(user);
    return this.http.put<any>(global.url+'users/'+user.id,params,{headers:headers}).
    pipe(map(data => {
      console.log(data);
      return data;
    }));
  }
  public delete(id:number):Observable<any>{
    if (this.currentUser && this.currentUser.profile_id == Profile.admin){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.delete<any>(global.url+'users/'+id,{headers:headers}).
      pipe(map(response => {
        return response;
      }));
    }else {
      return null;
    }
  }
  public restore(id:number):Observable<any>{
    if (this.currentUser && this.currentUser.profile_id == Profile.admin){
      let headers = new HttpHeaders().set('content-type',global.contentType)
      return this.http.post<any>(global.url+'restore-teacher/'+id,{headers:headers}).
      pipe(map(response => {
        return response;
      }));
    }
    return null;
  }

  public countDisabledUsers():Observable<any>{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
      return this.http.get<any>(global.url+'count-teachers-eliminated',{headers:headers}).
      pipe(map(data => {
        return data;
      }));
    }
  }
  public count():Observable<any>{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'count-teachers',{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }
  }
}
