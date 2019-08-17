import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
  }

}
