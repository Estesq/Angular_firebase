import {Component, ChangeDetectorRef, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import {states} from 'app/shared/data/states';
import { PasswordGeneratorService } from 'app/shared/auth/password-generator.service';
import {DriverService} from '../../shared/trkr-services/driver.service';
import {TruckInterface} from '../../shared/models/truck.interface';
import {localStorageTypes} from '../../shared/constants/constants';
import { Subscription } from 'rxjs';
import {TruckService} from '../../shared/trkr-services/truck.service';
import {AdminService} from '../../shared/trkr-services/admin.service';
import {DriverInterface} from '../../shared/models/driver.interface';
import {UserInterface} from '../../shared/models/user.interface';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateDriverComponent implements OnInit {
  popupModel;
  loading: boolean = false;
  truckSubscription;
  driverSubscription;
  subscription: Subscription;

  currentUser: UserInterface;
  trucks: TruckInterface[];
  now = new Date();
  stateList = states;
  id: string;
  driver: DriverInterface;
  nowDate = {
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate(),
  }
  inviteUserMessage: string = "";
  error: string = "";
  driverForm: FormGroup;
  companyId: string;

  constructor(
    private router: Router,
    private driverService: DriverService,
    private truckService: TruckService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  private buildItemForm(item: any) {
    this.driverForm = this.formBuilder.group({
      id: [this.id || ''],
      companyId: [this.companyId],
      truck: [item.truck || '', Validators.required],
      firstName: [item.firstName || '', Validators.required],
      lastName: [item.lastName || '', Validators.required],
      status: [item.status || '', Validators.required],
      terminationDate: [this.convertToFormDate(item?.terminationDate) || this.nowDate, Validators.required],
      hireDate: [this.convertToFormDate(item?.hireDate) || this.nowDate, Validators.required],
      dateOfBirth: [this.convertToFormDate(item?.dateOfBirth) || this.nowDate, Validators.required],
      cdlExpirationDate: [this.convertToFormDate(item?.cdlExpirationDate) || this.nowDate, Validators.required],
      fein: [item.fein || '', Validators.required],
      ssn: [item.ssn || '', Validators.required],
      address: [item.address || '', Validators.required],
      address2: [item.address2 || ''],
      city: [item.city || '', Validators.required],
      state: [item.state || '', Validators.required],
      zip: [item.zip || '', Validators.required],
      zip2: [item.zip2 || ''],
      homePhone: [item.homePhone || '', Validators.required],
      cellPhone: [item.cellPhone || '', Validators.required],
      email: [item.email || '', Validators.required],
      division: [item.division || '', Validators.required],
      isSendEmail: [item.isSendEmail || '', Validators.required],
      isSendTextMessage: [item.isSendTextMessage || '', Validators.required],
      emergencyPhone: [item.emergencyPhone || ''],
      emergencyRelationship: [item.emergencyRelationship || ''],
      emergencyContact: [item.emergencyContact || ''],
      cdlState: [item.cdlState || '', Validators.required],
      cdlClass: [item.cdlClass || '', Validators.required],
      cdlEndorsement: [item.cdlEndorsement || '', Validators.required],
      cdlNumber: [item.cdlNumber || '', Validators.required],
      statedOperated: [item.statedOperated || '', Validators.required],
      safeDrivingAwards: [item.safeDrivingAwards || '', Validators.required],
      specialTraining: [item.specialTraining || '', Validators.required],
      yearsOfExperiece: [item.yearsOfExperiece || '', Validators.required],
    });
  }

  async ngOnInit() {
    this.loading = true
    this.id = this.route.snapshot.paramMap.get('id');
    // this.route.params.subscribe((params) => this.id = params['id']);
    // this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.subscription = this.truckService.readAllCompanyTruck(this.companyId).subscribe(res => {
      this.trucks = res;
    });
    if (this.id) {
      const driver: DriverInterface = {
        id: this.id,
        companyId: this.companyId
      }
      this.driverService.readCompanyDriverById(driver).then(res => {
        this.driver = res;
        this.buildItemForm(this.driver);
        console.log('buildItemForm(this.driver)', this.driver);
        this.loading = false
        this.cdr.detectChanges();
      })
    } else {
      const driver: DriverInterface = {}
      this.buildItemForm(driver);
      this.loading = false
      this.cdr.detectChanges();
    }
  }

  convertToFormDate(date) {
    const dateData = new Date(date);
    return {
      year: dateData.getFullYear(),
      month: dateData.getMonth() + 1,
      day: dateData.getDate(),
    }
  }

  getFormDate() {
    const hireDate = new Date(
      this.driverForm.value.hireDate.year,
      this.driverForm.value.hireDate.month,
      this.driverForm.value.hireDate.day,
    ).getTime()
    const terminationDate = new Date(
      this.driverForm.value.terminationDate.year,
      this.driverForm.value.terminationDate.month,
      this.driverForm.value.terminationDate.day,
    ).getTime()
    const cdlExpirationDate = new Date(
      this.driverForm.value.cdlExpirationDate.year,
      this.driverForm.value.cdlExpirationDate.month,
      this.driverForm.value.cdlExpirationDate.day,
    ).getTime()
    const dateOfBirth = new Date(
      this.driverForm.value.dateOfBirth.year,
      this.driverForm.value.dateOfBirth.month,
      this.driverForm.value.dateOfBirth.day,
    ).getTime()
    return {hireDate, terminationDate, cdlExpirationDate, dateOfBirth}
  }

  async onSubmit () {
    const editedDriver: DriverInterface = this.driverForm.value;
    if (this.id) {
      this.driverService.updateCompanyDriver(editedDriver).then(() => {
        this.driverForm.reset();
        this.router.navigate(['/drivers/list']);
      })
    } else {
      this.driverService.createDriver(editedDriver).then(() => {
        this.router.navigate(['/drivers/list']);
      })
    }
  }
}