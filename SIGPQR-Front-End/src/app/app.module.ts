import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {appRoutingProviders, routing} from "./app.routing";
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {ModalModule} from "./_modal";
import { LogoSectionComponent } from './components/logo-section/logo-section.component';
import {AuthService} from "./services/authService/auth.service";
import {ModalServiceService} from "./services/modal-service.service";
import {CoordinatorModule} from "./coordinator/coordinator.module";
import {StudentModule} from "./student/student.module";
import {AdminModule} from "./admin/admin.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule, MatSelectModule} from "@angular/material";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AngularFileUploaderModule}from "angular-file-uploader";
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    LogoSectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AngularFileUploaderModule,
    ModalModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoordinatorModule,
    StudentModule,
    AdminModule,
    routing
  ],
  providers: [appRoutingProviders,
  AuthService,ModalServiceService,{
    provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
