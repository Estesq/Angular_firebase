import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffersListComponent} from './offers-list/offers-list.component';
import {CreateOfferComponent} from './create-offer/create-offer.component';
import {ListPageComponent} from './offer-list-page/offer-list-page.component';

import {OfferInfoComponent} from './offer-info/offer-info.component';
import {EditPageComponent} from './edit-offer-page/edit-offer-page.component';
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
    component: ListPageComponent,
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
    component: OfferInfoComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule { }
