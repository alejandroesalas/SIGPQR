import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import {StudentComponent} from "./student.component";
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { StudenRequestsComponent } from './components/studen-requests/studen-requests.component';
import {StudentProfileComponent} from "./components/student-profile/student-profile.component";
import {AuthGuard} from "../guards/auth.guard";
import {Profile} from "../models/Profile";


const studentRoutes: Routes = [
  {path:'student',component:StudentComponent,
    canActivate:[AuthGuard],
    data:{rol:Profile.student},
      children:[
        {path:'',component:HomeStudentComponent},
        {path:'home',component:HomeStudentComponent},
        {path:'requests',component:StudenRequestsComponent},
        {path:'profile',component:StudentProfileComponent}
      ]
  },
];
@NgModule({
  imports:[
    RouterModule.forChild(studentRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class StudentRoutingModule { }
