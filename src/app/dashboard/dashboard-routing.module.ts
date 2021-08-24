import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import {RoleGuard, roles} from '../shared/auth/role-guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        canActivate: [RoleGuard],
        data: { roles: [roles.admin, roles.manager, roles.staff, roles.company] },
        component: DashboardComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
