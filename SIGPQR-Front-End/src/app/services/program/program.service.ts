import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {global} from "../../global";
import {map} from "rxjs/operators";
import {Faculty} from "../../models/Faculty";
import {AuthService} from "../authService/auth.service";
import {Program} from "../../models/Program";
import {Profile} from "../../models/Profile";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  public currentUser;

  constructor(private http: HttpClient,
              authService: AuthService) {
    this.currentUser = authService.currentUserValue;
  }

  public getAll(withCoordinators:boolean): Observable<any> {
    let headers = new HttpHeaders().set('content-type', global.contentType);
    if (withCoordinators){
      return this.http.get<any>(global.url + 'coordinators', {headers: headers})
    }else{
      return this.http.get<any>(global.url + 'programs', {headers: headers})
    }
  }
  public getAllDisabledPrograms():Observable<any>{
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
      return this.http.get<any>(global.url + 'only-programs-trashed', {headers: headers});
    }
  }
  public countDisabledPrograms():Observable<any>{
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType)
      return this.http.get<any>(global.url+'count-programs-eliminated',{headers:headers}).
      pipe(map(data => {
        return data;
      }));
    }
  }

  //unassigned-programs
  public unassignedPrograms(): Observable<Array<Program>> {
    let headers = new HttpHeaders().set('content-type', global.contentType);
    //.set('Authorization', this.currentUser.token);
    return this.http.get<any>(global.url + 'unassigned-programs', {headers: headers}).pipe(map(data => {
      if (data.status == 'success') {
        // console.log('programas',data.data);
        return data.data
      } else {
        return data;
      }
    }));
  }

  public getProgram(id: number): Observable<Program> | false {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      return this.http.get<Program>(global.url + 'programs/' + id, {headers: headers}).pipe(map(program => {
        console.log(program);
        return program;
      }));
    } else {
      return false;
    }
  }

  public store(program: Program): Observable<any> | false {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
      let params = 'json=' + JSON.stringify(program);
      return this.http.post<any>(global.url + 'programs', params, {headers: headers}).pipe(map(data => {
        console.log(data);
        return data;
      }));
    } else {
      return false;
    }
  }

  public delete(id: number): Observable<any> {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      return this.http.delete<any>(global.url + 'programs/' + id, {headers: headers}).pipe(map(response => {
        return response;
      }));
    }
    return null;
  }
  public restore(id:number):Observable<any>{
    if (this.currentUser && this.currentUser.profile_id == Profile.admin){
      let headers = new HttpHeaders().set('content-type',global.contentType)
      return this.http.post<any>(global.url+'restore-program/'+id,{headers:headers}).
      pipe(map(response => {
        return response;
      }));
    }
    return null;
  }

  public update(program: Program): Observable<any> | boolean {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      let params = 'json=' + JSON.stringify(program);
      return this.http.put<any>(global.url + 'programs/' + program.id, params, {headers: headers}).pipe(map(response => {
        console.log(response);
        return response;
      }));
    } else {
      return false;
    }
  }

  public getCoordinator(id: number): Observable<any> | boolean {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      return this.http.get<any>(global.url + 'programs/' + id + '/coordinators', {headers: headers}).pipe(map(coordinator => {
        console.log(coordinator);
        return coordinator;
      }));
    } else {
      return false;
    }
  }

  public count():Observable<any> {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      return this.http.get<any>(global.url + 'count-programs', {headers: headers}).pipe(map(data => {
        console.log(data);
        return data;
      }));
    }
  }

  public getRequests(id: number) {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType)
        .set('Authorization', this.currentUser.token);
      return this.http.get<any>(global.url + 'programs/' + this.currentUser.program_id + '/requests', {headers: headers}).pipe(map(coordinator => {
        console.log(coordinator);
        return coordinator;
      }));
    } else {
      return false;
    }
  }

}
