import {Component, Input, ChangeDetectorRef, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordGeneratorService} from '../../shared/auth/password-generator.service';
import {CompanyService} from '../../shared/trkr-services/company.service';
import {CompanyInterface} from '../../shared/models/company.interface';
import {UserInterface} from '../../shared/models/user.interface';
import {AdminService} from '../../shared/trkr-services/admin.service';
import {localStorageTypes} from '../../shared/constants/constants';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() data: CompanyInterface;
  currentUser: UserInterface;
  inviteUserMessage: string = '';

  company: CompanyInterface =
    {
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      mc: '',
      dot: '',
      contactPersonName: '',
      contactPersonPosition: '',
      mobilePhone: '',
      email: '',
      cellPhone: '',
      status: '',
      ssn: '',
      scas: '',
      comments: '',
      fax: ''
    }
  newUserFormSubmitted: boolean = false;
  newUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  companyId: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private companyService: CompanyService,
    private adminService: AdminService,
    private passwordService: PasswordGeneratorService,
  ) { }

  get nuf() {
    return this.newUserForm.controls;
  }

  ngOnInit() {
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
  }
 
  async getData() {
    // AWS code
    // const company = await DataStore.query(Company, this.data);
    const company = await this.companyService.readCompanyById(this.companyId);

    console.log('company', company);
    this.cdr.detectChanges();
  }
 
  async ngOnChanges(changes: string) {
    // AWS code
    // const company = await DataStore.query(Company, this.data);
    // const company = await this.companyService.readCompanyById(this.companyId);
    this.company = this.data;
    console.log('company', this.company);
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
        password: inviteCode
      }

      // const user = await this.authService.signupUser(userData);
      await this.authService.signUpUser(userData).subscribe(res => {
        userData.uId = res;
        userData.role = 'admin';
        userData.companyId = this.companyId;
        userData.status = 'Pending';
        this.adminService.updateUser(userData)
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
