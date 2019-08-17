import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CoordinatorRoutingModule} from "./coordinator-routing.module";
import {CoordinatorComponent} from "./coordinator.component";
import { EstructuraComponent } from './components/estructura/estructura.component';
import { CoordinatorProfileComponent } from './components/coordinator-profile/coordinator-profile.component';
import {CoordinatorHomeComponent} from "./components/coordinator-home/coordinator-home.component";
import {CoordinatorRequestsComponent} from "./components/coordinator-requests/coordinator-requests.component";
import {DynamicScriptLoaderService} from "../services/dynamic-script-loader.service";
import {AuthService} from "../services/authService/auth.service";
import {AuthGuard} from "../guards/auth.guard";

@NgModule({
  declarations:[
    CoordinatorHomeComponent,
    CoordinatorRequestsComponent,
    CoordinatorProfileComponent,
    CoordinatorComponent,
    EstructuraComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoordinatorRoutingModule
  ],
  exports:[
    CoordinatorComponent,
    CoordinatorHomeComponent,
    CoordinatorRequestsComponent,
    CoordinatorProfileComponent,
    EstructuraComponent,
  ],
  providers:[DynamicScriptLoaderService,
    AuthService,AuthGuard]
})
export class CoordinatorModule {

}
