import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { RoleGuard, roles } from './shared/auth/role-guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'full Views',
      roles: [roles.admin, roles.company]
    },
    children: Full_ROUTES,
    canActivate: [AuthGuard, RoleGuard]
  },
  // { path: '', component: FullLayoutComponent, data: { title: 'full Views', roles: [roles.admin, roles.company] }, children: Full_ROUTES, canActivate: [AuthGuard, RoleGuard] },
  {
    path: '',
    component: ContentLayoutComponent,
    data: {
      title: 'content Views',
      roles: [roles.company, roles.manager, roles.staff]
    },
    children: CONTENT_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
