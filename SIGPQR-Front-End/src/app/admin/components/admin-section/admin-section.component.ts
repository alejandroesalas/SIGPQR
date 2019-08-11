import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";

@Component({
  selector: 'admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
  }

}
