import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";
import {LoginComponent} from "../components/login/login.component";
import {AuthService} from "../services/authService/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

declare var loadAllResources;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  private subscription :Subscription;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router,) { }

  ngOnInit() {
    loadAllResources();
    this.logout();
  }

  logout(){
    this.subscription = this.route.params.subscribe(value => {
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
