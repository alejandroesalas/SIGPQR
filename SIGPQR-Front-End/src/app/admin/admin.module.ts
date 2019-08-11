import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { DisabledUsersComponent } from './components/disabled-users/disabled-users.component';
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations:[
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
  providers:[]
})
export class AdminModule {

}
