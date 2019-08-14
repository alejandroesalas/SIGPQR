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


@NgModule({
  declarations:[
    AdminComponent,
    AdminSectionComponent,
    AdminHomeComponent,
    DisabledUsersComponent
  ],
  imports:[
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  exports:[
  ],
  providers:[AuthService,_adminGuard]
})
export class AdminModule {

}
