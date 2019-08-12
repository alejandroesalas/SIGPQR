import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {DisabledUsersComponent} from "./components/disabled-users/disabled-users.component";
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../guards/auth.guard";
import {Profile} from "../models/Profile";


const adminRoutes: Routes = [
  {path:'admin',component:AdminComponent,
    canActivate:[AuthGuard],
    data:{rol:[Profile.admin]},
    children:[
      {path:'',component:AdminHomeComponent},
      {path:'home',component:AdminHomeComponent},
      {path:'users',component:DisabledUsersComponent}
    ]
  },
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
