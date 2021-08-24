import { RouteInfo } from './vertical-menu.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: '', title: 'TRKR admin panel', icon: 'ft-settings', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, role: ['admin'], submenu: [
      { path: '/admin/users-list', title: 'Administrators', icon: 'fa fa-users', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['admin'], submenu: [] },
      { path: '/clients/list', title: 'Companies', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['admin'], submenu: [] },
      { path: '/admin/parser-page', title: 'Parser page', icon: 'fa fa-file-excel-o', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['admin'], submenu: [] },
    ]
  },
  { path: '/cards/posting-cards-list', title: 'Posting cards', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
  // { path: '/cards/posting-cards-list', title: 'Posting cards', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  { path: '/dashboard/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, role: ['admin', 'company', 'manager', 'staff'], submenu: [] },
  // { path: '/dashboard/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, role: ['company'], submenu: [] },
  { path: '/offers/list', title: 'Offers', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
  // { path: '/offers/list', title: 'Offers', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, role: ['company'], submenu: [] },
  { path: '/loads/board', title: 'Load board', icon: 'fa-load', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
  {
    path: '', title: 'Equipment', icon: 'fa fa-truck', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [
      { path: '/combination/list', title: 'Connect', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
      { path: '/trucks/trucks-list', title: 'Trucks', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
      { path: '/trailers/list', title: 'Trailers', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
      { path: '/combination/edit', title: 'Edit', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
    ]
  },
  { path: '/drivers/list', title: 'Drivers', icon: 'fa-driver', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
  {
    path: '', title: 'Settings', icon: 'ft-settings', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [
      { path: '/company/list', title: 'Users', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
      { path: '/company/edit', title: 'Company info', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company', 'manager', 'staff'], submenu: [] },
    ]
  },
  // {
  //   path: '', title: 'Settings', icon: 'ft-settings', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [
  //     { path: '/trucks/trucks-list', title: 'Trucks list', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  //     { path: '/company/edit', title: 'Profile', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  //     { path: '/company/list', title: 'Staff', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  //     { path: '/drivers/list', title: 'Drivers', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  //     { path: '/trailers/list', title: 'Trailer', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, role: ['company'], submenu: [] },
  //   ]
  // },
];
