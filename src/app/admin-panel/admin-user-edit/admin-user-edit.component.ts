import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordGeneratorService} from '../../shared/auth/password-generator.service';
import {ActivatedRoute} from '@angular/router';
import {RestorePassModalComponent} from '../../shared/auth/restore-pass-modal/restore-pass-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserInterface} from '../../shared/models/user.interface';
import {AdminService} from '../../shared/trkr-services/admin.service';
import {localStorageTypes} from '../../shared/constants/constants';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {

  @Input() data: string;
  currentUser: UserInterface;
  userSubscription;
  user: UserInterface = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    department: '',
  }
  loading: boolean = true;
  resetPasswordMessage: string = "";
  inviteUserMessage: string = "";

  userFormSubmitted: boolean = false;
  userForm = new FormGroup({
    id: new FormControl('', []),
    status: new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  newUserFormSubmitted: boolean = false;
  newUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  companyId: string;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private passwordService: PasswordGeneratorService,
  ) { }

  get uf() {
    return this.userForm.controls;
  }
  get nuf() {
    return this.newUserForm.controls;
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.userSubscription = DataStore.observe<User>(User, id).subscribe(() => {});
    this.currentUser.id = localStorage.getItem(localStorageTypes.userId);
    this.companyId = localStorage.getItem(localStorageTypes.companyId);
    this.getData();
  }
  // ngOnDestroy() {
  //   if (this.userSubscription) this.userSubscription.unsubscribe();
  // }

  async getData() {
    this.loading = true;
    this.user = await this.adminService.readUserById(this.currentUser.id)
    // this.user = await DataStore.query(User, this.currentUser.id);
    this.userForm.controls.id.setValue(this.user.id);
    this.userForm.controls.status.setValue(this.user.status);
    this.userForm.controls.firstName.setValue(this.user.firstName);
    this.userForm.controls.lastName.setValue(this.user.lastName);
    this.userForm.controls.phone.setValue(this.user.phone);
    this.userForm.controls.email.setValue(this.user.email);
    this.userForm.controls.role.setValue(this.user.role);
    this.userForm.controls.department.setValue(this.user.department);
    this.loading = false;
    this.resetPasswordMessage = '';
  }
  changePassword() {
    const modalRef = this.modalService.open(RestorePassModalComponent);
    modalRef.componentInstance.id = this.currentUser.id; // should be the id
    modalRef.componentInstance.data = this.currentUser;
    modalRef.result.then((result) => {
      console.log(result)
    });
  }
  // ngOnChanges(changes: string) {
  //   this.loading = true;
  //   this.user = await DataStore.query(User, this.data);
  //   this.userForm.controls.id.setValue(this.user.id);
  //   this.userForm.controls.status.setValue(this.user.status || "Pending");
  //   this.userForm.controls.firstName.setValue(this.user.firstName);
  //   this.userForm.controls.lastName.setValue(this.user.lastName);
  //   this.userForm.controls.phone.setValue(this.user.phone);
  //   this.userForm.controls.email.setValue(this.user.email);
  //   this.userForm.controls.role.setValue(this.user.role || "User");
  //   this.userForm.controls.department.setValue(this.user.department || "Management");
  //   this.cdr.detectChanges();
  //   this.loading = false;
  //   this.resetPasswordMessage = "";
  // }


  async onSubmit() {
    this.userFormSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    const newUser: UserInterface = this.user;
    newUser.firstName = this.userForm.value.firstName;
    newUser.lastName = this.userForm.value.lastName;
    newUser.phone = this.userForm.value.phone;
    newUser.email = this.userForm.value.email;
    newUser.role = this.userForm.value.role;
    newUser.department = this.userForm.value.department;
    this.adminService.updateUser(newUser).then(() => {
      this.userFormSubmitted = false;
      this.loading = false;
    })
  }
  async resetPassword() {
    try {
      await this.authService.forgotPassword(this.userForm.value.email);
      this.resetPasswordMessage = `We send instruction how to reset password to ${this.userForm.value.email}`;
    } catch (error) {
      this.resetPasswordMessage = error.message;
    }
    this.cdr.detectChanges();
  }

  async inviteUser() {
    this.newUserFormSubmitted = true;
    if (this.newUserForm.invalid) {
      return;
    }
    try {
      const inviteCode = this.passwordService.generate(20)
      const userData: UserInterface = {
        email: this.newUserForm.value.email,
        password: inviteCode,
        invitedBy: this.currentUser.id,
        inviteCode: inviteCode,
        role: 'admin',
        companyId: this.companyId,
      }

      await this.authService.signUpUser(userData).subscribe(res => {
        this.adminService.createUser(userData)
      });
      this.inviteUserMessage = `We send invite message to ${userData.email}`;
      this.newUserForm.reset();
      this.newUserFormSubmitted = false;
    } catch (error) {
      console.log(error);
      this.inviteUserMessage = error.message;
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }
}

