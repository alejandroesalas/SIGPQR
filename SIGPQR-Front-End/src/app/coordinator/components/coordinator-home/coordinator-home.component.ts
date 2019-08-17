import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";
declare const loadCollapsiblle: any;
@Component({
  selector: 'coordinator-home',
  templateUrl: './coordinator-home.component.html',
  styleUrls: ['./coordinator-home.component.css']
})
export class CoordinatorHomeComponent implements OnInit {

  constructor(private dynamicScriptLoader:DynamicScriptLoaderService) { }

  ngOnInit() {
    loadCollapsiblle();
    //this.loadScripts();
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('dashboard-pro','general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
