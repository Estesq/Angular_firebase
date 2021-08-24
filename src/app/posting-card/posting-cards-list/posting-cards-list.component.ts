import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostingService} from '../../shared/trkr-services/posting.service';
import {PostingCardInterface} from '../../shared/models/posting-card.interface';
import {TruckInterface} from '../../shared/models/truck.interface';
import {Subscription} from 'rxjs';
import {TruckService} from '../../shared/trkr-services/truck.service';

@Component({
  selector: 'app-posting-cards-list',
  templateUrl: './posting-cards-list.component.html',
  styleUrls: ['./posting-cards-list.component.scss']
})
export class PostingCardsListComponent implements OnInit, OnDestroy {

  postingCard: PostingCardInterface[];
  trucks: TruckInterface[];
  startPostingCard: FormGroup;
  endPostingCard: FormGroup;
  endPostingCardDate: number

  uniqPostCardTruck: string[] = []
  filteredTrucks: TruckInterface[] = []
  sub: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private postingCardService: PostingService,
    private truckService: TruckService
  ) { }
  async ngOnInit() {
    this.startPostingCard = this.formBuilder.group({
      y: new Date().getFullYear(),
      m: new Date().getMonth() + 1,
      d: new Date().getDate(),
      hh: new Date().getHours(),
      mm: new Date().getMinutes(),
    });
    this.endPostingCard = this.formBuilder.group({
      y: new Date().getFullYear(),
      m: new Date().getMonth() + 1,
      d: new Date().getDate(),
      hh: new Date().getHours(),
      mm: new Date().getMinutes(),
    });
    this.sub = await this.postingCardService.readAllPosting().subscribe(res => {
      this.postingCard = res;
      this.sub.unsubscribe()
    });
    // this.sub = await DataStore.query(PostingCard).then(res => {
    //   this.postingCard = res;
    // });
    this.sub = await this.truckService.readAllTruck().subscribe(res => {
      this.postingCard = res;
      this.sub.unsubscribe()
    });
    // this.sub = await DataStore.query(Truck).then(res => {
    //   this.trucks = res;
    //   // this.filteredTrucks = res;
    // });
  }
  changeDate() {
    const startPostingCard: number = new Date(
      this.startPostingCard.value.y,
      this.startPostingCard.value.m - 1,
      this.startPostingCard.value.d,
      this.startPostingCard.value.hh,
      this.startPostingCard.value.mm).getTime();
    const endPostingCard: number = new Date(
      this.endPostingCard.value.y,
      this.endPostingCard.value.m - 1,
      this.endPostingCard.value.d,
      this.endPostingCard.value.hh,
      this.endPostingCard.value.mm).getTime();
    this.endPostingCardDate = endPostingCard;
    if (this.endPostingCardDate < startPostingCard) {
      this.endPostingCardDate = startPostingCard
    }
    // this.filterCards(startPostingCard, this.endPostingCardDate)
    // this.postingCardService.readAllPostedTrucks(startPostingCard, this.endPostingCardDate, this.postingCard, this.trucks).then(res => {
    //   console.log('postingCardService res', res);
    //   this.filteredTrucks = [];
    //   this.filteredTrucks = res;
    // })
  }
  async deletePostingCard(card: PostingCardInterface) {
    // await DataStore.delete(PostingCard, card.id);
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  async filterCards(startDate: number, endDate: number) {
    this.uniqPostCardTruck = [];
    for (let i = 0; i < this.postingCard.length; i++) {
      if (this.postingCard[i].start < startDate && startDate < this.postingCard[i].end) {
        this.uniqPostCardTruck.push(this.postingCard[i].truckId)
      } else if (this.postingCard[i].start < endDate && endDate < this.postingCard[i].end) {
        this.uniqPostCardTruck.push(this.postingCard[i].truckId)
      } else if (startDate < this.postingCard[i].start && this.postingCard[i].start < endDate) {
        this.uniqPostCardTruck.push(this.postingCard[i].truckId)
      } else if (startDate < this.postingCard[i].end && this.postingCard[i].end < endDate) {
        this.uniqPostCardTruck.push(this.postingCard[i].truckId)
      }
    }
    this.uniqPostCardTruck = this.uniqPostCardTruck.filter(this.onlyUnique);
    this.filterTrucks();
  }
  filterTrucks() {
    this.filteredTrucks = [];
    for (let i = 0; i < this.trucks.length; i++) {
      if (this.uniqPostCardTruck.indexOf(this.trucks[i].id) === -1) {
        this.filteredTrucks.push(this.trucks[i])
      }
    }
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
