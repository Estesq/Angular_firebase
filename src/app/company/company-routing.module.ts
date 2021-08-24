import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {RoleGuard, roles} from '../shared/auth/role-guard';


const routes: Routes = [
  {
    path: 'edit',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditPageComponent,
    children: [
    ]
  },
  {
    path: 'list',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: ListComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
