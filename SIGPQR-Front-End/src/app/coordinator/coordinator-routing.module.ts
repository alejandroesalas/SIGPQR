import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import { CoordinatorHomeComponent } from "./components/coordinator-home/coordinator-home.component";
import { CoordinatorRequestsComponent } from "./components/coordinator-requests/coordinator-requests.component";
import {CoordinatorProfileComponent} from "./components/coordinator-profile/coordinator-profile.component";
import {CoordinatorComponent} from "./coordinator.component";
import {AuthGuard} from "../guards/auth.guard";
import {Profile} from "../models/Profile";


const coordinatorRoutes: Routes = [
  {path:'logout/:sure',component:CoordinatorComponent},
  {path:'coordinador',component:CoordinatorComponent,
    children:[
      {path:'',component:CoordinatorHomeComponent},
      {path:'requests/:typeReq',component:CoordinatorRequestsComponent},
      {path:'profile',component:CoordinatorProfileComponent}
    ],
    canActivate:[AuthGuard],
    data:{rol:Profile.coordinator},
  },
];
@NgModule({
  imports:[
    RouterModule.forChild(coordinatorRoutes)
  ],
  exports:[
    RouterModule
  ],
})
export class CoordinatorRoutingModule { }
