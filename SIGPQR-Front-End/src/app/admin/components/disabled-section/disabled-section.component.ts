import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {FacultyService} from "../../../services/faculty/faculty.service";
import {ProgramService} from "../../../services/program/program.service";

@Component({
  selector: 'app-disabled-section',
  templateUrl: './disabled-section.component.html',
  styleUrls: ['./disabled-section.component.css']
})
export class DisabledSectionComponent implements OnInit {
  public totalFaculties:number;
  public totalPrograms:number;
  public totalUsers:number;//teachers
  public totalCoordinators;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private facultyService: FacultyService,
              private programService: ProgramService) {
    this.totalFaculties = 0;
    this.totalPrograms = 0;
    this.totalUsers = 0;
    this.totalCoordinators = 0;
  }

  ngOnInit() {
    this.countDisabledFaculties();
    this.countDisabledUsers();
    this.countDisabledPrograms();
    this.countDisabledCoordinators();
  }
  countDisabledFaculties(){
  }
  countDisabledUsers(){
    this.userService.countDisabledUsers().subscribe(response => {
      if (response.status == 'success'){
        this.totalUsers = response.data;
      }
    }, error => {
      console.log(error);
    });
  }
  countDisabledPrograms(){
    this.programService.countDisabledPrograms().subscribe(response => {
      if (response.status == 'success'){
        this.totalPrograms = response.data;
      }
    }, error => {
      console.log(error);
    });
  }
  countDisabledCoordinators(){
  }


}
