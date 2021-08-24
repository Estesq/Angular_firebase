import { Component, Input, OnChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { PasswordGeneratorService } from "app/shared/auth/password-generator.service";
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';
import { MailSenderService } from 'app/shared/trkr-services/mail-sender.service';
import { MessageInterface } from 'app/shared/models/message.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() employee: EmployeeService;
  employeeForm: FormGroup;
  userSubscription: any;
  loading: boolean = true;
  resetPasswordMessage: string = '';
  inviteUserMessage: string = '';
  employeeFormSubmitted: boolean = false;
  newemployeeFormSubmitted: boolean = false;

  newEmployeeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  companyId: string;
  currentUser: string;
  noEmployee: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private passwordService: PasswordGeneratorService,
    private sendEmailService: MailSenderService,
  ) {
    this.employeeForm = new FormGroup({
      id: new FormControl('', []),
      status: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
    });
  }

  get uf() {
    return this.employeeForm.controls;
  }
  get nuf() {
    return this.newEmployeeForm.controls;
  }

  ngOnInit() {
    this.companyId = 'bMNgTD76iZADfjm4PjOR';
  }

  ngOnChanges() {
    if (this.employee) {
      this.buildForm(this.employee).then(() => {
        this.loading = false;
        this.resetPasswordMessage = "";
      });
    } else {
      this.noEmployee = true;
    }
  }

  async buildForm(items: any) {
    this.loading = true;
    this.employeeForm = this.formBuilder.group({
      id: [items.id || '', Validators.required],
      status: [items.status || '', Validators.required],
      firstName: [items.firstName || '', Validators.required],
      lastName: [items.lastName || '', Validators.required],
      phone: [items.phone || '', Validators.required],
      email: [items.email || '', Validators.required],
      role: [items.role || '', Validators.required],
      department: [items.department || '', Validators.required],
    })
  }

  async onSubmit() {
    this.employeeFormSubmitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.loading = true;
    const newEmployee: EmployeeInterface = this.employeeForm.value
    newEmployee.companyId = this.companyId;
    this.employeeService.updateUserEmployee(newEmployee, newEmployee.role).then(() => {
      this.employeeFormSubmitted = false;
      this.loading = false;
    })
  }

  clearForm() {
    this.buildForm(this.employee);
  }
  
  async resetPassword() {
    try {
      await this.authService.forgotPassword(this.employeeForm.value.email);
      this.resetPasswordMessage = `We send instruction how to reset password to ${this.employeeForm.value.email}`;
    } catch (error) {
      this.resetPasswordMessage = error.message;
    }
    this.cdr.detectChanges();
  }

  async inviteUser(role: string = "staff") {
    this.newemployeeFormSubmitted = true;
    if (this.newEmployeeForm.invalid) {
      return;
    }
    try {
      const inviteCode = this.passwordService.generate(20)
      const employee: EmployeeInterface = {
        email: this.newEmployeeForm.value.email,
        password: inviteCode,
        companyId: this.companyId,
        invitedBy: this.currentUser || "",
        inviteCode: inviteCode,
        role: role
      }
      await this.authService.signUpUser(employee).subscribe(async (res) => {
        employee.uId = res.user.uid
        await this.employeeService.createEmployee(employee, role);

        const messageObj: MessageInterface = {
          subject: "TRKR invited you as a employee.",
          content: "TRKR invited you as a employee. Please check this url: " + inviteCode,
          type: "invite",
          senderId: this.currentUser,
          senderName: 'TRKR',
          // senderEmail: this.currentUser.email,
          receiverEmail: employee.email,
          sendTime: new Date()
        }
        console.log('receiverEmail => ', employee.email);
        const result: any = await this.sendEmailService.sendAndSaveEmail(messageObj);
        this.inviteUserMessage = result.success ? `You send invite message to ${employee.email}` : `You cannot invite message to ${employee.email}. Please try again later.`
      });

      this.newEmployeeForm.reset();
      this.newemployeeFormSubmitted = false;
    } catch (error) {
      console.log(error);
      this.inviteUserMessage = error.message;
    }
    this.cdr.detectChanges();
  }
}
