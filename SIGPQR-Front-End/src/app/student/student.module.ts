import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {StudentRoutingModule} from "./student-routing.module";

import { HomeStudentComponent } from './components/home-student/home-student.component';
import { StudenRequestsComponent } from './components/studen-requests/studen-requests.component';
import {StudentProfileComponent} from "./components/student-profile/student-profile.component";
import { StudenSectionComponent } from './components/studen-section/studen-section.component';
import { StudentComponent } from './student.component';
import {AuthService} from "../services/authService/auth.service";
import {AuthGuard} from "../guards/auth.guard";
import { RequestsAddComponent } from './components/requests-add/requests-add.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatSelectModule} from "@angular/material";
import {AngularFileUploaderModule} from "angular-file-uploader";
import { RequestsTimelineComponent } from './components/requests-timeline/requests-timeline.component';

@NgModule({
  declarations:[
    StudentComponent,
    HomeStudentComponent,
    StudenRequestsComponent,
    StudentProfileComponent,
    StudenSectionComponent,
    RequestsAddComponent,
    RequestsTimelineComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StudentRoutingModule,
    MatSelectModule,
    AngularFileUploaderModule
  ],
  exports:[
    HomeStudentComponent,
    StudenRequestsComponent,
    StudentProfileComponent,
  ],
  providers:[AuthService,AuthGuard]
})
export class StudentModule {

}
