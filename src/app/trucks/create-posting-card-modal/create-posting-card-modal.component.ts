import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PostingCardService} from '../../shared/services/posting-card.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../shared/auth/auth.service';
import {PostingService} from '../../shared/trkr-services/posting.service';
import {localStorageTypes} from '../../shared/constants/constants';
import {UserInterface} from '../../shared/models/user.interface';
import {OfferInfoComponent} from '../../offers/offer-info/offer-info.component';
import {OffersInterface} from '../../shared/models/offers.interface';
import { Subscription } from 'rxjs';
import {OfferService} from '../../shared/trkr-services/offer.service';
import {TruckInterface} from '../../shared/models/truck.interface';
import {PostingCardInterface} from '../../shared/models/posting-card.interface';

@Component({
  selector: 'app-create-posting-card-modal',
  templateUrl: './create-posting-card-modal.component.html',
  styleUrls: ['./create-posting-card-modal.component.scss']
})
export class CreatePostingCardModalComponent implements OnInit {

  @Input() id: string;
  @Input() data: TruckInterface;

  loading = true;
  postingCardForm: FormGroup;
  subscription: Subscription;
  offers: OffersInterface[];
  currentUser: UserInterface;
  companyId: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private postingService: PostingService,
    private offerService: OfferService,
    private postingCardService: PostingCardService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    // this.currentUser = this.authService.currentUser;
    this.loadData();
    // this.subscription = DataStore.observe<Offer>(Offer).subscribe(async () => {
    //   this.loadData();
    // });

    this.postingCardForm = this.formBuilder.group({
      status: 'Posted',
      offerId: '',
      yS: new Date().getFullYear(),
      mS: new Date().getMonth() + 1,
      dS: new Date().getDate(),
      hhS: new Date().getHours(),
      mmS: new Date().getMinutes(),
      yE: new Date().getFullYear(),
      mE: new Date().getMonth() + 1,
      dE: new Date().getDate(),
      hhE: new Date().getHours(),
      mmE: new Date().getMinutes(),
    });
  }
  async loadData() {
    this.loading = true;
    this.subscription = this.offerService.readAllCompanyOffer(this.companyId).subscribe(res => {
      this.offers = res;
      this.loading = false;
      this.cdr.detectChanges();
    })
  }
  onSubmit() {
    const start: number = new Date(
      this.postingCardForm.value.yS,
      this.postingCardForm.value.mS,
      this.postingCardForm.value.dS,
      this.postingCardForm.value.hhS,
      this.postingCardForm.value.mmS).getTime();
    const end: number = new Date(
      this.postingCardForm.value.yE,
      this.postingCardForm.value.mE,
      this.postingCardForm.value.dE,
      this.postingCardForm.value.hhE,
      this.postingCardForm.value.mmE).getTime();
    const newPostCard: PostingCardInterface = {
      id: '',
      offerId: '',
      truckId: this.id,
      status: this.postingCardForm.value.status,
      createdBy: this.currentUser.uId,
      companyId: this.companyId,
      start: start,
      end: end,
    }
    console.log('newPostCard', newPostCard);
    this.postingService.createPosting(newPostCard).then(() => {
      this.activeModal.close(newPostCard);
    });
  }
}
