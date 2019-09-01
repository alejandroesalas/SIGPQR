import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/authService/auth.service";
import {Subscription} from "rxjs";
declare const loadCollapsiblle: any;

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit,OnDestroy {
  private subscription :Subscription;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
  private route: ActivatedRoute,
  private authService:AuthService,
  private router: Router) {
    loadCollapsiblle();
  }

  ngOnInit() {
    loadCollapsiblle();
    /**this.dynamicScriptLoader.loadOnBody('general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));*/
    this.logout();
  }
  logout(){
    this.route.params.subscribe(value => {
      let logout = +value['sure'];
      console.log(logout);
      if (logout == 1){
        this.authService.logout();
        this.router.navigate(['login']);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
