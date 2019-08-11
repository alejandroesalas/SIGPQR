import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { StudenRequestsComponent } from './components/studen-requests/studen-requests.component';
import {StudentProfileComponent} from "./components/student-profile/student-profile.component";


const studentRoutes: Routes = [
  {path:'student',component:HomeStudentComponent,
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
