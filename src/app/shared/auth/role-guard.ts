import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * The RoleGuard implementation of canActivate guards routes from users without the proper role cookie.
 * It checks the role cookie against the routes that are passed into the data property of the route
 * as a String array.
 *
 * example usage in a route:
 * {
 *  path: 'panel',
 *  component: PanelComponent,
 *  canActivate: [RoleGuard],
 *  data: {roles: [RoleGuard.roles.vpRole, RoleGuard.roles.qcRole]}
 * }
 *
 * @export
 * @class RoleGuard
 * @implements {CanActivate}
 */
@Injectable()
export class RoleGuard implements CanActivate {
  userRole: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookies: CookieService) {
  }

  /**
   * canActivate is the method that implments the guard logic.  It checks if the role
   * cookie is in the list of approved roles passed to the data.roles property of the route.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof RoleGuard
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.getRoles() == "") {
      this.router.navigate(['pages/login']);
      return false;
    }
    return route.data.roles.some((ai: any) => this.getRoles().includes(ai));
  }

  getRoles() {
    console.log('this.authService.currentUser?.role', this.authService.currentUser?.role);
    if (!this.authService.currentUser?.role) {
      this.authService.currentUser = {
        ...this.authService.currentUser,
        role: localStorage.getItem('role')
      };
    }
    return this.userRole = this.authService.currentUser?.role || '';
  }
}


/**
 * roles is a convenience object that holds the different Strings that will
 * be found in the role cookie.
 */
export const roles = {
  company: 'company',
  admin: 'admin',
  staff: 'staff',
  manager: 'manager'
};
