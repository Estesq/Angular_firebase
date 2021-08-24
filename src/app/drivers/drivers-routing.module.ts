import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriversListComponent} from './drivers-list/drivers-list.component';
import {CreateDriverComponent} from './create-driver/create-driver.component';
import {DriverInfoComponent} from './driver-info/driver-info.component';
import {EditPageComponent} from './edit-driver-page/edit-driver-page.component';
import {RoleGuard, roles} from '../shared/auth/role-guard';


const routes: Routes = [
  {
    path: 'edit/:id',
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
    component: DriversListComponent,
    children: [
    ]
  },
  {
    path: 'create',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: EditPageComponent,
    children: [
    ]
  },
  {
    path: 'info/:id',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    component: DriverInfoComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule { }
