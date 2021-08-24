import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {RoleGuard, roles} from '../shared/auth/role-guard';
import {AdminUserEditComponent} from './admin-user-edit/admin-user-edit.component';
import {ParserPageComponent} from './parser-page/parser-page.component';


const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [RoleGuard],
    // data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] },
    data: { roles: [roles.admin] },
    children: [
    ]
  },
  {
    path: 'admin-user-edit/:id',
    component: AdminUserEditComponent,
    canActivate: [RoleGuard],
    // data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] },
    data: { roles: [roles.admin] },
    children: [
    ]
  },
  {
    path: 'parser-page',
    component: ParserPageComponent,
    canActivate: [RoleGuard],
    // data: { roles: [roles.panelRole, roles.qcRole, roles.stagingRole, roles.trainerRole, roles.vpRole] },
    data: { roles: [roles.admin] },
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule { }
