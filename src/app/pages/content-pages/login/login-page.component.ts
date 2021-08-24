import { Component, ChangeDetectorRef, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    rememberMe: new FormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  async onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    try {
      await this.authService.signInUser(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      this.spinner.hide();
      this.router.navigate(["/dashboard/dashboard"]);
    } catch (err) {
      this.isLoginFailed = true;
      this.spinner.hide();
      this.loginForm.setErrors({ incorrect: true, message: err.message });
      this.cdr.detectChanges();
      console.log("error: " + err.message);
      // if (err.code == "UserNotConfirmedException") {
      //   this.router.navigate(['/pages/confirmemail/'], { queryParams: { email: this.loginForm.value.username } });
      // }
    }
  }
}
