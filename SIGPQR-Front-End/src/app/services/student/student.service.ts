  import { Injectable } from '@angular/core';
 import {HttpClient, HttpHeaders} from "@angular/common/http";
 import {AuthService} from "../authService/auth.service";
 import {Observable} from "rxjs";
 import {global} from "../../global";
 import {map} from "rxjs/operators";
 import {Faculty} from "../../models/Faculty";
 import {Student} from "../../models/Student";
 import {Profile} from "../../models/Profile";
 import {_Request} from "../../models/_Request";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public  currentUser;
  constructor(private http: HttpClient,
              authService:AuthService) {
    this.currentUser = authService.currentUserValue;
  }

  public getAll():Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'students',{headers:headers}).
      pipe(map(faculties => {
        console.log(faculties);
        return faculties;
      }));
    }else {
      return false;
    }
  }
  public getStudent(id:number):Observable<Student>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<Student>(global.url+'students/'+id,{headers:headers}).
      pipe(map(student => {
        console.log(student);
        return student;
      }));
    }else {
      return false;
    }
  }
  public store(student:Student):Observable<any>{
      let headers = new HttpHeaders().set('content-type',global.contentType);
      let params = 'json='+JSON.stringify(student);
      return this.http.post<any>(global.url+'students',params,{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
  }
  public delete(id:number):Observable<any>|boolean{
    if (this.currentUser && this.currentUser.profile_id == Profile.admin){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.delete<any>(global.url+'students'+id,{headers:headers}).
      pipe(map(response => {
        console.log(response);
        return response;
      }));
    }else {
      return false;
    }
  }

  public getStudentsByProgram(id:number):Observable<any>|boolean{
   return null;
  }
  public count(){
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'count-students',{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }else {
      return false;
    }
  }
  public getStudentRequests():Observable<any>|boolean{
    if (this.currentUser && this.currentUser.profile_id == Profile.student){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'students/'+this.currentUser.id+'/requests',{headers:headers}).
      pipe(map(_request => {
        console.log(_request);
        return _request;
      }));
    }else {
      return false;
    }
  }
  public createRequest(request:_Request):Observable<any>|boolean{
    if (this.currentUser && this.currentUser.profile_id == Profile.student){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      let params = 'json='+JSON.stringify(request);
      return this.http.post<any>(global.url+'students/'+this.currentUser.id+'/requests',params,{headers:headers}).
      pipe(map(_request => {
        console.log(_request);
        return _request;
      }));
    }else {
      return false;
    }
  }
public getCurrentRequest(idReq:number):Observable<any>|boolean{
  if (this.currentUser && this.currentUser.profile_id == Profile.student){
    let headers = new HttpHeaders().set('content-type',global.contentType)
      .set('Authorization',this.currentUser.token);
    return this.http.post<any>(global.url+'students/'+this.currentUser.id+'/requests/'+idReq,{headers:headers}).
    pipe(map(_request => {
      console.log(_request);
      return _request;
    }));
  }else {
    return false;
  }
}
  public updateRequest(request:_Request):Observable<any>|boolean{
    if (this.currentUser && this.currentUser.profile_id == Profile.student){
      let headers = new HttpHeaders().set('content-type',global.contentType)
        .set('Authorization',this.currentUser.token);
      let params = 'json='+JSON.stringify(request);
      return this.http.put<any>(global.url+'students/'+this.currentUser.id+'/requests',params,{headers:headers}).
      pipe(map(_request => {
        console.log(_request);
        return _request;
      }));
    }else {
      return false;
    }
  }
}
