import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/auth/auth.service';
import { CompanyService } from '../../shared/trkr-services/company.service';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../shared/models/user.interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  loading: boolean;
  companySubscription: any;
  data: UserInterface;
  sub: Subscription;
  companyId: string;


  companyFormSubmitted: boolean;
  companyForm = new FormGroup({
    status: new FormControl({ value: 'Blocked', disabled: true }, [Validators.required]),
    clientId: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    address2: new FormControl('', []),
    city: new FormControl('', [Validators.required]),
    mc: new FormControl('', []),
    ssn: new FormControl('', []),
    dot: new FormControl('', []),
    zip: new FormControl('', [Validators.required]),
    scas: new FormControl('', []),
    comments: new FormControl('', []),
    contactPersonName: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl('', [Validators.required]),
    cellPhone: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email]),
    fax: new FormControl('', []),
    contactPersonPosition: new FormControl('', []),
  });

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {
  }

  get cf() {
    return this.companyForm.controls;
  }

  async ngOnInit() {
    this.companyId = localStorage.getItem('companyId');
    this.loading = true;
    this.companyFormSubmitted = false;
    this.companySubscription = this.companyService.readCompanyById(this.companyId).then(res => {
      this.buildItemForm(res);
    });
  }

  private buildItemForm(item: any) {
    this.companyForm = this.formBuilder.group({
      name: [item.name || ''],
      address: [item.address || ''],
      city: [item.city || ''],
      state: [item.state || ''],
      zip: [item.zip || ''],
      mc: [item.mc || ''],
      dot: [item.dot || ''],
      contactPersonName: [item.contactPersonName || ''],
      contactPersonPosition: [item.contactPersonPosition || ''],
      mobilePhone: [item.mobilePhone || ''],
      email: [item.email || ''],
      cellPhone: [item.cellPhone || ''],
      status: [item.status || ''],
      ssn: [item.ssn || ''],
      scas: [item.scas || ''],
      comments: [item.comments || ''],
      fax: [item.fax || '']
    });
  }

  async onSubmit() {
    this.companyFormSubmitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    const formData = this.companyForm.value;
    this.loading = true;
    this.companyService.updateCompany(this.companyForm.value).then(() => {
      console.log('updated')
    })
    this.loading = false;
    this.companyFormSubmitted = false;
  }

  // ngOnDestroy() {
  //   if (this.companySubscription) this.companySubscription.unsubscribe();
  // }
}
