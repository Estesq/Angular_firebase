import {Component, ChangeDetectorRef, ViewChild, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {email} from 'ngx-custom-validators/src/app/email/validator';
import {UserInterface} from '../../../shared/models/user.interface';
import {AdminService} from '../../../shared/trkr-services/admin.service';
import {localStorageTypes} from '../../../shared/constants/constants';

@Component({
    selector: 'app-confirm-email-page',
    templateUrl: './confirm-email-page.component.html',
    styleUrls: ['./confirm-email-page.component.scss']
})
export class ConfirmEmailPageComponent implements OnInit {
  userSubscription;
  reConfirmForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  reConfirmFormSubmitted = false;
  isReConfirmFailed = false;
  confirmForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });
  password: string
  confirmFormSubmitted = false;
  isConfirmFailed = false;
  isInvitedUser = false;
  isConfirmed = false;
  isCorrectCompany = true;
  error: string;
  email: string;
  code: string;
  currentUser: UserInterface;
  companyId: string;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  get cf() {
    return this.confirmForm.controls;
  }
  get lf() {
    return this.reConfirmForm.controls;
  }
  // On submit click, reset form fields
  async ngOnInit() {
    this.password = ''
    // this.userSubscription = DataStore.observe<User>(User).subscribe(() => {});
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    // this.route.queryParams.subscribe((params) => this.email = params['email']);
    // this.route.queryParams.subscribe((params) => this.code = params['code']);
    this.reConfirmForm.controls.email.setValue(this.email);
    this.confirmForm.controls.code.setValue(this.code);
    this.confirmForm.controls.email.setValue(this.email);
    // if (this.email) this.getCurrentUser(this.email);
    this.cdr.detectChanges();
  }
  // ngOnDestroy() {
  //   if (this.userSubscription) this.userSubscription.unsubscribe();
  // }

  // async getCurrentUser(email: string) {
  //   const queryFilter: ProducerModelPredicate<User> = (u: ModelPredicate<User>) => u.email('eq', email)
  //   const result = await DataStore.query<User>(User, queryFilter)
  //   if (result.length) this.currentUser = result[0];
  //   if (this.currentUser?.invitedBy) this.isInvitedUser = true;
  //   if (this.currentUser?.confirmed) this.isConfirmed = true;
  //   this.cdr.detectChanges();
  // }

  async onConfirm() {
    // await this.getCurrentUser(this.confirmForm.value.email);
    if (this.isConfirmed) {return};

    this.confirmFormSubmitted = true;
    if (this.confirmForm.invalid) {return};


    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    // try {
    //   this.isConfirmFailed = false;
    //   await this.authService.confirmSignUp(this.confirmForm.value.email, this.confirmForm.value.code);
    //   if (this.currentUser) {
    //     await DataStore.save(User.copyOf(this.currentUser, (item:MutableModel<User>) => {
    //       item.confirmed = true;
    //     }));
    //   }
    //   this.isConfirmed = true;
    //   if (!this.currentUser || !this.currentUser.invitedBy) {
    //     this.router.navigate(['/pages/login']);
    //     return;
    //   }
    // } catch(error) {
    //   this.error = error.message;
    //   this.isConfirmFailed = true;
    //   this.isConfirmed = this.error.includes('CONFIRMED');
    // } finally {
    //   this.spinner.hide();
    // }
  }

  async onSubmit() {
    this.reConfirmFormSubmitted = true;
    if (this.reConfirmForm.invalid) {
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

    try {
      // await this.authService.resendConfirmationCode(
      //   this.reConfirmForm.value.email
      // )
      this.spinner.hide();
      this.isConfirmFailed = false;
      this.confirmForm.controls.code.setValue('');
      this.confirmForm.controls.code.setValue(this.reConfirmForm.value.email);
    } catch (error) {
      this.isReConfirmFailed = true;
      this.spinner.hide();
      console.log('error: ', error);
    }
  }

  async onCompanyCorrect() {
    try {
      await this.authService.signInUser(
        this.currentUser.email, this.currentUser.inviteCode
      )
      this.router.navigate(['/pages/inviteduser']);
    } catch (err) {
      console.log('error: ' + err.message)
    }
  }
}
