import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    forgotPasswordSubmitted = false;
    isForgotPasswordFailed = false;
    forgotPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
    });
    error: string;

    email: string;
    restoreFormSubmitted = false;
    isRestorePasswordFailed = false;
    restorePasswordForm = new FormGroup({
        code: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
    });

    constructor(
        private router: Router,
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
    ) { }

    get fp() {
        return this.forgotPasswordForm.controls;
    }
    get rf() {
      return this.restorePasswordForm.controls;
    }

    async onSubmit() {
        this.forgotPasswordSubmitted = true;
        if (this.forgotPasswordForm.invalid) {
          return;
        }
        this.spinner.show(undefined, {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true
        });

        try {
            this.forgotPasswordSubmitted = true;
            this.isForgotPasswordFailed = false;
            await this.authService.forgotPassword(this.forgotPasswordForm.value.email)
            this.spinner.hide();
            this.email = this.forgotPasswordForm.value.email;
        } catch(error) {
            this.isForgotPasswordFailed = true;
            this.spinner.hide();
            console.log('error: ', error);
            this.forgotPasswordForm.controls['email'].setErrors({'incorrect': true, 'message': error.message});
            this.cdr.detectChanges();
        }
    }

    async onReset() {
        this.restoreFormSubmitted = true;
        if (this.restorePasswordForm.invalid) {
          return;
        }
        if (this.restorePasswordForm.value.password !== this.restorePasswordForm.value.confirmPassword) {
            this.restorePasswordForm.controls.confirmPassword.setErrors({mustMatch: true});
            this.cdr.detectChanges();
            return;
        }

        this.isRestorePasswordFailed = false;
        this.spinner.show(undefined, {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true
        });

        try {
            // await this.authService.forgotPasswordSubmit(
            //     this.email,
            //     this.restorePasswordForm.value.code,
            //     this.restorePasswordForm.value.password
            // )
            this.spinner.hide();
            this.router.navigate(['/pages/login']);
        } catch(error) {
            this.isRestorePasswordFailed = true;
            this.spinner.hide();
            console.log('error: ', error);
        }
    }

}
