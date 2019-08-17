import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authService/auth.service";
import {global} from "../../../global";

@Component({
  selector: 'app-studen-section',
  templateUrl: './studen-section.component.html',
  styleUrls: ['./studen-section.component.css']
})
export class StudenSectionComponent implements OnInit {
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

}
