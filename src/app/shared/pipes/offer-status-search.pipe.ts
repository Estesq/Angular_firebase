import { Pipe, PipeTransform } from '@angular/core';
import {OffersInterface} from '../models/offers.interface';

@Pipe({
  name: 'offerStatusSearchPipe'
})
export class OfferStatusSearchPipe implements PipeTransform {
  transform(offers: OffersInterface[], status = ''): any {
    if (!status.trim()) {
      return offers
    }

    return offers.filter( offer => {
      return true; // TODO: ADD Search
    })
  }
}
