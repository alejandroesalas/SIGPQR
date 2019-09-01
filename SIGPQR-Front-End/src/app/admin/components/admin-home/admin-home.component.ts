import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {ProgramService} from "../../../services/program/program.service";
import {FacultyService} from "../../../services/faculty/faculty.service";
import {UserService} from "../../../services/user/user.service";
import {CoordinatorService} from "../../../services/coodinator/coordinator.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public loading: boolean;
  public totalOfFaculties: number;
  public totalOfPrograms: number;
  public totalOfUsers: number;
  public totalOfcoordinators: number;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private programService: ProgramService,
              private facultyService: FacultyService,
              private usersService: UserService,
              private coordinatorsService: CoordinatorService) {
    this.loading = true;
    this.totalOfcoordinators = 0;
    this.totalOfFaculties = 0;
    this.totalOfPrograms = 0;
    this.totalOfUsers = 0;
  }

  ngOnInit() {
    this.countFaculties();
    this.countUsers();
    this.countPrograms();
    this.countCoordinators();
  }

  countPrograms() {
    this.loading = true;
    this.programService.count().subscribe(response => {
      if (response.status == 'success'){
        this.totalOfPrograms = response.data;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  countFaculties() {
    this.loading = true;
    this.facultyService.count().subscribe(response => {
      if (response.status == 'success'){
        this.totalOfFaculties = response.data;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      console.log(error);

    });
  }

  countUsers() {
    this.loading = true;
    this.usersService.count().subscribe(response => {
      if (response.status == 'success'){
        this.totalOfUsers = response.data;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  countCoordinators() {
    this.loading = true;
    this.coordinatorsService.count().subscribe(response => {
      if (response.status == 'success'){
        this.totalOfcoordinators = response.data;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });


  }

}
