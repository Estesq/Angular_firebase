import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import {UserInterface} from '../../shared/models/user.interface';
import {TruckInterface} from '../../shared/models/truck.interface';
import {Subscription, Observable, BehaviorSubject} from 'rxjs';
import {TruckService} from '../../shared/trkr-services/truck.service';
import {localStorageTypes} from '../../shared/constants/constants';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.scss']
})
export class CreateTruckComponent implements OnInit {
  popupModel;
  truckForm: FormGroup;
  postingCardSubscription;
  truckSubscription;
  currentUser: UserInterface;
  now = new Date();
  nowDate = {
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate(),
  }
  id: string;
  truck: TruckInterface;
  companyId: string;
  subscription: Subscription;
  loading = true;

  constructor(
    private truckService: TruckService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.route.params.subscribe((params) => this.id = params['id']);
    // this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.truckForm = new FormGroup({
      id: new FormControl(''),
      companyId: new FormControl(''),
      type: new FormControl(''),
      number: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
      status: new FormControl(''),
      division: new FormControl(''),
      statement: new FormControl(''),
      mark: new FormControl(''),
      model: new FormControl(''),
      color: new FormControl(''),
      year: new FormControl(''),
      vin: new FormControl(''),
      plates: new FormControl(''),
      fuelCard: new FormControl(''),
      fuelType: new FormControl(''),
      iPass: new FormControl(''),
      bestPass: new FormControl(''),
      engineSerial: new FormControl(''),
      tireSize: new FormControl(''),
      deductTools: new FormControl(''),
      deductFuel: new FormControl(''),
      odometrState: new FormControl(''),
      odometrDirections: new FormControl(''),
      dotInspectionExpiration: new FormControl(''),
      platesExpirationDate: new FormControl(''),
      insuranceExpirationDate: new FormControl(''),
      insuranceValue: new FormControl(''),
      escrowStartingBalance: new FormControl(''),
      escrowAccauntBalance: new FormControl(''),
      iftaExpirationDate: new FormControl(''),
      hutNyPermit: new FormControl(''),
      hutGrossWeight: new FormControl(''),
      hutUnloadedWeight: new FormControl(''),
      hutOfAxles: new FormControl(''),
      dispatchId: new FormControl(''),
      dispatchGroup: new FormControl(''),
      gpsType: new FormControl(''),
      gpsDeviceId: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
      driver1id: new FormControl('none'),
      driver2id: new FormControl('none'),
      trailer1id: new FormControl('none'),
      trailer2id: new FormControl('none'),
      trailer3id: new FormControl('none'),
    })
    if (this.id) {
      const truck: TruckInterface = {
        id: this.id,
        companyId: this.companyId
      }
      this.truckService.readCompanyTruckById(truck).then(res => {
        console.log('ID present readCompanyTruckById', res);
        this.buildItemForm(res)
        this.loading = false
        this.cdr.detectChanges();
        console.log('loading', this.loading);
      })
    } else {
      const truck: TruckInterface = {}
      console.log('NO ID readCompanyTruckById', truck);
      this.buildItemForm(truck)
      this.loading = false
      this.cdr.detectChanges();
      console.log('loading', this.loading);
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
  buttonClick() {
    this.loading = !this.loading
    this.cdr.detectChanges();
    console.log('loading', this.loading);
  }
  private buildItemForm(item) {
    this.truckForm = this.formBuilder.group({
      id: [item.id || ''],
      companyId: [item.companyId],
      type: [item.type || '', Validators.required],
      number: [item.number || 0, Validators.required],
      start: [this.convertToFormDate(this.truck?.start) || this.nowDate, Validators.required],
      end: [this.convertToFormDate(this.truck?.end) || this.nowDate, Validators.required],
      status: [item.status || '', Validators.required],
      division: [item.division || '', Validators.required],
      statement: [item.statement || '', Validators.required],
      mark: [item.mark || '', Validators.required],
      model: [item.model || '', Validators.required],
      color: [item.color || '', Validators.required],
      year: [item.year || 0, Validators.required],
      vin: [item.vin || '', Validators.required],
      plates: [item.plates || '', Validators.required],
      fuelCard: [item.fuelCard || '', Validators.required],
      fuelType: [item.fuelType || '', Validators.required],
      iPass: [item.iPass || '', Validators.required],
      bestPass: [item.bestPass || '', Validators.required],
      engineSerial: [item.engineSerial || '', Validators.required],
      tireSize: [item.tireSize || '', Validators.required],
      deductTools: [item.deductTools || '', Validators.required],
      deductFuel: [item.deductFuel || '', Validators.required],
      odometrState: [item.odometrState || '', Validators.required],
      odometrDirections: [item.odometrDirections || '', Validators.required],
      dotInspectionExpiration: [item.dotInspectionExpiration || 0, Validators.required],
      platesExpirationDate: [item.platesExpirationDate || 0, Validators.required],
      insuranceExpirationDate: [item.insuranceExpirationDate || 0, Validators.required],
      insuranceValue: [item.insuranceValue || '', Validators.required],
      escrowStartingBalance: [item.escrowStartingBalance || '', Validators.required],
      escrowAccauntBalance: [item.escrowAccauntBalance || '', Validators.required],
      iftaExpirationDate: [item.iftaExpirationDate || '', Validators.required],
      hutNyPermit: [item.hutNyPermit || '', Validators.required],
      hutGrossWeight: [item.hutGrossWeight || '', Validators.required],
      hutUnloadedWeight: [item.hutUnloadedWeight || '', Validators.required],
      hutOfAxles: [item.hutOfAxles || '', Validators.required],
      dispatchId: [item.dispatchId || '', Validators.required],
      dispatchGroup: [item.dispatchGroup || '', Validators.required],
      gpsType: [item.gpsType || '', Validators.required],
      gpsDeviceId: [item.gpsDeviceId || '', Validators.required],
      lat: [item.lat || 0, Validators.required],
      lng: [item.lng || 0, Validators.required],
      driver1id: ['none'],
      driver2id: ['none'],
      trailer1id: ['none'],
      trailer2id: ['none'],
      trailer3id: ['none'],
    });
    console.log('loading', this.loading);
    return
  }
  getFormDate() {
    const start = new Date(
      this.truckForm.value.start.year,
      this.truckForm.value.start.month,
      this.truckForm.value.start.day,
    ).getTime()
    const end = new Date(
      this.truckForm.value.end.year,
      this.truckForm.value.end.month,
      this.truckForm.value.end.day,
    ).getTime()
    return {start, end}
  }

  async onSubmit () {
    if (this.id) {
      this.truckService.updateCompanyTruck(this.truckForm.value).then(() => {
        this.router.navigate(['/trucks/trucks-list']);
      })
    } else {
      this.truckService.createTruck(this.truckForm.value).then(() => {
        this.router.navigate(['/trucks/trucks-list']);
      })
    }
  }
}
