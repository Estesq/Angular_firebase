import { Component, Input, Output, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { OfferService } from '../../shared/trkr-services/offer.service';
import { UserInterface } from '../../shared/models/user.interface';
import { localStorageTypes } from '../../shared/constants/constants';
import { OffersInterface } from '../../shared/models/offers.interface';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {
  @Input() distance: string
  @Input() duration: string
  @Output() selectedOfferChanged: EventEmitter<OffersInterface> = new EventEmitter();

  loading = true;
  subscription: any;
  data: OffersInterface[];
  selected = new EventEmitter<string>();
  selectedId: string;
  selectedOffer: OffersInterface;
  offerStatus: any;
  id: string;
  currentUser: UserInterface = {};
  companyId: string;

  constructor(
    private offerService: OfferService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

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

  async ngOnInit() {
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.companyId = 'bMNgTD76iZADfjm4PjOR';
    this.offerStatus = '';
    // this.currentUser = this.authService.currentUser;
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.subscription = this.offerService.readAllCompanyOffer(this.companyId).subscribe(res => {
      console.log("count => ", res.length);
      this.data = res.map((item: any) => (
        {
          ...item,
          deliveryDateInfo: this.convertToFormDate(item.deliveryDate),
          deliveryTimeInfo: this.convertToFormTime(item.deliveryDate),
          pickupTimeInfo: this.convertToFormTime(item.pickupDate),
          pickupDateInfo: this.convertToFormDate(item.pickupDate),
        }
      ))
      console.log(this.data);
      this.subscription.unsubscribe();
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  async deleteOffer(offer: OffersInterface) {
    this.offerService.deleteCompanyOffer(offer).then(() => {
      this.data = this.data.filter(offers => offers.id !== offer.id)
    })
  }

  selectedOfferInfo(offer: OffersInterface) {
    this.selectedOffer = offer;
  }

  onSelect(id: string) {
    this.selected.emit(id);
    this.selectedOfferChanged.emit(this.data[id]);
  }

  selectOfferByStatus(status: string) {
    this.offerStatus = status;
  }

  selectId(id: string, index: number) {
    this.selectedId = id;
    this.selectedOfferChanged.emit(this.data[index]);
  }
}
