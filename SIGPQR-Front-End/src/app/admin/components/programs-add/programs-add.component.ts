import { Component, OnInit } from '@angular/core';
import {Program} from "../../../models/Program";
import {ProgramService} from "../../../services/program/program.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {FacultyService} from "../../../services/faculty/faculty.service";
import {Faculty} from "../../../models/Faculty";

@Component({
  selector: 'app-programs-add',
  templateUrl: './programs-add.component.html',
  styleUrls: ['./programs-add.component.css']
})
export class ProgramsAddComponent implements OnInit {
  public currentProgram:Program;
  public faculties:Array<Faculty>;
  constructor(private programService:ProgramService,
              private facultyService:FacultyService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.currentProgram = new Program(0,'',0);
  }

  ngOnInit() {
    this.loadFaculties();
  }
  private loadFaculties() {
    let subscription: any = this.facultyService.getAll();
    if (subscription) {
      subscription.subscribe(value => {
        this.faculties = value;
      }, error => {
        console.log('errores', error);
      });
    }
  }
  addProgram(form){
    let subscription;
    subscription = this.programService.store(this.currentProgram);
    if (subscription){
      subscription.subscribe(response=>{
        if (response.status == 'success'){
          this.router.navigate(['admin/programs']);
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
    console.log(this.currentProgram);
  }

}
