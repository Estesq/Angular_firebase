import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleGuard, roles} from '../shared/auth/role-guard';
import {ClientInfoComponent} from '../clients/client-info/client-info.component';
import {TripInfoPageComponent} from './trip-info-page/trip-info-page.component';
import {EditTripInfoPageComponent} from './edit-trip-info-page/edit-trip-info-page.component';
import {LoadBoardComponent} from './load-board/load-board.component';
import {LoadInfoSectionComponent} from './load-info-section/load-info-section.component';


const routes: Routes = [
  {
    path: 'board',
    canActivate: [RoleGuard],
    data: { roles: [roles.admin, roles.company] },
    component: LoadBoardComponent,
    children: [
    ]
  },
  {
    path: 'trip-info/:id',
    component: TripInfoPageComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    children: [],
  },
  {
    path: 'edit',
    canActivate: [RoleGuard],
    data: { roles: [roles.admin, roles.company] },
    component: EditTripInfoPageComponent,
    children: [
    ]
  },
  {
    path: 'list',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    // component: ListComponent,
    children: [
    ]
  },
  // {
  //   path: "edit-trip",
  //   component: EditTripInfoPageComponent,
  //   //canActivate: [RoleGuard],
  //   // data: { roles: [roles.admin, roles.company] },
  //   children: [],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadRoutingModule { }
