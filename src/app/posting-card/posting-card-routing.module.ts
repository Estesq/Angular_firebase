import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostingCardsListComponent} from './posting-cards-list/posting-cards-list.component';
import {RoleGuard, roles} from '../shared/auth/role-guard';


const routes: Routes = [
  {
    path: 'posting-cards-list',
    component: PostingCardsListComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostingCardRoutingModule { }
