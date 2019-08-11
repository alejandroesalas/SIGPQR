import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";

@Component({
  selector: 'coordinator-home',
  templateUrl: './coordinator-home.component.html',
  styleUrls: ['./coordinator-home.component.css']
})
export class CoordinatorHomeComponent implements OnInit {

  constructor(private dynamicScriptLoader:DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts();
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('dashboard-pro','navvar').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
