import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleGuard, roles} from '../shared/auth/role-guard';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';


const routes: Routes = [
  {
    path: 'edit',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditComponent,
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
  {
    path: 'create',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: CreateComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombinationRoutingModule { }
