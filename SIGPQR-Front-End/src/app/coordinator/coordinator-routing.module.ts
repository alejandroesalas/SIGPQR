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
  {path:'coordinador',component:CoordinatorComponent,
    canActivate:[AuthGuard],
    data:{rol:[Profile.coordinator]},
    children:[
      {path:'',component:CoordinatorHomeComponent},
      {path:'home',component:CoordinatorHomeComponent},
      {path:'requests',component:CoordinatorRequestsComponent},
      {path:'profile',component:CoordinatorProfileComponent}
    ]
  },
];
@NgModule({
  imports:[
    RouterModule.forChild(coordinatorRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class CoordinatorRoutingModule { }
