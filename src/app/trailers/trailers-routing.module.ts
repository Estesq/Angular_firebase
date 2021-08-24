import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrailersListComponent} from './trailers-list/trailers-list.component';
import {CreateTrailerComponent} from './create-trailer/create-trailer.component';
import {TrailerInfoComponent} from './trailer-info/trailer-info.component';
import {EditPageComponent} from './edit-trailer-page/edit-trailer-page.component';
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
    component: TrailersListComponent,
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
    component: TrailerInfoComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrailersRoutingModule { }
