import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AdminComponent } from './admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { DisabledSectionComponent } from './components/disabled-section/disabled-section.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { AdminSectionComponent } from './components/admin-section/admin-section.component';
import {AuthService} from "../services/authService/auth.service";
import {_adminGuard} from "../guards/_admin.guard";
import {StudentService} from "../services/student/student.service";
import {ProgramService} from "../services/program/program.service";
import {FacultyService} from "../services/faculty/faculty.service";
import {CoordinatorService} from "../services/coodinator/coordinator.service";
import { FacultiesComponent } from './components/faculties/faculties.component';
import { FacultiesEditComponent } from './components/faculties-edit/faculties-edit.component';
import { UsersComponent } from './components/users/users.component';
import { ProgramsComponent } from './components/programs/programs.component';
import {ModalModule} from "../_modal";
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";
import { ProgramsAddComponent } from './components/programs-add/programs-add.component';
import { ProgramsEditComponent } from './components/programs-edit/programs-edit.component';
import { CoordinatorsHomeComponent } from './components/coordinators-home/coordinators-home.component';
import { CoordinatorsAddComponent } from './components/coordinators-add/coordinators-add.component';
import { CoordinatorsAditComponent } from './components/coordinators-adit/coordinators-adit.component';
import { DisabledSectionBodyComponent } from './components/disabled-section/disabled-section-body/disabled-section-body.component';


@NgModule({
  declarations:[
    AdminComponent,
    AdminSectionComponent,
    AdminHomeComponent,
    DisabledSectionComponent,
    FacultiesComponent,
    FacultiesEditComponent,
    UsersComponent,
    ProgramsComponent,
    UsersEditComponent,
    UsersAddComponent,
    ProgramsAddComponent,
    ProgramsEditComponent,
    CoordinatorsHomeComponent,
    CoordinatorsAddComponent,
    CoordinatorsAditComponent,
    DisabledSectionBodyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    MatSelectModule,
    MatInputModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports:[
  ],
  providers:[MatSnackBar,AuthService,_adminGuard,StudentService,ProgramService,FacultyService,CoordinatorService]
})
export class AdminModule {

}
