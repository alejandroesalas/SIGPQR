import { Component, OnInit } from '@angular/core';
import {Program} from "../../../models/Program";
import {Faculty} from "../../../models/Faculty";
import {ProgramService} from "../../../services/program/program.service";
import {FacultyService} from "../../../services/faculty/faculty.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {isNumber} from "util";

@Component({
  selector: 'app-programs-edit',
  templateUrl: './programs-edit.component.html',
  styleUrls: ['./programs-edit.component.css']
})
export class ProgramsEditComponent implements OnInit {

  public currentProgram:Program;
  public faculties:Array<Faculty>;
  constructor(private programService:ProgramService,
              private facultyService:FacultyService,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.currentProgram = new Program(0,'',0,0);
  }

  ngOnInit() {
    this.loadProgram();
    this.loadFaculties();
  }
  loadProgram(){
    let rest;
    this.route.params.subscribe(value => {
      let id = +value['id'];
      if (isNumber(id)){
        rest = this.programService.getProgram(id);
        if (rest){
          rest.subscribe(response=>{
            if (response.status == 'success'){
              this.currentProgram = response.data;
            }
            //this.loading = false;
          },error =>{
            console.log('errores', error);
          });
        }
      }
    });
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
  editProgram(form){
    let subscription;
    subscription = this.programService.update(this.currentProgram);
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
