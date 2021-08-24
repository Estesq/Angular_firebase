import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "../../../shared/directives/must-match.validator";
import { Router } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

import { CompanyService } from "../../../shared/trkr-services/company.service";
import { UserInterface } from "../../../shared/models/user.interface";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerFormSubmitted = false;
  active = 1;
  registerForm: FormGroup;
  userSubscription;
  companySubscription;

  data: boolean;
  renderComponent = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // AWS code
    // this.userSubscription = DataStore.observe<User>(User).subscribe(() => {});
    // this.companySubscription = DataStore.observe<Company>(Company).subscribe(() => {});
    this.data = false;
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        phoneNumber: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        companyType: ["Carrier", Validators.required],
        companyName: ["", Validators.required],
        companyAddress: ["", Validators.required],
        companyAddress2: ["", []],
        companyCity: ["", Validators.required],
        companyState: ["", Validators.required],
        companyZip: ["", Validators.required],
        companyMc: ["", []],
        companyDOT: ["", []],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
    if ((this.data = !true)) {
      this.renderComponent = false;
    }
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.companySubscription) {
      this.companySubscription.unsubscribe();
    }
  }

  get rf() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
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
      const userData: UserInterface = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phoneNumber: this.registerForm.value.phoneNumber,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        companyType: this.registerForm.value.companyType,
        companyName: this.registerForm.value.companyName,
        companyAddress: this.registerForm.value.companyAddress,
        companyAddress2: this.registerForm.value.companyAddress2,
        companyCity: this.registerForm.value.companyCity,
        companyState: this.registerForm.value.companyState,
        companyZip: this.registerForm.value.companyZip,
        companyMc: this.registerForm.value.companyMc,
        companyDOT: this.registerForm.value.companyDOT,
        role: "company",
        uId: "",
      };

      // AWS code
      // const user = await this.authService.signupUser(userData);
      await this.authService.signUpUser(userData).subscribe((res) => {
        userData.uId = res;
        this.companyService.createCompany(userData);
      });

      this.spinner.hide();

      this.router.navigate(["/pages/login/"]);
      this.cdr.detectChanges();
    } catch (err) {
      console.log(err);
      this.spinner.hide();
      this.registerForm.setErrors({ incorrect: true, message: err.message });
    }
  }
  on() {
    if (this.data == !true) {
      this.router.navigate(["/pages/register/registration-with-mc"]);
    }
    this.renderComponent = false;
  }
}
