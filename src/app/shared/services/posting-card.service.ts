import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserInterface} from '../models/user.interface';
import {TruckInterface} from '../models/truck.interface';
import {PostingCardInterface} from '../models/posting-card.interface';

@Injectable({providedIn: 'root'})

export class PostingCardService {
  currentUser: UserInterface;
  uniqPostCardTruck: string[]
  filteredTrucks: TruckInterface[]

  postingCards: PostingCardInterface[];
  trucks: TruckInterface[];
  postingCardSubscription;

  constructor(
    private authService: AuthService
  ) {
    // this.currentUser = this.authService.currentUser
  }


  readAllPostCards() {
    // return DataStore.query<PostingCard>(PostingCard, Predicates.ALL)
    //   .then(data => {
    //     return data
    //   })
  }

  async readAllPostCardsByTruckId(truckId: string) {
    // return await DataStore.query(PostingCard, truckId)
    //   .then(data => {
    //     return data
    //   })
  }

  // Busy trucks
  async readAllPostCardsUnPostedTruckByDate(startDate: number, endDate: number) {
    // await DataStore.query(PostingCard, c => c
    //   .end('between', [endDate, startDate])
    //   .start('between', [endDate, startDate])).then(res => {
    //   for (let i = 0; i < res.length; i++) {
    //     if (this.uniqPostCardTruck.indexOf(res[i].truckId) === -1) {
    //       this.uniqPostCardTruck.push(res[i].truckId)
    //     }
    //   }
    // }).then(() => {
    //   DataStore.query(Truck).then(res2 => {
    //     for (let i = 0; i < res2.length; i++) {
    //       if (this.uniqPostCardTruck.indexOf(res2[i].id) >= 0) {
    //         this.filteredTrucks.push(res2[i])
    //       }
    //     }
    //   })
    // }).then(() => {
    //   return this.filteredTrucks
    //   }
    // );
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // Free trucks
  async readAllPostedTrucks(startDate: number, endDate: number, postingCards: PostingCardInterface[], trucks: TruckInterface[]) {
    this.uniqPostCardTruck = [];
    for (let i = 0; i < postingCards.length; i++) {
      if (postingCards[i].start < startDate && startDate < postingCards[i].end) {
        this.uniqPostCardTruck.push(postingCards[i].truckId)
      } else if (postingCards[i].start < endDate && endDate < postingCards[i].end) {
        this.uniqPostCardTruck.push(postingCards[i].truckId)
      } else if (startDate < postingCards[i].start && postingCards[i].start < endDate) {
        this.uniqPostCardTruck.push(postingCards[i].truckId)
      } else if (startDate < postingCards[i].end && postingCards[i].end < endDate) {
        this.uniqPostCardTruck.push(postingCards[i].truckId)
      }
    }
    this.uniqPostCardTruck = this.uniqPostCardTruck.filter(this.onlyUnique);
    this.filteredTrucks = [];
    for (let i = 0; i < trucks.length; i++) {
      if (this.uniqPostCardTruck.indexOf(trucks[i].id) === -1) {
        this.filteredTrucks.push(trucks[i])
      }
    }
    return this.filteredTrucks
  }


  createFirstPostCardForTruck(truckId: string) {
    // return DataStore.save(
    //   new PostingCard({
    //     truckId: truckId,
    //     status: '',
    //     start: new Date().getTime(),
    //     end: new Date(2100, 12, 31, 24, 59, 59).getTime(),
    //   })).then(res => {
    //   return  res.id
    // });
  }

  createPostCardForTruck(data: PostingCardInterface) {
    // return DataStore.save(
    //   new PostingCard({
    //     truckId: data.truckId,
    //     status: data.status,
    //     start: data.start,
    //     end: data.end,
    //   })).then(res => {
    //   return  res.id
    // });
  }

  editPostCardForTruck(data: PostingCardInterface) {
    // DataStore.query(CompanyUsers, data.id).then(res => {
    //   console.log(res);
    // })
    //
    // return DataStore.save(
    //   new PostingCard({
    //     truckId: data.truckId,
    //     status: data.truckId,
    //     start: data.start,
    //     end: data.end,
    //   })).then(res => {
    //   return  res.id
    // });
  }


}
