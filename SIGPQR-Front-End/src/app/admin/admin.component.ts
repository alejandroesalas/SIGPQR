import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/authService/auth.service";
declare const loadCollapsiblle: any;
declare const loadSidenav:any;
declare const load:any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {
  private subscription :Subscription;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router) {}

  ngOnInit() {
   /* this.dynamicScriptLoader.load('general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));*/
    load();
    loadCollapsiblle();
    loadSidenav();
   this.logout()
  }
  logout(){
    this.subscription = this.route.params.subscribe(value => {
      let logout = +value['sure'];
      console.log(logout);
      if (logout == 1){
        this.authService.logout();
        this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
