import { Component, OnInit } from '@angular/core';
import {global} from "../../../global";
import {AuthService} from "../../../services/authService/auth.service";

declare var document: any;
@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css']
})
export class EstructuraComponent implements OnInit {
  public  currentUser;
  public url:string;
  constructor(private authService:AuthService) {
    this.url = global.url;
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {

  }
  logout(){
    this.authService.logout();
  }
  public isAdmin(){
    if (this.currentUser && this.currentUser.admin == 'true'){
      return true;
    }

  }

}
