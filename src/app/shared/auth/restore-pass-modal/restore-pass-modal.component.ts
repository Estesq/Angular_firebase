import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr';
import {UserInterface} from '../../models/user.interface';
import {localStorageTypes} from '../../constants/constants';

@Component({
  selector: 'app-restore-pass-modal',
  templateUrl: './restore-pass-modal.component.html',
  styleUrls: ['./restore-pass-modal.component.scss']
})
export class RestorePassModalComponent implements OnInit {

  currentUser: UserInterface;
  submitted: boolean

  changePass = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required]),
  }, {validators: this.checkPasswords});

  constructor(
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
  }

  get cp() {
    return this.changePass.controls;
  }

  ngOnInit() {
    this.submitted = false;
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('newPass').value;
    const confirmPassword = group.get('confirmPass').value;
    return password === confirmPassword ? null : {notSame: true}
  }

  async resetPassword() {
    try {
      await this.authService.forgotPassword(this.currentUser.email);
      this.toastrService.success(`We send instruction how to reset password to ${this.currentUser.email}`);
    } catch (error) {
      this.toastrService.error(`Something went wrong`, error.message);
    }
    this.cdr.detectChanges();
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePass.invalid) {
      return;
    } else {
      const newPass = {
        oldPass: this.changePass.value.oldPass,
        newPass: this.changePass.value.newPass,
      }
      // this.authService.cchangePassword(newPass.oldPass, newPass.newPass).then(() => {
      //   this.toastrService.success('Password successfully changed!');
      // })
      this.activeModal.close();
    }
  }
}
