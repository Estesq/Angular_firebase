import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { CompanySearchPipe } from './company-search.pipe';
import { UserSearchPipe } from './user-search.pipe';
import {TruckSearchPipe} from './truck-search.pipe';
import {TruckStatusSearchPipe} from './truck-status-search.pipe';
import {DriverSearchPipe} from './driver-search.pipe';
import {DriverStatusSearchPipe} from './driver-status-search.pipe';
import {TrailerSearchPipe} from './trailer-search.pipe';
import {TrailerStatusSearchPipe} from './trailer-status-search.pipe';
import {OfferSearchPipe} from './offer-search.pipe';
import {OfferStatusSearchPipe} from './offer-status-search.pipe';

@NgModule({
  declarations:[
    FilterPipe,
    SearchPipe,
    ShortNamePipe,
    CompanySearchPipe,
    UserSearchPipe,
    TruckSearchPipe,
    TruckStatusSearchPipe,
    DriverSearchPipe,
    DriverStatusSearchPipe,
    TrailerSearchPipe,
    TrailerStatusSearchPipe,
    OfferSearchPipe,
    OfferStatusSearchPipe,
  ],
  imports:[CommonModule],
  exports:[
    FilterPipe,
    SearchPipe,
    ShortNamePipe,
    CompanySearchPipe,
    UserSearchPipe,
    TruckSearchPipe,
    TruckStatusSearchPipe,
    DriverSearchPipe,
    DriverStatusSearchPipe,
    TrailerSearchPipe,
    TrailerStatusSearchPipe,
    OfferSearchPipe,
    OfferStatusSearchPipe,
  ]
})

export class PipeModule{}
