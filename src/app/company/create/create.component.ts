import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../shared/trkr-services/company.service';
import {CompanyInterface} from '../../shared/models/company.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  companySubscription: any;
  clientForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companySubscription = this.companyService.readCompanyById(id).then(res => {
      this.buildItemForm(res);
    });
  }

  ngOnDestroy() {
    if (this.companySubscription) this.companySubscription.unsubscribe();
  }

  private buildItemForm(item: any) {
    this.clientForm = this.formBuilder.group({
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

  async onSubmit () {
    const newCompany: CompanyInterface = {
      name: this.clientForm.value.name,
      address: this.clientForm.value.address,
      city: this.clientForm.value.city,
      state: this.clientForm.value.state,
      zip: this.clientForm.value.zip,
      mc: this.clientForm.value.mc,
      dot: this.clientForm.value.dot,
      contactPersonName: this.clientForm.value.contactPersonName,
      contactPersonPosition: this.clientForm.value.contactPersonPosition,
      mobilePhone: this.clientForm.value.mobilePhone,
      email: this.clientForm.value.email,
      cellPhone: this.clientForm.value.cellPhone,
      status: this.clientForm.value.status,
      ssn: this.clientForm.value.ssn,
      scas: this.clientForm.value.scas,
      comments: this.clientForm.value.comments,
      fax: this.clientForm.value.fax
    }
    this.companyService.createCompany(newCompany).then(() => {
      console.log('company created')
    })
  }
}

