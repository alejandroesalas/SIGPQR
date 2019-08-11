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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ErrorComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    LogoSectionComponent,
    ProgramComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    routing,
    HttpClientModule,
    StudentModule,
    CoordinatorModule,
    AdminModule
  ],
  providers: [appRoutingProviders],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
