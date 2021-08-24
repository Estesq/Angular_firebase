import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrucksListComponent} from './trucks-list/trucks-list.component';
import {CreateTruckComponent} from './create-truck/create-truck.component';
import {TruckInfoComponent} from './truck-info/truck-info.component';
import {EditPageComponent} from './edit-truck-page/edit-truck-page.component';
import {RoleGuard, roles} from '../shared/auth/role-guard';


const routes: Routes = [
  {
    path: 'edit-truck/:id',
    // canActivate: [RoleGuard],
    // data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditPageComponent,
    children: [
    ]
  },
  {
    path: 'trucks-list',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: TrucksListComponent,
    children: [
    ]
  },
  {
    path: 'truck-driver/:id',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditPageComponent,
    children: [
    ]
  },
  {
    path: 'truck-trailer/:id',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditPageComponent,
    children: [
    ]
  },
  {
    path: 'create-truck',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: CreateTruckComponent,
    children: [
    ]
  },
  {
    path: 'truck-info/:id',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: TruckInfoComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucksRoutingModule { }
