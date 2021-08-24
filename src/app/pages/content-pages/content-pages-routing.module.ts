import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { ConfirmEmailPageComponent } from "./confirm-email/confirm-email-page.component";
import { InvitedUserPageComponent } from "./invited-user/invited-user-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { RegistrationCompleteComponent } from "./registration-complete/registration-complete.component";
import { RegistrationWithMcComponent } from "./registration-with-mc/registration-with-mc.component";
import { RegistrationMcDbComponent } from "./registration-mc-db/registration-mc-db.component";
import { AccountApprovedComponent } from "./account-approved/account-approved.component";
import { CompanyAccountApprovedComponent } from "./company-account-approved/company-account-approved.component";
import { CompanyRegistrationCompleteComponent } from "./company-registration-complete/company-registration-complete.component";
import { AccountRegistrationDeclinedComponent } from "./account-registration-declined/account-registration-declined.component";
import { CompanyRegistrationDeclinedComponent } from "./company-registration-declined/company-registration-declined.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "comingsoon",
        component: ComingSoonPageComponent,
        data: {
          title: "Coming Soon page",
        },
      },
      {
        path: "error",
        component: ErrorPageComponent,
        data: {
          title: "Error Page",
        },
      },
      {
        path: "forgotpassword",
        component: ForgotPasswordPageComponent,
        data: {
          title: "Forgot Password Page",
        },
      },
      {
        path: "confirmemail",
        component: ConfirmEmailPageComponent,
        data: {
          title: "Confirm Email Page",
        },
      },
      {
        path: "inviteduser",
        component: InvitedUserPageComponent,
        data: {
          title: "Invited User Page",
        },
      },
      {
        path: "lockscreen",
        component: LockScreenPageComponent,
        data: {
          title: "Lock Screen page",
        },
      },
      {
        path: "login",
        component: LoginPageComponent,
        data: {
          title: "Login Page",
        },
      },
      {
        path: "maintenance",
        component: MaintenancePageComponent,
        data: {
          title: "Maintenance Page",
        },
      },
      {
        path: "register",
        component: RegisterPageComponent,
        data: {
          title: "Register Page",
        },
        children: [
          {
            path: "registration-with-mc",
            component: RegistrationWithMcComponent,
            data: {
              title: "registration with-mc",
            },
          },
          {
            path: "registration-mc-db",
            component: RegistrationMcDbComponent,
            data: {
              title: "registration mc-db",
            },
          },
        ],
      },
      {
        path: "passwordreset",
        component: PasswordResetComponent,
        data: {
          title: "Password Reset",
        },
      },
      {
        path: "registration-complete",
        component: RegistrationCompleteComponent,
        data: {
          title: "registration complete",
        },
      },
      {
        path: "account-approve",
        component: AccountApprovedComponent,
        data: {
          title: "account-approve",
        },
      },
      {
        path: "company-account-approve",
        component: CompanyAccountApprovedComponent,
        data: {
          title: "company-account-approve",
        },
      },
      {
        path: "company-registration-complete",
        component: CompanyRegistrationCompleteComponent,
        data: {
          title: "company-account-approve",
        },
      },
      {
        path: "account-registration-declined",
        component: AccountRegistrationDeclinedComponent,
        data: {
          title: "account-registration-declined",
        },
      },
      {
        path: "company-registration-declined",
        component: CompanyRegistrationDeclinedComponent,
        data: {
          title: "account-registration-declined",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule {}
