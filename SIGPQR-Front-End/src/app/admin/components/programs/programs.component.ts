import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../../../services/program/program.service";
import {AuthService} from "../../../services/authService/auth.service";
import {Program} from "../../../models/Program";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  public programs:Array<Program>;
  public currentProgram:Program;
  loading:boolean;
  constructor(private programService:ProgramService,
              authService:AuthService) {
    this.loading = true;
  }

  ngOnInit() {
    this.loadPrograms();
  }
  loadPrograms(){
    this.programService.getAll().pipe(map(data=>{
      if (data.status == 'success') {
        return data.data
      } else {
        return data;
      }
    })).subscribe(response=>{
      this.programs = response;
      this.loading = false;
    },error =>{
      console.log('aqui',error);
    } );
  }

}
