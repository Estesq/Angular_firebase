import { Component, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OfferService } from '../../shared/trkr-services/offer.service';
import { OffersInterface } from '../../shared/models/offers.interface';
import { localStorageTypes } from '../../shared/constants/constants';

@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.scss']
})
export class OfferInfoComponent implements OnInit {
  @Input() data: OffersInterface
  @Input() distance: string
  @Input() duration: string
  active: 1;
  offerStatus: any;
  createRoute = false;
  offerSubscription: any;
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
  offer: OffersInterface;
  offerFormSubmitted: boolean = false;
  offerForm = new FormGroup({
    pickupDate: new FormControl(this.nowDate, [Validators.required]),
    pickupTime: new FormControl(this.nowTime, [Validators.required]),
    deliveryDate: new FormControl(this.nowDate, [Validators.required]),
    deliveryTime: new FormControl(this.nowTime, [Validators.required]),
  })

  constructor(
    private offerService: OfferService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  get cf() {
    return this.offerForm.controls;
  }

  ngOnInit(): void {
    this.offer = this.data;
    console.log("selected data =>", this.data);
    this.offerStatus = '';
  }

  async ngOnChanges(changes: string) {
    this.offer = this.data;

    this.offerForm.controls.pickupDate.setValue(this.convertToFormDate(this.data?.pickupDate))
    this.offerForm.controls.pickupTime.setValue(this.convertToFormTime(this.data?.pickupDate))
    this.offerForm.controls.deliveryDate.setValue(this.convertToFormDate(this.data?.deliveryDate))
    this.offerForm.controls.deliveryTime.setValue(this.convertToFormTime(this.data?.deliveryDate))
    this.cdr.detectChanges();
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
    return { pickupDate, deliveryDate }
  }

  async onSubmit() {
    this.offerFormSubmitted = true;
    if (this.offerForm.invalid) {
      return;
    }
    const formDate = this.getFormDate();
    const updatedOffer = this.offer;
    updatedOffer.pickupDate = formDate.pickupDate;
    updatedOffer.deliveryDate = formDate.deliveryDate;

    this.offerService.updateCompanyOffer(updatedOffer).then(() => {
      this.offerFormSubmitted = false;
    })
  }
}
