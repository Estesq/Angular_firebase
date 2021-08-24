import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { AuthState, getUserState } from '@xtream/firebase-ngrx-user-management';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    // private store: Store<AuthState>
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/pages/login']);
    }
    else {
      return true;
    }
  }

  // canActivate(): Observable<boolean>{
  //   return this.store.pipe(
  //     select(getUserState),
  //     switchMap(userState => {
  //       if(userState.loading){
  //         return EMPTY;
  //       }else{
  //         return of(userState.loggedIn);
  //       }
  //     })
  //   )
  // }

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (!this.authService.currentUser) {
  //     this.router.navigate(['pages/login']);
  //     return false;
  //   }
  //   return true;

    // let isAuth = await this.authService.isAuthenticated();
    // if (isAuth) {
    //   const currentUser = this.authService.currentUser;
    // check if route is restricted by role
    // if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
    //   // role not authorised so redirect to home page
    //   this.router.navigate(['/']);
    //   return false;
    // }

    //   if (currentUser?.inviteCode) {
    //     this.router.navigate(['/pages/inviteduser']);
    //     return false;
    //   }
    //
    //   // authorised so return true
    //   return true;
    // } else {
    //   // this.authService.signOut();
    //   this.router.navigate(['/pages/login']);
    //   return false;
    // }
  // }
}
