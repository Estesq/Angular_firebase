import { Routes, RouterModule } from '@angular/router';
import {RoleGuard, roles} from '../auth/role-guard';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    loadChildren: () => import('../../admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'clients',
    canActivate: [RoleGuard],
    data: { roles: [roles.admin] },
    loadChildren: () => import('../../clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'offers',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../offers/offers.module').then(m => m.OffersModule)
  },
  {
    path: 'company',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'drivers',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../drivers/drivers.module').then(m => m.DriversModule)
  },
  {
    path: 'trailers',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../trailers/trailers.module').then(m => m.TrailersModule)
  },
  {
    path: 'trucks',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../trucks/trucks.module').then(m => m.TrucksModule)
  },
  // problems here
  {
    path: 'combination',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../combination/combination.module').then(m => m.CombinationModule)
  },
  {
    path: 'loads',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../load/load.module').then(m => m.LoadModule)
  },
  {
    path: 'cards',
    canActivate: [RoleGuard],
    data: { roles: [roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../posting-card/posting-card.module').then(m => m.PostingCardModule)
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard],
    data: { roles: [roles.admin, roles.manager, roles.staff, roles.company] },
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];
