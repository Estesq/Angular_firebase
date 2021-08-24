import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { ClinetsListComponent } from "./clinets-list/clinets-list.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientCreateComponent } from "./client-create/client-create.component";
import { RoleGuard, roles } from "../shared/auth/role-guard";
import { ClientInfoComponent } from "./client-info/client-info.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "create",
    component: EditPageComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "edit/:id",
    component: EditPageComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "client-edit/:id",
    component: ClientEditComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "client-create",
    component: ClientCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "staff",
    component: ClinetsListComponent,
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    children: [],
  },
  {
    path: "client-info",
    component: ClientInfoComponent,
    //canActivate: [RoleGuard],
    // data: { roles: [roles.admin, roles.company] },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
