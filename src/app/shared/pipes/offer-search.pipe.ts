import { Pipe, PipeTransform } from '@angular/core';
import {OffersInterface} from '../models/offers.interface';

@Pipe({
  name: 'offerSearchPipe'
})
export class OfferSearchPipe implements PipeTransform {
  transform(offers: OffersInterface[], name = ''): any {
    if (!name.trim()) {
      return offers
    }

    return offers.filter( offer => {
      return offer.id.toLowerCase().includes(name.toLocaleLowerCase())
    })
  }
}
