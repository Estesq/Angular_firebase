import { Component, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { states } from 'app/shared/data/states';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'app/shared/services/config.service';
import { localStorageTypes } from '../../shared/constants/constants';
import { UserInterface } from '../../shared/models/user.interface';
import { TruckInterface } from '../../shared/models/truck.interface';
import { Subscription } from 'rxjs';
import { TruckService } from '../../shared/trkr-services/truck.service';
import { OfferService } from '../../shared/trkr-services/offer.service';
import { OffersInterface } from '../../shared/models/offers.interface';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOfferComponent implements OnInit {
  popupModel: any;
  mapConfig: any;
  loading: boolean = false;
  truckSubscription: any;
  offerSubscription: any;
  currentUser: UserInterface;
  trucks: TruckInterface[];
  now = new Date();
  nowDate = {
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate(),
  }
  nowTime = {
    hour: this.now.getHours(),
    minute: this.now.getMinutes(),
  }
  stateList = states;
  id: string;
  offer: OffersInterface;
  offerFormSubmitted = false;
  error: string = '';
  offerForm: FormGroup;
  companyId: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private offerService: OfferService,
    private truckService: TruckService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private formBuilder: FormBuilder,
  ) {
    this.mapConfig = this.configService.hereMapApiConfig;
  }

  private buildItemForm(item: any) {
    this.offerForm = this.formBuilder.group({
      id: [this.id || ''],
      companyId: [this.companyId],
      pickupAddress: [item.pickupAddress || ''],
      pickupState: [item.pickupState || ''],
      pickupZip: [item.pickupZip || ''],
      pickupLat: [item.pickupLat || '', Validators.required],
      pickupLng: [item.pickupLng || '', Validators.required],
      pickupDate: [this.convertToFormDate(this.offer?.pickupDate) || this.nowDate, Validators.required],
      pickupTime: [this.convertToFormTime(this.offer?.pickupDate) || this.nowDate, Validators.required],
      deliveryAddress: [item.deliveryAddress || ''],
      deliveryState: [item.deliveryState || ''],
      deliveryZip: [item.deliveryZip || ''],
      deliveryLat: [item.deliveryLat || '', Validators.required],
      deliveryLng: [item.deliveryLng || '', Validators.required],
      deliveryDate: [this.convertToFormDate(this.offer?.deliveryDate) || this.nowDate, Validators.required],
      deliveryTime: [this.convertToFormTime(this.offer?.deliveryDate) || this.nowDate, Validators.required],
    })
  }
  get cf() {
    return this.offerForm.controls;
  }

  async ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('selected id =>', this.id);
    // this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    // this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    // this.route.params.subscribe((params) => this.id = params['id']);
    // this.currentUser = this.authService.currentUser;

    if (this.id) {
      const offer: OffersInterface = {
        id: this.id,
        companyId: this.companyId
      }
      this.offerService.readCompanyOfferById(offer).then((res: any) => {
        this.offer = res;
        this.buildItemForm(this.offer);
        this.subscription.unsubscribe();
        this.loading = false;
        this.cdr.detectChanges();
      })
    } else {
      const offer: OffersInterface = {};
      this.buildItemForm(offer);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  convertToFormDate(date: any) {
    const dateData = new Date(date);
    return {
      year: dateData.getFullYear(),
      month: dateData.getMonth() + 1,
      day: dateData.getDate(),
    }
  }

  convertToFormTime(date: any) {
    const dateData = new Date(date);
    return {
      hour: dateData.getHours(),
      minute: dateData.getMinutes(),
    }
  }

  getFormDate() {
    const pickupDate = new Date(
      this.offerForm.value.pickupDate.year,
      this.offerForm.value.pickupDate.month,
      this.offerForm.value.pickupDate.day,
      this.offerForm.value.pickupTime.hour,
      this.offerForm.value.pickupTime.minute,
    ).getTime()
    const deliveryDate = new Date(
      this.offerForm.value.deliveryDate.year,
      this.offerForm.value.deliveryDate.month,
      this.offerForm.value.deliveryDate.day,
      this.offerForm.value.deliveryTime.hour,
      this.offerForm.value.deliveryTime.minute,
    ).getTime()
    return {pickupDate, deliveryDate}
  }

  async geocodPickupAddress(event: any) {
    try {
      const responsePickup: any = await this.http.get(
        `${this.mapConfig.baseUrl}/geocode`, {params: {
          q: `USA, ${this.offerForm.value.pickupAddress} ${this.offerForm.value.pickupState}  ${this.offerForm.value.pickupZip}`,
          apiKey: this.mapConfig.apiKey,
        }}
      ).toPromise();
      if (responsePickup.items) {
        this.offerForm.controls.pickupLat.setValue(responsePickup.items[0]?.position.lat);
        this.offerForm.controls.pickupLng.setValue(responsePickup.items[0]?.position.lng);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async geocodDeliveryAddress(event: any) {
    try {
      const responseDelivery: any = await this.http.get(
        `${this.mapConfig.baseUrl}/geocode`, {params: {
          q: `USA, ${this.offerForm.value.deliveryAddress} ${this.offerForm.value.deliveryState}  ${this.offerForm.value.deliveryZip}`,
          apiKey: this.mapConfig.apiKey,
        }}
      ).toPromise();
      if (responseDelivery.items) {
        this.offerForm.controls.deliveryLat.setValue(responseDelivery.items[0]?.position.lat);
        this.offerForm.controls.deliveryLng.setValue(responseDelivery.items[0]?.position.lng);
        this.cdr.detectChanges();
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async onSubmit () {
    this.offerFormSubmitted = true;
    let editedOffer: OffersInterface = this.offerForm.value;
    editedOffer = {
      ...editedOffer,
      // companyId: this.currentUser?.companyId || "",
      pickupDate: this.getFormDate().pickupDate,
      deliveryDate: this.getFormDate().deliveryDate,
      companyId: this.companyId,
      createdById: this.companyId || '',
      createdByName: `${this.currentUser?.firstName || ''} ${this.currentUser?.lastName || ''}`,
    };
    if (this.offerForm.invalid) {
      return;
    }
    if (this.id) {
      this.offerService.updateCompanyOffer(editedOffer).then(() => {
        this.offerForm.reset();
        this.offerFormSubmitted = false;
        this.router.navigate(['/offers/list']);
      });
      return;
    } else {
      this.offerService.createOffer(editedOffer).then(() => {
        this.offerForm.reset();
        this.offerFormSubmitted = false;
        this.router.navigate(['/offers/list']);
      });
    }
    this.cdr.detectChanges();
  }
}
