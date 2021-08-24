import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UserInterface } from './shared/models/user.interface';
import { Store } from '@ngrx/store';

import * as fromApp from './shared/auth/state/auth.reducers';
import * as AuthActions from './shared/auth/state/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    currentUser: UserInterface | undefined;
    subscription: Subscription;

    constructor(
      private router: Router,
      // private store: Store<fromApp.State>,
      public cookieService: CookieService
    ) {
    }

    ngOnInit() {
        // this.store.dispatch(new AuthActions.AutoLogin());

      this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}
