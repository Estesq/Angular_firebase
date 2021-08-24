import { Component, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {UserInterface} from '../../../shared/models/user.interface';

@Component({
    selector: 'app-invited-user-page',
    templateUrl: './invited-user-page.component.html',
    styleUrls: ['./invited-user-page.component.scss']
})
export class InvitedUserPageComponent {
  userSubscription;
  inviteForm = new FormGroup({
    email: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    isAgree: new FormControl('', [Validators.required]),
  });
  inviteFormSubmitted = false;
  isReConfirmFailed = false;
  error: string;
  currentUser: UserInterface;

  constructor(private router: Router,
      private authService: AuthService,
      private spinner: NgxSpinnerService,
      private cdr: ChangeDetectorRef,
      private route: ActivatedRoute) { }

  get cf() {
    return this.inviteForm.controls;
  }

  // On submit click, reset form fields
  async ngOnInit() {
    // this.userSubscription = DataStore.observe<User>(User).subscribe(() => {});
    // if (this.authService.user == undefined) {
    //   // await this.authService.isAuthenticated();
    // }
    // this.currentUser = this.authService.currentUser;
    if (!this.currentUser.inviteCode) {
      this.router.navigate(['/dashboard/dashboard']);
    }

    this.inviteForm.controls.email.setValue(this.currentUser.email);
    this.cdr.detectChanges();
  }
  // ngOnDestroy() {
  //   if (this.userSubscription) this.userSubscription.unsubscribe();
  // }

  async onSubmit() {
    this.inviteFormSubmitted = true;
    if (this.inviteForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    // try {
      // await DataStore.save(User.copyOf(this.currentUser, (item:MutableModel<User>) => {
      //   item.inviteCode = '';
      //   item.firstName = this.inviteForm.value.firstName;
      //   item.lastName = this.inviteForm.value.lastName;
      //   item.phone = this.inviteForm.value.phoneNumber;
      // }));
      // await this.authService.changePassword(
      //   this.currentUser.inviteCode,
      //   this.inviteForm.value.password,
      // )
    //   this.spinner.hide();
    //   this.isReConfirmFailed = false;
    //   this.router.navigate(['/dashboard/dashboard']);
    // } catch(error) {
    //   this.isReConfirmFailed = true;
    //   this.spinner.hide();
    //   this.error == error.message;
    // }
  }
}
