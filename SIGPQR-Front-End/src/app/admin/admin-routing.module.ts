import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
//componentes del modulo
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {DisabledSectionComponent} from "./components/disabled-section/disabled-section.component";
import {AdminComponent} from "./admin.component";
import {Profile} from "../models/Profile";
import {_adminGuard} from "../guards/_admin.guard";
import {FacultiesComponent} from "./components/faculties/faculties.component";
import {UsersComponent} from "./components/users/users.component";
import {ProgramsComponent} from "./components/programs/programs.component";
import {global} from "../global";
import {UsersEditComponent} from "./components/users-edit/users-edit.component";
import {UsersAddComponent} from "./components/users-add/users-add.component";
import {ProgramsAddComponent} from "./components/programs-add/programs-add.component";
import {ProgramsEditComponent} from "./components/programs-edit/programs-edit.component";
import {CoordinatorsHomeComponent} from "../admin/components/coordinators-home/coordinators-home.component";
import {CoordinatorsAddComponent} from "./components/coordinators-add/coordinators-add.component";
import {CoordinatorsAditComponent} from "./components/coordinators-adit/coordinators-adit.component";
import {DisabledSectionBodyComponent} from "./components/disabled-section/disabled-section-body/disabled-section-body.component";

const adminRoutes: Routes = [
  {
    path: global.tagAdmin, component: AdminComponent,
    children: [
      {path: '', component: AdminHomeComponent},
      {
        path: global.tagUser,
        children: [
          {path: '', component: UsersComponent},
          {path: 'add', component: UsersAddComponent},
          {path: ':id/edit', component: UsersEditComponent},
          {path: '**', pathMatch: 'full', redirectTo: ''}
        ]
      },
      {path: global.tagFaculty, component: FacultiesComponent},
      {
        path: global.tagProgram,
        children: [
          {path: '', component: ProgramsComponent},
          {path: global.tagAdd, component: ProgramsAddComponent},
          {path: ':id/edit', component: ProgramsEditComponent}
        ]
      },
      {
        path: global.tagCoordinator,
        children: [
          {path: '', component: CoordinatorsHomeComponent},
          {path: 'add', component: CoordinatorsAddComponent},
          {path: ':id/edit', component: CoordinatorsAditComponent},
          {path: '**', pathMatch: 'full', redirectTo: ''}
        ]
      },
      {
        path: 'disabled',
        children: [
          {path: '', component: DisabledSectionComponent},
          {path: ':target', component: DisabledSectionComponent}]
      },
      {path: '**', pathMatch: 'full', redirectTo: ''}
    ],
    canActivate: [_adminGuard],
    data: {rol: Profile.admin},
  },
  {path: 'logout/:sure', component: AdminComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
