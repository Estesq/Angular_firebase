import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../shared/trkr-services/company.service';
import {AuthService} from '../../shared/auth/auth.service';
import {CompanyInterface} from '../../shared/models/company.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  companyForm: FormGroup;
  company: CompanyInterface;
  loading: boolean
  id: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.companyForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      mc: new FormControl(''),
      dot: new FormControl(''),
      contactPersonName: new FormControl(''),
      contactPersonPosition: new FormControl(''),
      mobilePhone: new FormControl(''),
      email: new FormControl(''),
      cellPhone: new FormControl(''),
      status: new FormControl(''),
      ssn: new FormControl(''),
      scas: new FormControl(''),
      comments: new FormControl(''),
      fax: new FormControl('')
    })
    this.companyService.readCompanyById(this.id).then(res => {
      this.buildItemForm(res);
      console.log('res', res);
      this.loading = false;
      console.log('loading', this.loading);
      this.cdr.detectChanges();
    });
  }
  buildItemForm(item) {
    this.companyForm = this.formBuilder.group({
      id: [item.id],
      name: [item.name || '', Validators.required],
      address: [item.address || '', Validators.required],
      city: [item.city || '', Validators.required],
      state: [item.state || '', Validators.required],
      zip: [item.zip || '', Validators.required],
      mc: [item.mc || '', Validators.required],
      dot: [item.dot || '', Validators.required],
      contactPersonName: [item.contactPersonName || '', Validators.required],
      contactPersonPosition: [item.contactPersonPosition || '', Validators.required],
      mobilePhone: [item.mobilePhone || '', Validators.required],
      email: [item.email || '', Validators.required],
      cellPhone: [item.cellPhone || '', Validators.required],
      status: [item.status || '', Validators.required],
      ssn: [item.ssn || '', Validators.required],
      scas: [item.scas || '', Validators.required],
      comments: [item.comments || '', Validators.required],
      fax: [item.fax || '', Validators.required]
    });
  }
  async onSubmit () {
    await this.companyService.updateCompany(this.companyForm.value).then(() => {
      this.router.navigate(['/clients/list']);
    });
  }
}

