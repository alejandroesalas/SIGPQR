import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../../models/User";
import {global} from "../../global";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password):Observable<any> {
    let theUser:User;
    let httpParams = new HttpParams()
      .set('email',email)
      .set('password',password);
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.post<any>(global.url+`auth/login`, httpParams,{headers:headers})
      .pipe(map(data => {
        //console.log('user.user',user.user);
        theUser = data.user;
        theUser.token = data.access_token;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        //console.log('login',theUser);
        localStorage.setItem('currentUser', JSON.stringify(theUser));
        this.currentUserSubject.next(theUser);
        return theUser;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  activateUser(token:string):Observable<any>{
    let headers = new HttpHeaders().set('content-type',global.contentType);
    return this.http.get<any>(global.url+`users/verify/`+token,{headers:headers})
  }
  private redirectTo(profile_id:number){
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
        this.router.navigate(['login']);
        break;
    }
  }

}
