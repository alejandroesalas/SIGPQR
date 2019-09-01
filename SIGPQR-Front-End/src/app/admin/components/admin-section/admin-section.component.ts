import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";
import {AuthService} from "../../../services/authService/auth.service";
import {global} from "../../../global";
import {Subscription} from "rxjs";
import {Profile} from "../../../models/Profile";

@Component({
  selector: 'admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit,OnDestroy {
  private subscription:Subscription;
  public  currentUser;
  public url:string;
  constructor(private authService:AuthService) {
    this.url = global.url;
    this.subscription=(this.authService.currentUser.subscribe(user=> this.currentUser = user));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logout(){
    this.authService.logout();
  }
 iscoordinator(){
   if (this.currentUser && this.currentUser.profile_id == Profile.coordinator){
     return true;
   }
}
}
