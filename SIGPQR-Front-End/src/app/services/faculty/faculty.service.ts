import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../authService/auth.service";
import {Observable} from "rxjs";
import {Faculty} from "../../models/Faculty";
import {global} from "../../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
   public  currentUser;
  constructor(private http: HttpClient,
              authService:AuthService) {
     this.currentUser = authService.currentUserValue;
  }

    public getAll():Observable<Array<Faculty>>|boolean{
      if (this.currentUser){
        let headers = new HttpHeaders().set('content-type',global.contentType);
          //.set('Authorization',this.currentUser.token);
        return this.http.get<any>(global.url+'faculties',{headers:headers}).
          pipe(map(response => {
          if (response.status == 'success'){
            console.log(response.data);
            return response.data;
          }else{
            return response;
          }
           }));
      }else {
        return false;
      }
    }
  public getFaculty(id:number):Observable<Faculty>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
       // .set('Authorization',this.currentUser.token);
      return this.http.get<Faculty>(global.url+'faculties/'+id,{headers:headers}).
      pipe(map(faculty => {
        console.log(faculty);
        return faculty;
      }));
    }else {
      return false;
    }
  }
  public store(faculty:Faculty):Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
        //.set('Authorization',this.currentUser.token);
      let params = 'json='+JSON.stringify(faculty);
      return this.http.post<any>(global.url+'faculties',params,{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }else {
      return false;
    }
  }
  public delete(id:number):Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
        //.set('Authorization',this.currentUser.token);
      return this.http.delete<any>(global.url+'faculties'+id,{headers:headers}).
      pipe(map(response => {
        console.log(response);
        return response;
      }));
    }else {
      return false;
    }
  }

  public updateFaculty(faculty:Faculty):Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
        //.set('Authorization',this.currentUser.token);
      let params = 'json='+JSON.stringify(faculty,(key, value) => {
        if (key == 'programs') {
          return undefined;
        }
        return value;
        });
      return this.http.put<any>(global.url+global.tagFaculty+'/'+faculty.id,params,{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }else {
      return false;
    }
  }
  public getProgramsByFaculty(id:number):Observable<any>|boolean{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
      //  .set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'faculties/'+id+'/programs',{headers:headers}).
      pipe(map(programs => {
        console.log(programs);
        return programs;
      }));
    }else {
      return false;
    }
  }
  public count():Observable<any>{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
        //.set('Authorization',this.currentUser.token);
      return this.http.get<any>(global.url+'count-faculties',{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }
  }
}
