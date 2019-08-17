import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {DisabledUsersComponent} from "./components/disabled-users/disabled-users.component";
import {AdminComponent} from "./admin.component";
import {Profile} from "../models/Profile";
import {_adminGuard} from "../guards/_admin.guard";
import {FacultiesComponent} from "./components/faculties/faculties.component";
import {UsersComponent} from "./components/users/users.component";
import {ProgramsComponent} from "./components/programs/programs.component";
import {global} from "../global";

const adminRoutes: Routes = [
  {path:global.tagAdmin,component:AdminComponent,
    children:[
      {path:'',component:AdminHomeComponent},
      {path:global.tagUser,component:UsersComponent,
        children:[{path:'disabled',component:DisabledUsersComponent}]
      },
      {path:global.tagFaculty,component:FacultiesComponent},
      {path:global.tagProgram,component:ProgramsComponent}
    ],
    canActivate:[_adminGuard],
    data:{rol:Profile.admin},
  },
  {path:'logout/:sure',component:AdminComponent}
];
@NgModule({
  imports:[
    RouterModule.forChild(adminRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
