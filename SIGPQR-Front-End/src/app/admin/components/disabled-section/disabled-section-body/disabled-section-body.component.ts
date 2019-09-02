import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {FacultyService} from "../../../../services/faculty/faculty.service";
import {ProgramService} from "../../../../services/program/program.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'disabled-section-body',
  templateUrl: './disabled-section-body.component.html',
  styleUrls: ['./disabled-section-body.component.css']
})
export class DisabledSectionBodyComponent implements OnInit, OnDestroy {
  public title;
  public subscription: Subscription;
  public entities: Array<any>;
  public currentEntityClass:string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private facultyService: FacultyService,
              private programService: ProgramService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(value => {
      let target = value['target'];
      if (target) {
        switch (target) {
          case 'users':
            this.title = 'USUARIOS';
            this.loadDisableUsers();
            this.currentEntityClass = 'user';
            break;
          case 'faculties':
            this.title = 'FACULTADES';
            this.currentEntityClass = 'faculty';
            break;
          case 'programs':
            this.title = 'PROGRAMAS';
            this.loadDisabledPrograms();
            this.currentEntityClass = 'program';
            break;
          default:
            this.title = '';
            this.entities = null;
            this.currentEntityClass = '';
            break;
        }
      }
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadDisableUsers() {
    this.userService.getAllDisabledUsers().subscribe(response => {
      if (response.status == 'success') {
        this.entities = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  loadDisabledPrograms() {
    this.programService.getAllDisabledPrograms().subscribe(response => {
      if (response.status == 'success') {
        this.entities = response.data;
        console.log(response);
      }
    }, error => {
      console.log(error);
    });
  }
  restore(entity){
    switch (this.title) {
      case 'USUARIOS':
        this.userService.restore(entity.id).subscribe(response=>{
          if (response.status='success'){
            this._snackBar.open('Usuario Restaurado con exito','X', {
              duration: 3000,
            });
            this.loadDisableUsers();
          }
        },error => {
          console.log(error);
          this._snackBar.open(error.error.message,'Error', {
            duration: 2000,
          });
        });
        break;
      case 'PROGRAMAS':
        this.programService.restore(entity.id).subscribe(response=>{
          if (response.status='success'){
            this._snackBar.open('Programa Restaurado con exito','X', {
              duration: 3000,
            });
            this.loadDisabledPrograms();
          }
        },error => {
          console.log(error);
          this._snackBar.open(error.error.message,'Error', {
            duration: 2000,
          });
        });
        break;

    }

  }


}
