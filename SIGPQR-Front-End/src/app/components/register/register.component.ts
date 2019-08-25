import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../services/dynamic-script-loader.service";
import {ProgramService} from "../../services/program/program.service";
import {Program} from "../../models/Program";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   public programas:Program[];
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private programService:ProgramService) {

  }
  ngOnInit() {
    this.loadPrograms();
  }
  private loadPrograms(){
    this.programService.getAll(false).subscribe(value => {
      this.programas = value;
      //console.log('indice 1',this.programas[1]);
       //console.log('respuesta',value);
    },error => {
      console.log('errores',error);
    });
  }
}
