import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {DisabledUsersComponent} from "./components/disabled-users/disabled-users.component";
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../guards/auth.guard";
import {Profile} from "../models/Profile";
import {_adminGuard} from "../guards/_admin.guard";
import {CoordinatorComponent} from "../coordinator/coordinator.component";


const adminRoutes: Routes = [
  {path:'logout/:sure',component:AdminComponent},
  {path:'admin',component:AdminComponent,
    children:[
      {path:'',component:AdminHomeComponent},
      {path:'home',component:AdminHomeComponent},
      {path:'users',component:DisabledUsersComponent}
    ],
    canActivate:[_adminGuard],
    data:{rol:Profile.admin},
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
