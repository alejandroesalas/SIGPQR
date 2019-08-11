import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
//componentes del modulo
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {DisabledUsersComponent} from "./components/disabled-users/disabled-users.component";
import {AdminComponent} from "./admin.component";


const adminRoutes: Routes = [
  {path:'admin',component:AdminComponent,
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
