import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../../../services/program/program.service";
import {AuthService} from "../../../services/authService/auth.service";
import {Program} from "../../../models/Program";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

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
              authService:AuthService,private _snackBar: MatSnackBar) {
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
  disable(program:Program){
    let subscription;
    subscription = this.programService.delete(program.id);
    if (subscription){
      subscription.subscribe(response=>{
        if (response.status == 'success'){
          //this.router.navigate(['../']);
          this.loadPrograms();
        }
      },error =>{
        this._snackBar.open(error.error.message,'Error', {
          duration: 2000,
        });
        console.log(error);
      });
    }else{
      this._snackBar.open('Su sesion ha caducado','Warning', {
        duration: 2000,
      });
    }
   // console.log(this.currentProgram);
  }

}
