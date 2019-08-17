import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { AdminComponent } from './admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { DisabledUsersComponent } from './components/disabled-users/disabled-users.component';
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


@NgModule({
  declarations:[
    AdminComponent,
    AdminSectionComponent,
    AdminHomeComponent,
    DisabledUsersComponent,
    FacultiesComponent,
    FacultiesEditComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  exports:[
  ],
  providers:[AuthService,_adminGuard,StudentService,ProgramService,FacultyService,CoordinatorService]
})
export class AdminModule {

}
