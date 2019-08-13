import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {ErrorComponent} from "./components/error/error.component";
import {RegisterComponent} from "./components/register/register.component";
import {VerifyComponent} from "./components/verify/verify.component";

const appRoutes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'login',component: LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path:'verify/:token',component:VerifyComponent},
  {path:'**',component:ErrorComponent}
];

export const appRoutingProviders : any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
