import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.css']
})
export class CoordinatorComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.dynamicScriptLoader.load('general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
