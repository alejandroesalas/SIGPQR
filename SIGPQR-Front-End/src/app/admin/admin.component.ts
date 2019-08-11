import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
