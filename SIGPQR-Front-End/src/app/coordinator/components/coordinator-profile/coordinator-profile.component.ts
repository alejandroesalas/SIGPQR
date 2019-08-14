import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/authService/auth.service";
import {global} from "../../../global";

@Component({
  selector: 'app-coordinator-profile',
  templateUrl: './coordinator-profile.component.html',
  styleUrls: ['./coordinator-profile.component.css']
})
export class CoordinatorProfileComponent implements OnInit {

  public  currentUser;
  public url:string;
  constructor(private authService:AuthService) {
    this.url = global.url;
    this.currentUser = authService.currentUserValue;
  }


  ngOnInit() {
  }


}
