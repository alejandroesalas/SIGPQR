import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {this.dynamicScriptLoader.load('general').then(data => {
    // Script Loaded Successfully
  }).catch(error => console.log(error));
  }

}
