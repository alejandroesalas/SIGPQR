import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {appRoutingProviders, routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {ModalModule} from "./_modal/modal.module";
import { LogoSectionComponent } from './components/logo-section/logo-section.component';
import {StudentModule} from "./student/student.module";
import {CoordinatorModule} from "./coordinator/coordinator.module";
import {AdminModule} from "./admin/admin.module";
import { ProgramComponent } from './program/program.component';
import {AuthService} from "./services/authService/auth.service";
import {ModalServiceService} from "./services/modal-service.service";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    LogoSectionComponent,
    ProgramComponent,
  ],
  imports: [
    BrowserModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    StudentModule,
    CoordinatorModule,
    AdminModule
  ],
  providers: [appRoutingProviders,
  AuthService,ModalServiceService],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
