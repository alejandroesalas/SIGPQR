import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CoordinatorRoutingModule} from "./coordinator-routing.module";

import { CoordinatorProfileComponent } from './components/coordinator-profile/coordinator-profile.component';
import {CoordinatorHomeComponent} from "./components/coordinator-home/coordinator-home.component";
import {CoordinatorRequestsComponent} from "./components/coordinator-requests/coordinator-requests.component";

@NgModule({
  declarations:[
    CoordinatorHomeComponent,
    CoordinatorRequestsComponent,
    CoordinatorProfileComponent
  ],
  imports:[
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoordinatorRoutingModule
  ],
  exports:[
    CoordinatorHomeComponent,
    CoordinatorRequestsComponent,
    CoordinatorProfileComponent
  ],
  providers:[]
})
export class CoordinatorModule {

}
