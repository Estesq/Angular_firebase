import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { PasswordGeneratorService } from '../../shared/auth/password-generator.service';
import { UserInterface } from '../../shared/models/user.interface';
import { AdminService } from '../../shared/trkr-services/admin.service';
import { localStorageTypes } from '../../shared/constants/constants';
import { MailSenderService } from 'app/shared/trkr-services/mail-sender.service';
import { MessageInterface } from 'app/shared/models/message.interface';

@Component({
  selector: 'app-admin-info-panel',
  templateUrl: './admin-info-panel.component.html',
  styleUrls: ['./admin-info-panel.component.scss']
})
export class AdminInfoPanelComponent implements OnChanges {

  @Input() data: UserInterface;
  currentUser: UserInterface = {};
  userForm: FormGroup;
  companyId: string
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
  resetPasswordMessage: string = '';
  inviteUserMessage: string = '';

  userFormSubmitted: boolean = false;
  newUserFormSubmitted: boolean = false;
  newUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private passwordService: PasswordGeneratorService,
    private sendEmailService: MailSenderService,
  ) {
  }

  get uf() {
    return this.userForm.controls;
  }
  get nuf() {
    return this.newUserForm.controls;
  }
  ngOnChanges(user: UserInterface) {
    this.buildItemForm(this.data);
  }
  async ngOnInit() {
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.currentUser.id = "4I3iem2xRKTpUajy39keTELObLf2"
  }
  private buildItemForm(item) {
    this.userForm = this.formBuilder.group({
      id: [item.id || '', Validators.required],
      status: [item.status || '', Validators.required],
      firstName: [item.firstName || '', Validators.required],
      lastName: [item.lastName || '', Validators.required],
      phone: [item.phone || '', Validators.required],
      email: [item.email || '', Validators.required],
      role: [item.role || '', Validators.required],
      department: [item.department || '', Validators.required],
    });
  }

  async onSubmit() {
    this.userFormSubmitted = true;
    if (this.userForm.invalid) {
      console.log('this.userForm.invalid');
      console.log('this.userForm.invalid', this.userForm.value);
      return;
    } else {
      console.log('this.userForm.value', this.userForm.value);
      this.adminService.updateUser(this.userForm.value).then(() => {
        this.userFormSubmitted = false;
        this.loading = false;
      });
    }
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
        companyId: this.companyId
      }

      this.authService.signUpUser(userData);
      // this.adminService.createUser(userData).then(async () => {
      const messageObj: MessageInterface = {
        subject: "TRKR invited you as an Administrator.",
        content: "TRKR invited you as an Administrator. Please check this url: " + inviteCode,
        type: "invite",
        senderId: this.currentUser.id,
        senderName: 'TRKR Administrator',
        // senderEmail: ,
        receiverEmail: userData.email,
        sendTime: new Date()
      }
      console.log('receiverEmail => ', userData.email);
      const result: any = await this.sendEmailService.sendAndSaveEmail(messageObj);
      
      this.inviteUserMessage = result.success ? `You send invite message to ${userData.email}` : `You cannot invite message to ${userData.email}. Please try again later.`
      this.newUserForm.reset();
      this.newUserFormSubmitted = false;
      // });
    } catch (error) {
      console.log(error);
      this.inviteUserMessage = error.message;
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }
}
