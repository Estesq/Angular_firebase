import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ComingSoonPageComponent } from './coming-soon/coming-soon-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { ConfirmEmailPageComponent } from './confirm-email/confirm-email-page.component';
import { InvitedUserPageComponent } from './invited-user/invited-user-page.component';
import { LockScreenPageComponent } from './lock-screen/lock-screen-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { MaintenancePageComponent } from './maintenance/maintenance-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegistrationCompleteComponent } from './registration-complete/registration-complete.component';
import { RegistrationWithMcComponent } from './registration-with-mc/registration-with-mc.component';
import { RegistrationMcDbComponent } from './registration-mc-db/registration-mc-db.component';
import { AccountApprovedComponent } from './account-approved/account-approved.component';
import { CompanyAccountApprovedComponent } from './company-account-approved/company-account-approved.component';
import { CompanyRegistrationCompleteComponent } from './company-registration-complete/company-registration-complete.component';
import { AccountRegistrationDeclinedComponent } from './account-registration-declined/account-registration-declined.component';
import { CompanyRegistrationDeclinedComponent } from './company-registration-declined/company-registration-declined.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule
  ],
  declarations: [
    ComingSoonPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    ConfirmEmailPageComponent,
    InvitedUserPageComponent,
    LockScreenPageComponent,
    LoginPageComponent,
    MaintenancePageComponent,
    RegisterPageComponent,
    PasswordResetComponent,
    RegistrationCompleteComponent,
    RegistrationWithMcComponent,
    RegistrationMcDbComponent,
    AccountApprovedComponent,
    CompanyAccountApprovedComponent,
    CompanyRegistrationCompleteComponent,
    AccountRegistrationDeclinedComponent,
    CompanyRegistrationDeclinedComponent
  ]
})
export class ContentPagesModule { }
