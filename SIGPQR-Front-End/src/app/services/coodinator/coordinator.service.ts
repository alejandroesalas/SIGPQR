import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {global} from "../../global";
import {map} from "rxjs/operators";
import {AuthService} from "../authService/auth.service";
import {Observable} from "rxjs";
import {Program} from "../../models/Program";

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {


  public  currentUser;
  constructor(private http: HttpClient,
              authService:AuthService) {
    this.currentUser = authService.currentUserValue;
  }

  count() {
    if (this.currentUser){
      let headers = new HttpHeaders().set('content-type',global.contentType);
      return this.http.get<any>(global.url+'count-coordinators',{headers:headers}).
      pipe(map(data => {
        console.log(data);
        return data;
      }));
    }
  }
  public getCoordinatorByProgram(program_id:number): Observable<any>{
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType);
      return this.http.get<any>(global.url + 'programs/' + program_id+'/coordinators',{headers: headers}).pipe(map(response => {
        return response;
      }));
    }
  }
  public degradeUser(id: number,programTarget:Program): Observable<any> {
    if (this.currentUser) {
      let headers = new HttpHeaders().set('content-type', global.contentType);
      let params = 'json={\"program_id\":' + JSON.stringify(programTarget.id)+'}';
      return this.http.put<any>(global.url + 'degradeCoordinator/' + id,params, {headers: headers}).pipe(map(response => {
        return response;
      }));
    }
  }
}
