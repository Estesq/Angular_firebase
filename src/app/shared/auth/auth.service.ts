import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthInfo } from './auth-info';
import { localStorageTypes, types } from '../constants/constants';
import { UserInterface } from '../models/user.interface';
import { Store } from '@ngrx/store';
import * as AuthActions from './state/auth.actions';
import * as fromApp from '../../store/user/user.reducers';
import * as PostAction from '../../store/user/user.actions';

@Injectable({ providedIn: 'root' })

export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  private userDetails: firebase.default.User = null;
  currentUser: UserInterface;
  private currentUser$ = new BehaviorSubject<UserInterface>(null);
  private user: Observable<firebase.default.User>;
  private tokenExpirationTimer: any;

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(
    public _firebaseAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
    private store: Store<fromApp.State>,

    // private store: Store<fromApp.State>
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.afs.collection<UserInterface>('users')
          .doc<UserInterface>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  signUpUser(user: UserInterface) {
    const subject = new Subject<any>();
    const newUser: UserInterface = user;
    this._firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        newUser.uId = res.user.uid;
        const authInfo = new AuthInfo(res.user.uid);
        this.afs.collection(types.user).doc(res.user.uid)
          .set(newUser).then(() => {
            this.currentUser$.next(newUser);
          });
        if (user.role === 'company') {
          this.afs.collection(types.company).doc(res.user.uid)
            .set(user).then(() => {
              this.currentUser$.next(newUser);
            });
        }
        if (user.role === 'admin') {
          this.afs.collection(types.admin).doc(res.user.uid)
            .set(user).then(() => {
              this.currentUser$.next(newUser);
            });
        }
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });
    return subject.asObservable();
  }

  async signInUser(email: string, password: string) {
    const userId = await this._firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      // todo remove after auth will be completed
      localStorage.setItem('uId', res.user.uid);   // '12345'
      return res.user.uid
    })
    const docRef = await this.afs.collection(types.user).doc(userId)
    const doc = await docRef.ref.get();
    if (doc.exists) {

      const newDoc: UserInterface = doc.data()
      //  this.store.dispatch(new PostAction.LoadUser(newDoc))
      this.store.dispatch(new PostAction.LoadUser(newDoc));
      localStorage.setItem('user', JSON.stringify(newDoc));
      localStorage.setItem('companyId', newDoc.companyId);
      localStorage.setItem('role', newDoc.role);
      this.currentUser = newDoc;
      console.log('this.currentUser auth', this.currentUser);
      console.log('localStorage user', localStorage.getItem('user'));
    } else {
      return null;
    }
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  forgotPassword(email: string) {
    return firebase.default.auth().sendPasswordResetEmail(email);
  }

  async signOut() {
    this._firebaseAuth.signOut();
    this.currentUser = {};
    localStorage.removeItem(localStorageTypes.userId);
    localStorage.removeItem(localStorageTypes.role);
    localStorage.removeItem(localStorageTypes.companyId);

      //this.store.dispatch(new PostAction.LOGOUT_USER)
      this.store.dispatch(new PostAction.LogoutUser)

      localStorage.removeItem('user');
    this.router.navigate(['/pages/login']);
  }
  isAuthenticated() {
    return true;
  }
}
